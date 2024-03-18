import { createApp } from 'vue';
import App from './App.vue';
import AddCategory from './components/AddCategory.vue'; // Adjust the path as necessary

const app = createApp(App);

app.component('AddCategory', AddCategory);

app.mount('#app');
