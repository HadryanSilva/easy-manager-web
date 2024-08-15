import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory('/easy-manager'),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: () => import('../views/DashboardView.vue')
        },
        {
          path: 'stock',
          name: 'stock',
          component: () => import('../views/StockView.vue')
        },
        {
          path: 'product',
          name: 'product',
          component: () => import('../views/ProductView.vue')
        },
        {
          path: '/users',
          name: 'users',
          component: () => import('../views/ManageUsersView.vue')
        },
        {
          path: '/profile',
          name: 'profile',
          component: () => import('../views/ProfileView.vue')
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue')
    }
  ]
})

export default router
