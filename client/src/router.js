import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Item from './views/ItemList.vue'
import Customer from './views/Customer.vue'
import MyProfile from './views/MyProfile.vue'
import SignUp from './components/SignUp.vue'
import Login from './components/Login'
import Logout from './components/Logout'
import CreateItem from './components/createItem.vue'

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
      path: '/items',
      name: 'item',
      component: Item
    },
    {
      path: '/customers',
      name: 'customer',
      component: Customer
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
      path: '/createItem',
      name: 'createItem',
      component: CreateItem
    }
  ]
})
