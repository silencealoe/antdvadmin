import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const router = new Router({
    routes:[
        {
          path:'/login',
          name:'login',
          component:()=>import('../views/login')
        },
        {
            path:'/',
            name:'home',
            component:()=>import('../views/home'),
            children:[
                {
                    path:'keepalive',
                    name:'keepalive',
                    component:()=>import('../views/keepalive'),
                    meta:{
                        keepAlive:true
                    },
                    children:[
                        {
                            path:'1',
                            name:'hello',
                            component:()=>import('../components/HelloWorld')
                        },
                        {
                            path:'2',
                            name:'thanks',
                            component:()=>import('../components/Thanks')
                        }
                    ]
                },
                {
                    path:'grafana',
                    name:'grafana',
                    component:()=>import('../views/grafana')
                },
                {
                    path:'table',
                    name:'table',
                    component:()=>import('../views/table')
                },
                {
                    path: 'drag',
                    name: 'drag',
                    component: ()=>import('../views/dragCompo')
                }
            ]
        },
    ]
})
export default router
