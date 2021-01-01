import router from ".";

import { getToken, getUserName, removeUserName } from "../utils/token";
// import router from "./index";
//路由守卫
const whiteRouter = ['/login']; //indexOf判断,如果不存在返回-1
//全局前置守卫
router.beforeEach((to, from, next) => {
    //如果是检验token，就是if(getToken())
    if (getUserName()) {
        //如果重新跳转到login页面，则删除用户，要求重新登录
        if (to.ptah === '/login') {
            removeUserName()
            next()
        } else {
            next()
        }
        //路由动态权限，分配菜单
        //1\to=/console
        //2\to=/index
    } else {
        if (whiteRouter.indexOf(to.path) !== -1) {
            next()
        } else {
            next('/login') //路由跳转
        }
    }
})