export default {
  router: {
    "style-isolate-index": () =>
      import(
        /* webpackChunkName: "style-isolate/index" */
        `@style-isolate/views/index`
      ),
    "style-isolate-test": () =>
      import(
        /* webpackChunkName: "style-isolate/test" */
        `@style-isolate/views/test`
      )
  },

  i18n: false
};
