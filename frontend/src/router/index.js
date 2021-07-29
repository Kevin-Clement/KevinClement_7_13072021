import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signup',
    name: 'signup',

    component: () => import(/* webpackChunkName: "about" */ '../views/Signup.vue')
  },
  {
    path:'/login',
    name:'login',

    component: () => import('../views/Login.vue')
  },
  {
    path: "/wall",
    name: "wall",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Wall.vue"),
    beforeEnter: (to, from, next) => {
      let token = localStorage.getItem("token");
      if (token) {
        next();
      } else {
        next({ name: "login" });
      }
    },
  },
  {
    path: "/profile/:id",  
    name: "profile",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Profile.vue"),
    beforeEnter: (to, from, next) => {
      let token = localStorage.getItem("token");
      if (token) {
        next();
      } else {
        next({ name: "login" });
      }
    },
  },
]

const router = new VueRouter({
  routes: routes,
  mode: 'history'
})


export default router
