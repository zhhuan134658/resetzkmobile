import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import utils from './config/util.js';
import './libs/rem.js';
import './style/homePage.less';
import './style/projectkanban.less';
import './style/setpage.less';
import './style/comForm.less';
import './style/workbench.less';
import Vant from 'vant';
import 'vant/lib/index.css';
import 'ant-design-vue/dist/antd.css';

import { Tree } from 'ant-design-vue';
Vue.use(Tree);
Vue.use(Vant);
import 'lib-flexible/flexible';
// import 'amfe-flexible';

Vue.prototype.$utils = utils;
Vue.prototype.axiosPost = utils.axiosPost; //axios post 请求
Vue.prototype.axiosGet = utils.axiosGet; //axios get 请求

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
