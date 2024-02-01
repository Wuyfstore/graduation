import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: () => import('@/views/login/index.vue')
    },
    {
      path: '/model',
      component: () => import('@/views/login/selectModel.vue')
    },
    {
      path: '/map',
      name: 'map',
      redirect: '/map/dataScreen',
      component: () => import('@/views/index.vue'),
      children: [
        {
          path: '/map/dataScreen',
          name: 'dataScreen',
          component: () => import('@/views/map/dataScreen/index.vue')
        },
        {
          path: 'map/analysis',
          name: 'analysis',
          component: () => import('@/views/map/analysis/index.vue')
        },
        {
          path: 'map/three',
          name: 'three',
          component: () => import('@/views/map/three/index.vue')
        }
      ]
    },
    {
      path: '/management/system',
      name: 'management',
      component: () => import('@/views/management/index.vue')
    }
  ]
})

export default router
