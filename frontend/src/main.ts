import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import en from './locales/en.json'
import pl from './locales/pl.json'
import AboutView from './views/AboutView/AboutView.vue'
import Game from './views/Game.vue'
import JoinView from './views/JoinView/JoinView.vue'
import LevelResultsView from './views/LevelResultsView/LevelResultsView.vue'
import LevelSelectionView from './views/LevelSelectionView/LevelSelectionView.vue'
import LevelView from './views/LevelView/LevelView.vue'
import LoginView from './views/LoginView/LoginView.vue'
import MainView from './views/MainView/MainView.vue'
import PageNotFoundView from './views/PageNotFoundView/PageNotFoundView.vue'
import TeacherMainView from './views/TeacherView/TeacherMainView.vue'
import TeacherQuestionsView from './views/TeacherView/TeacherQuestionsView/TeacherQuestionsView.vue'
import TeacherStatsView from './views/TeacherView/TeacherStatsView.vue'
import TeacherTopicsView from './views/TeacherView/TeacherTopicsView/TeacherTopicsView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      children: [
        { name: 'teacher-view', path: '', component: TeacherMainView },
        { name: 'teacher-stats', path: 'stats', component: TeacherStatsView },
        { name: 'teacher-topics', path: 'topics', component: TeacherTopicsView },
        { name: 'teacher-questions', path: 'questions', component: TeacherQuestionsView },
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
