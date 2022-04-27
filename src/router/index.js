import { createRouter, createWebHistory } from 'vue-router';
import DropZoneView from '../views/DropZoneView.vue';
import GamesView from '../views/GamesView.vue';
import ContactsView from '../views/ContactsView.vue';
import CheckersView from '../views/CheckersView.vue';
import SnakeView from '../views/SnakeView.vue';
import BallDownView from '../views/BallDownView.vue';

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
    path: '/contacts/rajiv_williams',
    name: 'rajiv_williams',
    component: ContactsView
  },
  {
    path: '/contacts/andy_wang',
    name: 'andy_wang',
    component: ContactsView
  },
  {
    path: '/contacts/ting_wu',
    name: 'ting_wu',
    component: ContactsView
  },
  {
    path: '/contacts/marco_ma',
    name: 'marco_ma',
    component: ContactsView
  },
  {
    path: '/contacts/owais_najmi',
    name: 'owais_najmi',
    component: ContactsView
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
