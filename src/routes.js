import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'

import Config from './views/config/Config.vue'
import Approval from './views/approval/Approval.vue'
import ContractAward from './views/bid/ContractAward.vue'
import Permission from './views/bid/Permission.vue'
import Tender from './views/bid/Tender.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '',
        //叶子节点。
        leaf : true,
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/config', component: Config, name: '配置管理', hidden: true }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/approval', component: Approval, name: '电子审批异常处理' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '招投标维护',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/bid/contract-award', component: ContractAward, name: '发包单位' },
            { path: '/bid/permission', component: Permission, name: '人员权限' },
            { path: '/bid/tender', component: Tender, name: '项目投标单位' }
        ]
    },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '',
    //     iconCls: 'fa fa-address-card',
    //     leaf: true,//只有一个节点
    //     children: [
    //         { path: '/page6', component: Page6, name: '导航三' }
    //     ]
    // },
    // {
    //     path: '/',
    //     component: Home,
    //     name: 'Charts',
    //     iconCls: 'fa fa-bar-chart',
    //     children: [
    //         { path: '/echarts', component: echarts, name: 'echarts' }
    //     ]
    // },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;