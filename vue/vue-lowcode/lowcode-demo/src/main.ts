import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import Text from './components/Text.vue';

let app = createApp(App)
app.component('Text', Text);
app.mount('#app');
