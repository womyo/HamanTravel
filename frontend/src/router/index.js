import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home'
import Place from '../views/Place'
import Haman from '../views/Haman'
import Vue from 'vue'

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
    {
      path: '/haman',
      name: 'Haman',
      component: Haman
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
  })

export default router