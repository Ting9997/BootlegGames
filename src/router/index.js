import { createRouter, createWebHistory } from 'vue-router';
import DropZoneView from '../views/DropZoneView.vue';
import GamesView from '../views/GamesView.vue';
import ContactsView from '../views/ContactsView.vue';
import CheckersView from '../views/CheckersView.vue';
import SnakeView from '../views/SnakeView.vue';
import BallDownView from '../views/BallDownView.vue';
import Connect4 from '../views/ConnectFourView.vue';
import LoginView from '../views/LoginView.vue';

const routes = [
  {
    path: '/',
    name: 'drop_zone',
    component: DropZoneView
  },
  {//=============== Games =================\\
    path: '/games',
    name: 'games',
    component: GamesView
  },
  {
    path: '/contacts',
    name: 'contacts',
    component: ContactsView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
   // {
  //   path: '/about'.
  //   name: 'about',
  //   component: AboutView
  // },
  {
    path: '/games/snake',
    name: 'snake',
    component: SnakeView
  },
  {
    path: '/games/checkers',
    name: 'checkers',
    component: CheckersView
  },
  {
  path: '/games/balldown',
  name: 'balldown',
  component: BallDownView
  },
  {
    path: '/games/connect4',
    name: 'connect4',
    component: Connect4
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
