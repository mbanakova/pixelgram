import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'
import store from './store'
import FontAwesome from "./assets/fontawesome";
import VueHtml2Canvas from 'vue-html2canvas';


const app = createApp(App)
app.use(store)
app.use(router)
app.use(VueHtml2Canvas)
app.component('font-awesome', FontAwesome)
app.mount('#app')
