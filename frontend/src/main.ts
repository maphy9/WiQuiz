import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import AboutView from './Views/AboutView/AboutView.vue'
import JoinView from './Views/JoinView/JoinView.vue'
import LevelResultsView from './Views/LevelResultsView/LevelResultsView.vue'
import LevelSelectionView from './Views/LevelSelectionView/LevelSelectionView.vue'
import LevelView from './Views/LevelView/LevelView.vue'
import LoginView from './Views/LoginView/LoginView.vue'
import MainView from './Views/MainView/MainView.vue'
import TeacherQuestionsView from './Views/TeacherView/TeacherQuestionsView/TeacherQuestionsView.vue'
import TeacherTopicsView from './Views/TeacherView/TeacherTopicsView/TeacherTopicsView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { name: 'main', path: '/', component: MainView },
    { name: 'about', path: '/about', component: AboutView },
    { name: 'join', path: '/join', component: JoinView },
    { name: 'levelselect', path: '/levelselect', component: LevelSelectionView },
    { name: 'teacher-topics', path: '/teacher-topics', component: TeacherTopicsView },
    { name: 'teacher-questions', path: '/teacher-questions', component: TeacherQuestionsView },
    { name: 'teacher-questions', path: '/teacher-questions', component: TeacherQuestionsView },
    { name: 'login', path: '/login', component: LoginView },
    { name: 'levelResult', path: '/result', component: LevelResultsView },
    {
      name: 'level',
      path: '/level/:levelId(\\d+)',
      component: LevelView,
      props: true,
    },
  ],
})

const app = createApp(App)

app.use(router)

const pinia = createPinia()
app.use(pinia)

app.mount('#app')
