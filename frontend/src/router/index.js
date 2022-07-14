import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home'
import Place from '../views/Place'

const routes = [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/place',
      name: 'Place',
      component: Place
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
  })
  
  export default router