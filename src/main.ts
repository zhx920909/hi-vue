import './assets/main.css'
import './plugins/tailwindcss/index.css'

import { createApp } from 'vue'
// import { createPinia } from 'pinia'
import { setupStore } from './stores'

import App from './App.vue'
// import router from './router'
import { setupRouter } from './router'

const app = createApp(App)

// app.use(createPinia())
setupStore(app)
// app.use(router)
setupRouter(app)

app.mount('#app')
