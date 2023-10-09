// Import tailwind
import './styles/tailwind.css'
// Vue setup
import { createApp } from 'vue'
// Pinia
import { createPinia } from 'pinia'
// App
import App from './App.vue'
import router from './router'
// Creation
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
