import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/views/LoginPage.vue'
import RegistrationPage from '@/views/RegistrationPage.vue'
import HomePage from '@/views/HomePage.vue'
import ForgotPage from '@/views/ForgotPage.vue'
import UsernameCreation from '@/views/UsernameCreation.vue'

const routes = [
    {
      path: '/',
      name: 'Login',
      component: LoginPage
    },
    {
      path: '/registration',
      name: 'Registration',
      component: RegistrationPage
    },
    {
      path: '/home',
      name: 'Home',
      component: HomePage
    },
    {
      path: '/forgot',
      name: 'ForgotPassword',
      component: ForgotPage
    },
    {
      path: '/username-creation',
      name: 'UsernameCreation',
      component: UsernameCreation,
    },
  ]

  const router = createRouter({
    history: createWebHistory(),
    routes
  })

  export default router