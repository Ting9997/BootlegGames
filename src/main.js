import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import globalStyle from './styles/ScrollBar.scss'

createApp(App).use(router).use(globalStyle).mount('#app')
