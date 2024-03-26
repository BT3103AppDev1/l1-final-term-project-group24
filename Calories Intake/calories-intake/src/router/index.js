import { createRouter, createWebHistory } from 'vue-router'
import AddNorMeal from '@/components/AddNorMeal.vue'
import AddCusMeal from '@/components/AddCusMeal.vue'

const routes = [
    {
        path: '/addNorMeal',
        name: 'AddNorMeal',
        component: AddNorMeal
    },
    {
        path: '/addCusMeal',
        name: 'AddCusMeal',
        component: AddCusMeal
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
