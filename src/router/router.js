import App from '../App'

const manage = r => require.ensure([], () => r(require('../page/manage/manage')), 'manage')

const userList = r => require.ensure([], () => r(require('../page/userList/userList')), 'userList')
const userDisplay = r => require.ensure([], () => r(require('../page/userList/userDisplay')), 'userDisplay')
const userEdit = r => require.ensure([], () => r(require('../page/userList/userEdit')), 'userEdit')

const login = r => require.ensure([], () => r(require('../page/login/login')), 'login')

const addAdmin = r => require.ensure([], () => r(require('../page/authoritySetting/addAdmin')), 'addAdmin')
const addRole = r => require.ensure([], () => r(require('../page/authoritySetting/addRole')), 'addRole')
const authoritySetting = r => require.ensure([], () => r(require('../page/authoritySetting/authoritySetting')), 'authoritySetting')

const purchasersList = r => require.ensure([], () => r(require('../page/purchasersList/purchasersList')), 'purchasersList')
const purchasersEdit = r => require.ensure([], () => r(require('../page/purchasersList/purchasersEdit')), 'purchasersEdit')

const supplierList = r => require.ensure([], () => r(require('../page/supplierList/supplierList')), 'supplierList')
const supplierDisplay = r => require.ensure([], () => r(require('../page/supplierList/supplierDisplay')), 'supplierDisplay')

const clearanceList = r => require.ensure([], () => r(require('../page/clearanceList/clearanceList')), 'clearanceList')
const clearanceDetail = r => require.ensure([], () => r(require('../page/clearanceList/clearanceDetail')), 'clearanceDetail')
const clearanceEdit = r => require.ensure([], () => r(require('../page/clearanceList/clearanceEdit')), 'clearanceEdit')

export default [
    //地址为空时跳转login页面
    {
        path: '',
        redirect: '/login'
    },
    //登录页
    {
        path: '/login',
        component: login
    },
    //登录后的默认页
    {
        path: '/manage',
        component: manage,
        children: [
            //会员管理下的用户管理
            {
                path: '/userList',  // 用户列表页
                component: userList,
                children: []
            },
            {
                path: '/userEdit', //新增用户页
                component: userEdit,
            },
            {
                path: '/userDisplay', //用户详情页
                component: userDisplay,
            },
            //会员管理下的供应商管理
            {
                path: '/supplierList',  //供应商列表页
                component: supplierList,
                children: []
            },
            {
                path: '/supplierDisplay', //供应商详情页
                component: supplierDisplay,
            },
            //会员管理下的采购商管理
            {
                path: '/purchasersList',  //供应商列表页
                component: purchasersList,
                children: []
            },
            {
                path: '/purchasersEdit', //供应商编辑页
                component: purchasersEdit,
            },
            //系统管理下的权限设置
            {
                path: '/authoritySetting',
                component: authoritySetting,
                children: []
            },
            {
                path: '/addAdmin', //新增管理员页
                component: addAdmin,
            },
            {
                path: '/addRole', //新增角色页
                component: addRole,
            },
            //外贸服务管理下的通关结汇管理
            {
                path: '/clearanceList',
                component: clearanceList,
                children: []
            },
            {
                path: '/clearanceDetail', //报关单详情页
                component: clearanceDetail,
            },
            {
                path: '/clearanceEdit', //报关单编辑页
                component: clearanceEdit,
            }
        ]
    }
]