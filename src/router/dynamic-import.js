let routerArr = []

//查找views目录，以.vue结尾的文件，查找子目录
const contexts = require.context('@/pages', true, /\.vue$/)
contexts.keys().forEach((value) => {
  const path = value.substr(value.indexOf('/'), value.lastIndexOf('.') - 1).replace('/index', '')
  const componentLocation = value.substr(value.indexOf('.') + 1, value.lastIndexOf('.') - 1)
  const componentName = path.split('/')[1]
  //添加到路由数组中
  routerArr.push({
    path: path,
    name: componentName,
    component: () => import(`@/pages${componentLocation}`),
  })
})

export default routerArr
