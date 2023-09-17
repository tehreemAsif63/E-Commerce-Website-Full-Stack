import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Item from './views/Item.vue'
import Customer from './views/Customer.vue'
import MyProfile from './views/MyProfile.vue'
import SignUp from './views/SignUp.vue'

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
      path: '/minasidor',
      name: 'MyProfile',
      component: MyProfile
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    }
  ]
})
