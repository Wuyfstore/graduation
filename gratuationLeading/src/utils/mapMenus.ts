import type { RouteRecordRaw } from 'vue-router'

//全局
export let firstMenu: any = null

const loadLocalRoutes = () => {
  // 动态添加路由
  // 动态获取所有的路由，放到数组中
  const localRoutes: RouteRecordRaw[] = []
  // 读取router/dynamicRoute中所有的ts文件,   eager是否立即加载所有的文件
  const files: Record<string, any> = import.meta.glob('../router/dynamicRoute/*.ts', {
    eager: true
  })
  for (const key in files) {
    const module = files[key]
    localRoutes.push(module.default)
  }
  return localRoutes
}

export const mapMenusToRoutes = (Menus: any[]) => {
  // 加载本地路由
  const localRoutes = loadLocalRoutes()
  // 根据菜单去匹配路由
  const routes: RouteRecordRaw[] = []
  for (const menu of Menus) {
    for (const submenu of menu.children) {
      const route = localRoutes.find((item) => item.path === submenu.path)
      if (route) {
        // 给顶层菜单增加一个重定向（但是只需要添加一次即可）
        if (!routes.find((item) => item.path === menu.path)) {
          routes.push({ path: menu.path, redirect: route.path })
        }
        // 添加二级菜单的路由
        routes.push(route)
      }
      if (!firstMenu && route) firstMenu = submenu
    }
  }
  return routes
}

/**
 *根据路径去匹配需要显示的菜单
 * @param path 需要匹配的路径
 * @param userMenus 所有菜单
 */
export const mapPathToMenu = (path: string, userMenus: any[]) => {
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.path === path) return submenu
    }
  }
}

export const mapPathToBreadCrumbs = (path: string, userMenus: any[]) => {
  // 定义面包屑
  const breadcrumbs: { name: string; path: string }[] = []
  // 遍历获取面包屑的层级
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.path === path) {
        // 添加面包屑
        // 顶层菜单
        breadcrumbs.push({ name: menu.name, path: menu.path })
        // 匹配菜单
        breadcrumbs.push({ name: submenu.name, path: submenu.path })
      }
    }
  }
  return breadcrumbs
}
