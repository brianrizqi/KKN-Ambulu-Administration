import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/Login";
import Logout from "../views/Logout";
import store from "../store";
import Letter from "../views/Letter";
import LetterCategories from "../views/LetterCategories";
import LetterCreate from "../views/LetterCreate";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    meta: {
      requiresAuth: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      requiresVisitor: true
    }
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/letter-categories',
    name: 'LetterCategories',
    component: LetterCategories,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/letter',
    name: 'Letter',
    component: Letter,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/letter/create',
    name: 'LetterCreate',
    component: LetterCreate,
    meta: {
      requiresAuth: true
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const loggedIn = store.getters.loggedIn;
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!loggedIn) {
      next({
        name: 'Login'
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if(loggedIn){
      next({
        name: 'About'
      })
    } else {
      next();
    }
  } else {
    next();
  }
})

export default router
