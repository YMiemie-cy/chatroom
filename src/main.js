import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

Vue.directive("relative", {
  inserted: e => {
    console.log("v-relative", e);
  },
});

import router from "./plugins/router.js";

import Vant from "vant";
import "vant/lib/index.css";
Vue.use(Vant);

import axios from "axios";
Vue.prototype.$axios = axios;

new Vue({
  render: h => h(App),
  router,
}).$mount("#app");
