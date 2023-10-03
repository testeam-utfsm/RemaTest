import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;

createApp(App).use(router).mount('#app')
