import Vue from 'vue'
import Router from 'vue-router'
import Landing from '@/components/Landing'
import Login from '@/components/Login'
import Profile from '@/components/Profile'
import EmailVerified from '@/components/EmailVerified'
import Signup from '@/components/Signup/NewSignup'
import LinkAccounts from '@/components/LinkAccounts'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: Landing
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/verification',
      name: 'EmailVerified',
      component: EmailVerified
    },
    {
      path: '/LinkAccounts',
      name: 'LinkAccounts',
      component: LinkAccounts
    }
  ]
})
