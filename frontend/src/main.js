import { createApp } from 'vue';
import App from './pages/App.vue';
import router from '../src/router/routes';
import pinia from '../src/store/store';

const app = createApp(App);
app.use(router);
app.use(pinia);
app.mount('#app');
