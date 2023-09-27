import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Item from './views/ItemList.vue'
import Customer from './views/Customer.vue'
import MyProfile from './views/MyProfile.vue'
import SignUp from './components/SignUp.vue'
import Login from './components/Login'
import Cart from './views/Cart.vue'
import Logout from './components/Logout'
import CreateItem from './components/createItem.vue'
import Visit from '@/views/Visit.vue'
import Order from './views/Order.vue'



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
      path: '/visit',
      name: 'Visit',
      component: Visit 
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
      path: '/mycart',
      name: 'cart',
      component: Cart
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
    }, {
      path: '/order',
      name: 'order',
      component: Order
    } 
  ]
})
