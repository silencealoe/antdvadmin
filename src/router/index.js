import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const constRouters = [
    {
        path:'/login',
        name:'login',
        component:()=>import('../views/login')
      },
      {
          path:'/',
          name:'home',
          component:()=>import('../views/home'),
          children:[]
      }
]
export const dynamicRouters = [
    {
        path: 'checkPath',
        component: ()=>import('../views/authRouter/pageone.vue'),
        meta: {
            title: '性能检测'
        }
    },
    {
        path: 'table',
        component: () =>import('../views/authRouter/pagetwo.vue'),
        meta: {
            title: '表格检索'
        }
    },
    {
        path: 'auth',
        component: () =>import('../views/authRouter/pagethree.vue'),
        meta: {
            title: '权限管理'
        },
        children: [
            {
                path: 'router',
                component: () =>import('../views/authRouter/pageRouter.vue'),
                meta: {
                    title: '路由权限'
                }
            },
            {
                path: 'role',
                component: () =>import('../views/authRouter/pageRole.vue'),
                meta: {
                    title: '角色权限'
                }
            }
        ]
    }
]
const router = new Router({
    routes: constRouters
                // {
                //     path:'keepalive',
                //     name:'keepalive',
                //     component:()=>import('../views/keepalive'),
                //     meta:{
                //         keepAlive:true
                //     },
                //     children:[
                //         {
                //             path:'1',
                //             name:'hello',
                //             component:()=>import('../components/HelloWorld')
                //         },
                //         {
                //             path:'2',
                //             name:'thanks',
                //             component:()=>import('../components/Thanks')
                //         }
                //     ]
                // },
                // {
                //     path:'grafana',
                //     name:'grafana',
                //     component:()=>import('../views/grafana')
                // },
                // {
                //     path:'table',
                //     name:'table',
                //     component:()=>import('../views/table')
                // },
                // {
                //     path: 'drag',
                //     name: 'drag',
                //     component: ()=>import('../views/dragCompo')
                // },
                // {
                //     path: 'pages',
                //     name: 'pages',
                //     component: ()=>import('../views/dragPages')
                // }
})
export default router
