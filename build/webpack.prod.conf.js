"use strict";

const path = require("path");
const utils = require("./utils");
const config = require("../config");
const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.conf");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const { adapter, htmlWebpackPluginOptions } = require("./adapter");

const webpackConfig = merge(baseWebpackConfig, {
  mode: "production",
  entry: {
    "frame/app": "./src/frame/index.js"
  },
  module: {
    rules: utils.generateStyleModules({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      localIdentName: "[local]_[hash:base64:8]"
    })
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.spJsPath("[name].[chunkhash:8].js"),
    chunkFilename: utils.spJsPath("[name].[chunkhash:8].js")
  },
  optimization: {
    minimizer: [
      new TerserJSPlugin({
        parallel: true,
        sourceMap: config.build.productionSourceMap // Must be set to true if using source-maps in production
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      chunks: "async",
      // 30k+
      minSize: 30000,
      maxSize: 0,
      minChunks: 2,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: "_",
      name: true,
      cacheGroups: {
        [`frame/vendors`]: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: "all",
          enforce: true
        },
        [`frame/default`]: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(["dist"], {
      // 必须设置
      root: config.directory.root
    }),
    new HtmlWebpackPlugin(htmlWebpackPluginOptions),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "../static"),
        to: config.build.assetsSubDirectory,
        ignore: [".*"],
        transform: function(content, path) {
          if (
            path.indexOf(".js") > -1 ||
            path.indexOf(".html") > -1 ||
            path.indexOf(".css") > -1
          ) {
            let versionInfo =
              "/** version:" +
              process.env.npm_package_version +
              ", creation time:" +
              utils.getDateTimeString() +
              "*/"; // 其值为字符串，将作为注释存在
            return versionInfo + content;
          }
          return content;
        }
      },
      {
        from: path.resolve(config.directory.root, "sysconfig.js"),
        to: "sysconfig.js",
        transform: function(content, path) {
          let versionInfo =
            "/** version:" +
            process.env.npm_package_version +
            ", creation time:" +
            utils.getDateTimeString() +
            "*/"; // 其值为字符串，将作为注释存在
          return versionInfo + content;
        }
      }
    ])
  ]
});

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require("compression-webpack-plugin");

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: new RegExp(
        "\\.(" + config.build.productionGzipExtensions.join("|") + ")$"
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  );
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;
  webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

if (config.build.manifest) {
  webpackConfig.plugins.push(
    new ManifestPlugin({
      fileName: path.resolve(
        __dirname,
        "..",
        "dist",
        `manifest.${Date.now()}.json`
      ),
      publicPath: "",
      generate(seed, files, entrypoints) {
        return files.reduce((manifest, { name, path: manifestFilePath }) => {
          const { root, dir, base } = path.parse(manifestFilePath);
          return {
            ...manifest,
            [name + "-" + base]: { path: manifestFilePath, root, dir }
          };
        }, seed);
      }
    })
  );
}

module.exports = adapter(webpackConfig);
