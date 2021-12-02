// 左侧导航栏
const navMsg = [{
  name: '首页',
  path: '/'
}, {
  name: '音乐馆',
  path: '/song-list'
}, {
  name: '我的音乐',
  path: '/my-music'
}]

// 右侧导航栏
const loginMsg = [{
  name: '管理Music Max ID',
  path: '/login-in'
}, {
  name: '创建Music Max ID',
  path: '/sign-up'
}]

// 用户下拉菜单项
const menuList = [{
  name: '管理用户信息',
  path: '/setting'
}, {
  name: '注销',
  path: 0
}]

export {
  navMsg,
  loginMsg,
  menuList
}
