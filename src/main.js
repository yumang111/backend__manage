// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUI from 'element-ui';
// import 'normalize.css/normalize.css';
import 'element-ui/lib/theme-default/index.css';
//将echart打进vendor
import echarts from 'echarts';
import VueResource from 'vue-resource';
import App from './App';
import router from './router';
import store from './store';


Vue.use(ElementUI);
Vue.use(VueResource);
// Vue.use(echarts);
// Vue.prototype.Message = Message;
Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  // created() {
  //   this.$store.dispatch('GET_ROUTER_LIST');
  // },
});
