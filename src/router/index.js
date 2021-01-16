import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login/index.vue";
import Layout from "../views/Layout/index.vue";
Vue.use(VueRouter);

const routes = [{
        path: "/",
        redirect: "login",
        hidden: true,
        meta: {
            name: "主页"
        }
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
        hidden: true,
        meta: {
            name: "登录"
        }
    },
    {
        path: "/console",
        name: "Console",
        redirect: "index",
        meta: {
            name: "控制台",
            icon: 'el-icon-s-tools'
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.懒加载
        component: Layout,
        children: [{
            path: "/index",
            name: "Index",
            meta: {
                name: "首页",
                icon: 'el-icon-s-home'
            },
            component: () =>
                import ("../views/Console/index.vue")
        }]
    },
    {
        path: "/info",
        name: "Info",
        meta: {
            name: "信息管理",
            icon: 'el-icon-s-order'
        },
        // which is lazy-loaded when the route is visited.懒加载
        component: Layout,
        children: [{
                path: "/infoIndex",
                name: "InfoIndex",
                meta: {
                    name: "信息列表",
                    icon: 'el-icon-chat-line-square'
                },
                component: () =>
                    import ("../views/Info/index.vue")
            },
            {
                path: "/infoCategory",
                name: "InfoCategory",
                meta: {
                    name: "信息分类",
                    icon: 'el-icon-document'
                },
                component: () =>
                    import ("../views/Info/category.vue")
            },
            {
                path: "/infoDetails",
                name: "InfoDetails",
                meta: {
                    name: "信息详情",
                    icon: 'el-icon-document'
                },
                component: () =>
                    import ("../views/Info/infodetails.vue")
            }
        ]
    },
    {
        path: "/user",
        name: "User",
        meta: {
            name: "用户管理",
            icon: 'el-icon-user'
        },
        // which is lazy-loaded when the route is visited.懒加载
        component: Layout,
        children: [{
            path: "/userIndex",
            name: "UserIndex",
            meta: {
                name: "用户列表",
                icon: 'el-icon-s-custom'
            },
            component: () =>
                import ("../views/User/index.vue")
        }]
    },
    {
        path: "/page404",
        name: "page404",
        hidden: true,
        meta: {
            name: "404",
            icon: 'el-icon-s-tools'
        },
        // which is lazy-loaded when the route is visited.懒加载
        component: Layout,
        children: [{
            path: "/404",
            name: "404",
            meta: {
                name: "404",
                icon: 'el-icon-s-tools'
            },
            component: () =>
                import ("../views/404.vue")
        }]
    },
    { path: "*", redirect: "/404", hidden: true, },
];
const router = new VueRouter({
    routes
});

export default router;