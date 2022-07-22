import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home'
import Place from '../views/Place'
import KeywordTravel from '../views/KeywordTravel'
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
      path: '/keyword',
      name: 'keyword',
      component: KeywordTravel
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
  })

export default router