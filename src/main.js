import 'flexible'
import 'babel-polyfill'
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import 'baxi-ui/lib/flexible' // Mobile adaptive solution
 
// import baxi from 'baxi-ui'
// import 'baxi-ui/lib/styles/baxi-ui.css'
 
// Vue.use(baxi)

Vue.config.productionTip = false;
Vue.use(ElementUI);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
