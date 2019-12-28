import './registerServiceWorker';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';
import UUID from 'vue-uuid';
import Vue from 'vue';
import firebase from 'firebase';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { store } from './store';
import router from './router';


Vue.use(UUID);
Vue.config.productionTip = false;

let app = '';
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App),
    }).$mount('#app');
  }
});
