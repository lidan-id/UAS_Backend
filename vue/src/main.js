import { createApp } from 'vue';
import App from './App.vue';

//Bulma
import './assets/main.scss';
// //router.js
import router from './router';
createApp(App)
  .use(router)
  .mount('#app');
