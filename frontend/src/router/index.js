import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home'
import Place from '../views/Place'
import KeywordTour from '../views/KeywordTour'
import Course from '../views/Course'
import Community from '../views/Community'
import Write from '../components/Write'
import View from '../components/View'
import Login from '../views/Login'
import Register from '../views/Register'
const Profile = () => import("../views/Profile")

const routes = [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: "함 안 갈래?",
      },
    },
    {
      path: '/place',
      name: 'Place',
      component: Place,
      meta: {
        title: "모범음식점",
      },
    },
    {
      path: '/keyword',
      name: 'keyword',
      component: KeywordTour,
      meta: {
        title: "키워드 관광",
      },
    },
    {
      path: '/course',
      name: 'course',
      component: Course,
      meta: {
        title: "코스 추천",
      },
    },
    {
      path: '/community/list',
      name: 'community',
      component: Community,
      meta: {
        title: "함 말해봐!",
      },
    },
    {
			path: '/community/write',
			name: Write,
			component: Write,
      meta: {
        title: "함 말해봐!-작성",
      },
		},
    {
			path: '/community/view',
			name: View,
			component: View,
      meta: {
        title: "함 말해봐!-상세보기",
      },
		},
    {
			path: '/login',
			name: Login,
			component: Login,
      meta: {
        title: "로그인",
      },
		},
    {
			path: '/register',
			name: Register,
			component: Register,
      meta: {
        title: "회원가입",
      },
		},
    {
      path: "/profile",
      name: Profile,
      // lazy-loaded
      component: Profile,
      meta: {
        title: "프로필"
      }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})


router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router