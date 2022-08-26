import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import naver from "vue3-naver-maps"
import BootstrapVue3 from 'bootstrap-vue-3'
import { BootstrapIconsPlugin } from 'bootstrap-icons-vue'
import { BToastPlugin } from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import axios from 'axios'
import mitt from 'mitt'

const app = createApp(App);
const emitter = mitt();

axios.defaults.baseURL = 'http://ec2-15-164-165-238.ap-northeast-2.compute.amazonaws.com'
// axios.defaults.baseURL = "http://localhost:3000"

app.use(router);
app.use(store);
app.use(BootstrapVue3);
app.use(BootstrapIconsPlugin);
app.use(BToastPlugin);
app.use(naver, {
    clientId: process.env.VUE_APP_CLIENT_ID,
})

app.config.globalProperties.emitter = emitter;
app.mount('#app');
