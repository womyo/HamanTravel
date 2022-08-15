import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home'
import Place from '../views/Place'
import KeywordTravel from '../views/KeywordTravel'
import Course from '../views/Course'
import Community from '../views/Community'
import Write from '../components/Write'

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
    {
      path: '/course',
      name: 'course',
      component: Course
    },
    {
      path: '/community/list',
      name: 'community',
      component: Community
    },
		,{
			path: '/community/write'
			,name: Write
			,component: Write
		}
]

const router = createRouter({
    history: createWebHistory(),
    routes
  })

export default router