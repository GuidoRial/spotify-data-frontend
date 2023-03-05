import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './styles/app.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import { faMagnifyingGlass, faRightFromBracket, faPlay, faPause, faForward, faBackward } from '@fortawesome/free-solid-svg-icons';

import VueHighcharts from 'vue3-highcharts';

library.add(faSpotify, faMagnifyingGlass, faRightFromBracket, faPlay, faPause, faForward, faBackward);
const pinia = createPinia();
createApp(App)
  .use(pinia)
  .use(router)
  .use(VueHighcharts)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app');
