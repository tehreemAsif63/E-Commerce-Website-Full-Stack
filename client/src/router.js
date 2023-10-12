import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import MyProfile from './views/Profile.vue'
import SignUp from './components/SignUp.vue'
import Login from './components/Login'
import Logout from './components/Logout'
import About from '@/views/About.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },    
    {
      path: '/myprofile',
      name: 'MyProfile',
      component: MyProfile
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout
    },
    { 
      path: '/about',
      name: 'About', 
      component: About 
    }
  ]
})
