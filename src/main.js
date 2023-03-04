import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './styles/app.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import { faMagnifyingGlass, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

library.add(faSpotify, faMagnifyingGlass, faRightFromBracket);
const pinia = createPinia();
createApp(App).use(pinia).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app');
