/**
 * Adapter for HUI Design Micro App Framework.
 *
 * publicPath
 * - config assetsPublicPath
 * - router base
 * - requirejs mergeLocaleFromUrl("./static/locale/demo.js")
 *
 * layout
 * - isFrame
 * - isUcf
 */

const Config = require("webpack-chain");
const fs = require("fs-extra");
const merge = require("webpack-merge");
const webpack = require("webpack");

const { dev: devBuildConfig, build: prodBuildConfig } = require("../config");

const isProd = process.env.NODE_ENV === "production";

const {
  assetsPublicPath,
  runInMicroAppFramework: isRunInMicroAppFramework
} = isProd ? prodBuildConfig : devBuildConfig;

const prefix = isProd
  ? isRunInMicroAppFramework
    ? assetsPublicPath
    : "./"
  : isRunInMicroAppFramework
  ? "/"
  : "./";

exports.adapter = function(webpackConfig, target = "bizframe") {
  if (!isRunInMicroAppFramework) return webpackConfig;

  if (target === "bizframe") {
    const _config = new Config();

    /** entry */
    delete webpackConfig.entry;
    _config
      .entry("app")
      .add("./build/entry/setPublicPath.js")
      .add("./src/frame/index.js")
      .add("./build/entry/micro-app.js");

    /** output */
    _config.output
      .library(`HUI_MICRO_APP_PRO`)
      .libraryTarget("global")
      .jsonpFunction(`webpackJsonp_PRO`);

    /** devServer */
    _config.devServer.headers({
      "Access-Control-Allow-Origin": "*"
    });

    return merge(webpackConfig, _config.toConfig());
  }

  if (target === "subsystem") {
    const _config = new Config();

    /** entry */
    Object.keys(webpackConfig.entry).forEach(key => {
      _config
        .entry(key)
        .add("./build/entry/setPublicPath.js")
        .add(webpackConfig.entry[key]);
    });

    return merge(webpackConfig, _config.toConfig());
  }

  return webpackConfig;
};

const templateParameters = (compilation, assets, options) => {
  return Object.assign({
    webpack,
    compilation,
    htmlWebpackPlugin: { files: assets, options },
    BASE_URL: prefix
  });
};

let dll = [];

fs.readdirSync("./dllManifest").forEach(vendor => {
  let { name } = require(`../dllManifest/${vendor}`);
  name = name.replace(/_/, ".");
  dll.push(`${prefix}static/dll/${name}.dll.js`);
});

exports.htmlWebpackPluginOptions = Object.assign(
  {
    template: "index.ejs",
    templateParameters,
    hash: true,
    dll
  },
  isProd
    ? {
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
        }
      }
    : null
);
