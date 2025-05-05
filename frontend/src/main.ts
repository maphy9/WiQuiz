import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import MainView from './Views/MainView/MainView.vue'
import JoinView from './Views/JoinView/JoinView.vue'
import AboutView from './Views/AboutView/AboutView.vue'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: MainView },
    { path: '/about', component: AboutView },
    { path: '/join', component: JoinView }
  ]
})

const app = createApp(App)
app.use(router)
app.mount('#app')
