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
    ]
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
    }
  }
}
