import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import naver from "vue3-naver-maps"
import BootstrapVue3 from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import axios from 'axios'

const app = createApp(App)

axios.defaults.baseURL = 'http://127.0.0.1:3000'

app.use(router)
app.use(BootstrapVue3)
app.use(naver, {
    clientId: process.env.VUE_APP_CLIENT_ID,
})
app.mount('#app')
