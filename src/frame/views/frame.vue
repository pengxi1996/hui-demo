<template>
  <div class="accept-container">
    <iframe ref="iframe" frameborder="0" scrolling="auto" :src="iframeSrc"></iframe>
  </div>
</template>

<script>
import { URLSearchParams, parseUrl } from "@common/utils";
export default {
  name: "IframeComponent",
  props: ["url"],
  data() {
    return {
      iframeSrc: "",
    };
  },
  methods: {
    setIframeWidth() {
      const deviceWidth = document.getElementsByClassName("app-main")[0].clientWidth;
      const deviceHeight = document.documentElement.clientHeight - document.getElementsByClassName("h-topbar-wrapper")[0].clientHeight - document.getElementsByClassName("h-navbar-wrapper")[0].clientHeight - 16;
      this.$nextTick(() => {
        if (this.$refs.iframe) {
          this.$refs.iframe.style.width = deviceWidth + "px";
          this.$refs.iframe.style.height = deviceHeight + "px";
        }
      });
    },
  },
  mounted() {
    const that = this;
    that.setIframeWidth();
    window.addEventListener("resize", function () {
      that.setIframeWidth();
    });

    this.$nextTick(() => {
      this.iframeSrc = (() => {
        let url = this.url;

        // url 可能是个不完整的地址
        if (!/^http/.test(url)) {
          const { BIZ_URL_HOME } = LOCAL_CONFIG;
          const {
            meta: { systemCode },
          } = this.$route;

          if (BIZ_URL_HOME[systemCode]) {
            url = BIZ_URL_HOME[systemCode] + "/" + url;
          }
        }

        const { protocol, host, pathname, search, hash } = parseUrl(url);
        let searchParams = new URLSearchParams(search);

        try {
          let {
            meta: {
              menuArgs: { menu_arg },
            },
          } = this.$route;

          if (menu_arg) {
            try {
              menu_arg = JSON.parse(menu_arg); // json string
              for (const key in menu_arg) {
                if (menu_arg.hasOwnProperty(key)) {
                  searchParams.append(key, menu_arg[key]);
                }
              }
            } catch (error) {
              searchParams = new URLSearchParams(`${search}&${menu_arg}`); // search params
            }
          }
        } catch (error) {}

        if (searchParams.toString()) {
          return `${protocol}//${host}${pathname}?${searchParams.toString()}${hash}`;
        }

        return `${protocol}//${host}${pathname}${hash}`;
      })();
    });
  },
};
</script>

<style scoped>
.accept-container {
  font-size: 0;
}
</style>