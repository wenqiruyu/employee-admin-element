import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			redirect: '/index'
		},
		{
			path: '/',
			component: (resolve) => require([ '../components/common/Home.vue' ], resolve),
			meta: { title: '自述文件' },
			children: [
				{
					path: '/index',
					name: 'index',
					component: (resolve) => require([ '../components/page/index.vue' ], resolve),
					meta: { title: '我的信息' }
				},
				{
					path: '/updatePassword',
					name: 'updatePassword',
					component: (resolve) => require([ '../components/page/updatePassword.vue' ], resolve),
					meta: { title: '修改密码' }
				},
				{
					path: '/userList',
					component: (resolve) => require([ '../components/page/userList.vue' ], resolve),
					meta: { title: '用户列表' }
				},
				{
					path: '/registerEmp',
					component: (resolve) => require([ '../components/page/registerEmp.vue' ], resolve),
					meta: { title: '员工入职' }
				},
				{
					path: '/deptList',
					component: (resolve) => require([ '../components/page/deptList.vue' ], resolve),
					meta: { title: '部门一览' }
				},
				{
					path: '/wagesGrant',
					component: (resolve) => require([ '../components/page/wagesGrant.vue' ], resolve),
					meta: { title: '发放薪资' }
				},
				{
					path: '/wagesQueryAll',
					component: (resolve) => require([ '../components/page/wagesQueryAll.vue' ], resolve),
					meta: { title: '薪资查询' }
				},
				{
					path: '/wagesQuery',
					component: (resolve) => require([ '../components/page/wagesQuery.vue' ], resolve),
					meta: { title: '个人薪资' }
				},
				{
					path: '/wagesChange',
					component: (resolve) => require([ '../components/page/wagesChange.vue' ], resolve),
					meta: { title: '薪资变更' }
				},
				{
					path: '/userAttendance',
					component: (resolve) => require([ '../components/page/userAttendance.vue' ], resolve),
					meta: { title: '个人考勤' }
				},
				{
					path: '/monthAttendance',
					component: (resolve) => require([ '../components/page/monthAttendance.vue' ], resolve),
					meta: { title: '考勤统计' }
				},
				{
					path: '/subEmpAttendance',
					component: (resolve) => require([ '../components/page/subEmpAttendance.vue' ], resolve),
					meta: { title: '下属考勤' }
				},
				{
					path: '/empLeave',
					component: (resolve) => require([ '../components/page/empLeave.vue' ], resolve),
					meta: { title: '请假流程' }
				},
				{
					path: '/approvalProcedure',
					component: (resolve) => require([ '../components/page/approvalProcedure.vue' ], resolve),
					meta: { title: '流程审批' }
				},
				{
					path: '/queryProcedure',
					component: (resolve) => require([ '../components/page/queryProcedure.vue' ], resolve),
					meta: { title: '流程查询' }
				},
				{
					path: '/supplementSign',
					component: (resolve) => require([ '../components/page/supplementSign.vue' ], resolve),
					meta: { title: '补签流程' }
				},
				{
					path: '/weChat',
					component: (resolve) => require([ '../components/page/weChat.vue' ], resolve),
					meta: { title: '在线聊天' }
				},
				{
					path: '/404',
					component: (resolve) => require([ '../components/page/404.vue' ], resolve),
					meta: { title: '404' }
				},
				{
					path: '/403',
					component: (resolve) => require([ '../components/page/403.vue' ], resolve),
					meta: { title: '403' }
				}
			]
		},
		{
			path: '/findPassword',
			component: (resolve) => require([ '../components/page/findPassword.vue' ], resolve)
		},
		{
			path: '/login',
			component: (resolve) => require([ '../components/page/login.vue' ], resolve)
		},
		{
			path: '*',
			redirect: '/404'
		}
	]
})
