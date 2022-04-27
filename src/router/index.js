import { createRouter, createWebHistory } from 'vue-router';
import DropZoneView from '../views/DropZoneView.vue';
import GamesView from '../views/GamesView.vue';
import CheckersView from '../views/CheckersView.vue';
import BallGameView from '../views/BallGameView.vue';
const routes = [
  {
    path: '/',
    name: 'drop_zone',
    component: DropZoneView
  },
  {
    path: '/games',
    name: 'games',
    component: GamesView
  },
  {
    path: '/checkers',
    name: 'checkers',
    component: CheckersView
  },
  {
    path: '/ballgame',
    name: 'ballgame',
    component: BallGameView
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
