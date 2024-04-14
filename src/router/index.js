import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/views/LoginPage.vue'
import RegistrationPage from '@/views/RegistrationPage.vue'
import HomePage from '@/views/HomePage.vue'
import ForgotPage from '@/views/ForgotPage.vue'
import UsernameCreation from '@/views/UsernameCreation.vue'
import ProfilePage from '@/views/ProfilePage.vue';
import About from '@/views/About.vue'
import Calorie from '@/views/Calorie.vue'

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
    {
      path: '/profile',
      name: 'Profile',
      component: ProfilePage
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/calorie',
      name: 'Calorie',
      component: Calorie
    },
  ]

  const router = createRouter({
    history: createWebHistory(),
    routes
  })

  export default router