import Cookie from 'js-cookie'

export default {
  state: {
    isCollapse: false,
    menuList: [
      {
        name: 'Home',
        path: '/home',
        icon: '-s-home',
        lable: '主页',
        child: null
      }
    ],
    menu: []
  },
  mutations: {
    collapseMenu (state) {
      state.isCollapse = !state.isCollapse
    },
    clickMenu (state, value) {
      if (value.name !== 'Home') {
        const res = state.menuList.findIndex(item => item.name === value.name)
        if (res === -1) {
          state.menuList.push(value)
        } else {
          state.menuList.splice(res + 1)
        }
      } else {
        state.menuList.splice(1)
      }
    },
    setMenu (state, val) {
      state.menu = val
      Cookie.set('menu', JSON.stringify(val))
    },
    clearMenu (state) {
      state.menu = []
      Cookie.remove('menu')
    },
    addMenu (state, router) {
      if (!Cookie.get('menu')) {
        return
      }
      const menu = JSON.parse(Cookie.get('menu'))
      state.menu = menu
      const menuArray = []
      menu.forEach(item => {
        if (item.child) {
          item.child = item.child.map(item => {
            item.component = () => import(`../views/${item.url}`)
            return item
          })
          menuArray.push(...item.child)
        } else {
          item.component = () => import(`../views/${item.url}`)
          menuArray.push(item)
        }
      })
      menuArray.forEach(item => {
        router.addRoute('home', item)
      })
    }
  }
}
