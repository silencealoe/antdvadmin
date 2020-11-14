import router , { dynamicRouters } from '../router/'
const menu = {
    namespaced: true,
    state:{
        menuList: []
    },
    mutations:{
      changeMenuList (state, payload) {
          state.menuList = payload
      }
    },
    actions:{
        getMenuList({commit}) {
            // await new Promise(() => {
                setTimeout(()=>{
                    const list = [
                        {
                            id: '1',
                            title: '性能检测',
                            link: '/checkPath'
                        },
                        {
                            id: '2',
                            title: '表格检索',
                            link: '/table'
                        },
                        {
                            id: '3',
                            title: '权限管理',
                            link: '/auth',
                            children: [
                                {
                                    id: '31',
                                    title: '路由权限',
                                    link: '/auth/router'
                                },
                                // {
                                //     id: '32',
                                //     title: '角色权限',
                                //     link: '/auth/role'
                                // }
                            ]
                        }
                    ]
                commit('changeMenuList', list)
                const routes = []
                const getRoute = (meList, rouList) => {
                    meList.forEach(item => {
                        if (item.children) {
                            const findRoute = rouList.filter(route => route.meta.title === item.title)[0]
                            const childRoues = []
                            item.children.forEach((ite) => {
                                const childrenRoute = findRoute.children.filter(rout => ite.title === rout.meta.title)[0]
                                childRoues.push(childrenRoute)
                            })
                            findRoute.children = childRoues
                            routes.push(findRoute)
                        } else {
                            const findRoute = rouList.filter(route => route.meta.title === item.title)[0]
                            routes.push(findRoute)
                        }
                    })
                }
                const routeObj = {
                    path:'/',
                    name:'home',
                    component:()=>import('../views/home'),
                    children:[]
                }
                routeObj.children = routes
                getRoute (list, dynamicRouters)
                console.log('fini', routes)
                console.log('fini', router)
                // router.options.
                router.addRoutes([routeObj])
                },1000)
            // })
        }

    }
}
export default  menu
