import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/index'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/index',
                    name: 'index',
                    component: resolve => require(['../components/page/index.vue'], resolve),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/userList',
                    component: resolve => require(['../components/page/userList.vue'], resolve),
                    meta: { title: '用户列表' }
                },
                {
                    path: '/wagesGrant',
                    component: resolve => require(['../components/page/wagesGrant.vue'], resolve),
                    meta: { title: '发放薪资' }
                },
                {
                    path: '/wagesQuery',
                    component: resolve => require(['../components/page/wagesQuery.vue'], resolve),
                    meta: { title: '薪资查询' }
                },
                {
                    path: '/wagesChange',
                    component: resolve => require(['../components/page/wagesChange.vue'], resolve),
                    meta: { title: '薪资变更' }
                },
                {
                    path: '/weChat',
                    component: resolve => require(['../components/page/weChat.vue'], resolve),
                    meta: { title: '在线聊天' }
                },
                {
                    path: '/404',
                    component: resolve => require(['../components/page/404.vue'], resolve),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: resolve => require(['../components/page/403.vue'], resolve),
                    meta: { title: '403' }
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/login.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
