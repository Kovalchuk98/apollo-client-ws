import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { ApolloPlugin } from '@/plugins/apollo'

const app = createApp(App)

app.use(createPinia()).use(ApolloPlugin)

app.mount('#app')
