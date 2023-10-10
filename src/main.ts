// Import tailwind
import './styles/tailwind.css'
// Import global css
import './styles/global.css'
// Vue setup
import { createApp } from 'vue'
// Pinia
import { createPinia } from 'pinia'
// App
import App from './App.vue'
import router from './router'
// Axios
import { VueAxios, axios } from './plugins/axios'
// Creation
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueAxios, axios)

app.mount('#app')
