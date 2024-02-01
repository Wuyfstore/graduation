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
      component: () => import('@/views/Login/index.vue')
    },
    {
      path: '/model',
      component: () => import('@/views/Login/selectModel.vue')
    },
    {
      path: '/showInfoMain',
      name: 'showInfoMain',
      redirect: '/showInfoMain/allInfo',
      component: () => import('@/views/index.vue'),
      children: [
        {
          path: '/showInfoMain/allInfo',
          name: 'AllInfo',
          component: () => import('@/views/showInfoMain/allInfo/allInfo.vue')
        },
        {
          path: '/showInfoMain/spatialAnalysis',
          name: 'Analysis',
          component: () => import('@/views/showInfoMain/analysis/spatialAnalysis.vue')
        },
        {
          path: '/showInfoMain/three',
          name: 'Three',
          component: () => import('@/views/showInfoMain/three/index.vue')
        }
      ]
    },
    // {
    //   path: '/three',
    //   name: 'THREE',
    //   component: () => import('@/views/showInfoMain/three/index.vue')
    // },
    {
      path: '/managementMain/System',
      name: 'managementMain',
      component: () => import('@/views/managementMain/index.vue')
    }
  ]
})

export default router
