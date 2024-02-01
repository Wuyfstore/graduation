import { defineStore } from 'pinia'
import { LoginStore } from '@/types/StoreTypes'
import { mapMenusToRoutes } from '@/utils/mapMenus'
import { localCache } from '@/utils/cache'
import { CACHE_MENU } from '@/global/constants'
import { addData, getAllDatas, updateData, deleteData } from '@/server/https'
import router from '@/router'

const useLoginStore = defineStore('login', {
  state: (): LoginStore => ({
    menuList: []
  }),
  actions: {
    async loginAction(form: any) {
      const data = await getAllDatas('/user', 'login', form)

      const menus = await getAllDatas('/menu')
      const menuList = menus.data
      this.menuList = menuList

      // 实现本地缓存，避免刷新后页面消失
      localCache.setCache(CACHE_MENU, menuList)

      //添加动态路由
      const routes = mapMenusToRoutes(menuList)

      routes.forEach((item) => router.addRoute('managementMain', item))

      return data
    },

    // 用户刷新时的操作
    loadLocalCacheActionWhileRefresh() {
      // 用户进行刷新默加载数据
      const menuList = localCache.getCache(CACHE_MENU)
      if (menuList) {
        this.menuList = menuList

        //动态添加路由
        const routes = mapMenusToRoutes(menuList)
        routes.forEach((item) => router.addRoute('managementMain', item))
      }
    }
  }
})

export default useLoginStore
