import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import { VuesticPlugin } from 'vuestic-ui' // <-
import 'vuestic-ui/dist/vuestic-ui.css' // <-

axios.defaults.baseURL = 'https://hggroups.cm/api/v1/'

const app = createApp(App);
app.use(VuesticPlugin)
app.use(router);
app.mount('#app');