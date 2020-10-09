const defaultOpts = {
  // required opts
  Vue: null,
  appOptions: null,
  template: null,
  destoryRootInstanceAtUnmount: true, // destroy instance at unmount
};

export default function singleSpaVue(userOpts) {
  if (typeof userOpts !== "object") {
    throw new Error(`single-spa-vue requires a configuration object`);
  }

  const opts = {
    ...defaultOpts,
    ...userOpts,
  };

  if (!opts.Vue) {
    throw new Error("single-spa-vuejs must be passed opts.Vue");
  }

  if (!opts.appOptions) {
    throw new Error("single-spa-vuejs must be passed opts.appOptions");
  }

  // Just a shared object to store the mounted object state
  let mountedInstances = {};

  return {
    bootstrap: bootstrap.bind(null, opts, mountedInstances),
    mount: mount.bind(null, opts, mountedInstances),
    unmount: unmount.bind(null, opts, mountedInstances),
    update: update.bind(null, opts, mountedInstances),
  };
}

function bootstrap(opts) {
  if (opts.loadRootComponent) {
    return opts.loadRootComponent().then((root) => (opts.rootComponent = root));
  } else {
    return Promise.resolve();
  }
}

function mount(opts, mountedInstances, props) {
  return Promise.resolve().then(() => {
    if (mountedInstances.instance) {
      const { instance } = mountedInstances;
      let { el, router } = opts.appOptions;

      // Replace DOM element
      el = document.querySelector(el);
      el.parentNode.replaceChild(instance.$el, el);

      // Navigate
      if (router) {
        let path =
          router.mode === "history"
            ? window.location.pathname
            : router.mode === "hash" && window.location.hash.slice(1);

        const { base } = router.options;
        if (router.mode === "history" && base) {
          path = path.slice(base.length);
          path = path.startsWith("/") ? path : `/${path}`;
        }

        const { location } = router.resolve(path);

        if (instance.$hCore) {
          instance.$hCore.navigate(location.path, location.query);
        } else {
          router.push(location);
        }
      }

      return;
    }

    const appOptions = { ...opts.appOptions };
    if (props.domElement && !appOptions.el) {
      appOptions.el = props.domElement;
    }

    if (!appOptions.el) {
      const htmlId = `single-spa-application:${props.name}`;
      appOptions.el = `#${htmlId.replace(":", "\\:")} .single-spa-container`;
      let domEl = document.getElementById(htmlId);
      if (!domEl) {
        domEl = document.createElement("div");
        domEl.id = htmlId;
        document.body.appendChild(domEl);
      }

      // single-spa-vue@>=2 always REPLACES the `el` instead of appending to it.
      // We want domEl to stick around and not be replaced. So we tell Vue to mount
      // into a container div inside of the main domEl
      if (!domEl.querySelector(".single-spa-container")) {
        const singleSpaContainer = document.createElement("div");
        singleSpaContainer.className = "single-spa-container";
        domEl.appendChild(singleSpaContainer);
      }

      mountedInstances.domEl = domEl;
    }

    if (!appOptions.render && !appOptions.template && opts.rootComponent) {
      appOptions.render = (h) => h(opts.rootComponent);
    }

    if (!appOptions.data) {
      appOptions.data = {};
    }

    appOptions.data = { ...appOptions.data, ...props };

    mountedInstances.instance = new opts.Vue(appOptions);
    if (mountedInstances.instance.bind) {
      mountedInstances.instance = mountedInstances.instance.bind(mountedInstances.instance);
    }
  });
}

function update(opts, mountedInstances, props) {
  return Promise.resolve().then(() => {
    const data = {
      ...(opts.appOptions.data || {}),
      ...props,
    };
    for (let prop in data) {
      mountedInstances.instance[prop] = data[prop];
    }
  });
}

function unmount(opts, mountedInstances) {
  return Promise.resolve().then(() => {
    if (opts.destoryRootInstanceAtUnmount) {
      mountedInstances.instance.$destroy();
      mountedInstances.instance.$el.innerHTML = "";
      delete mountedInstances.instance;

      if (mountedInstances.domEl) {
        mountedInstances.domEl.innerHTML = "";
        delete mountedInstances.domEl;
      }
    }
  });
}
