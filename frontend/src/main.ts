import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import en from './locales/en.json'
import pl from './locales/pl.json'
import AboutView from './Views/AboutView/AboutView.vue'
import Game from './Views/Game.vue'
import JoinView from './Views/JoinView/JoinView.vue'
import LevelResultsView from './Views/LevelResultsView/LevelResultsView.vue'
import LevelSelectionView from './Views/LevelSelectionView/LevelSelectionView.vue'
import LevelView from './Views/LevelView/LevelView.vue'
import LoginView from './Views/LoginView/LoginView.vue'
import MainView from './Views/MainView/MainView.vue'
import PageNotFoundView from './Views/PageNotFoundView/PageNotFoundView.vue'
import TeacherQuestionsView from './Views/TeacherView/TeacherQuestionsView/TeacherQuestionsView.vue'
import TeacherTopicsView from './Views/TeacherView/TeacherTopicsView/TeacherTopicsView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      children: [
        { name: 'teacher-topics', path: '/', component: TeacherTopicsView },
        { name: 'teacher-questions', path: '/questions', component: TeacherQuestionsView },
        { name: 'login', path: 'login', component: LoginView },
      ],
    },
    {
      path: '/game/',
      component: Game,
      children: [
        { name: 'main', path: '', component: MainView },
        { name: 'about', path: 'about', component: AboutView },
        { name: 'join', path: 'join', component: JoinView },
        { name: 'level-selection', path: 'level-selection', component: LevelSelectionView },
        { name: 'level-results', path: 'level-results', component: LevelResultsView },
        {
          name: 'level',
          path: 'level/:levelIndex(\\d+)',
          component: LevelView,
          props: true,
        },
        { name: 'error-404', path: '/:pathMatch(.*)*', component: PageNotFoundView },
      ],
    },
  ],
})

const i18n = createI18n({
  locale: 'pl',
  messages: {
    en,
    pl,
  },
})

const app = createApp(App)

app.use(router)
app.use(i18n)
const pinia = createPinia()
app.use(pinia)

app.mount('#app')
