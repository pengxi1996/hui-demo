import Lang from "@style-isolate/lang";


console.log(Lang);

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
      ),
    "style-isolate-selectTab": () =>
      import(
        /* webpackChunkName: "style-isolate/test" */
        `@style-isolate/views/selectTab`
      ),
    "style-isolate-menu": () =>
      import(
        /* webpackChunkName: "style-isolate/menu" */
        `@style-isolate/views/menu`
      ),
    "style-isolate-role": () =>
      import(
        /* webpackChunkName: "style-isolate/role" */
        `@style-isolate/views/role`
      ),
      "style-isolate-personnel": () =>
      import(
        /* webpackChunkName: "style-isolate/personnel" */
        `@style-isolate/views/personnel`
      ),
  },

  i18n: Lang
};
