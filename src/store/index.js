import Vue from "vue";
import Vuex from "vuex";
import { getUserName } from "../utils/token"

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isCollapse: false || JSON.parse(sessionStorage.getItem('isCollapse')),
        token: '',
        username: getUserName() || ''
    },
    //缓存计算属性
    getters: {},
    //同步
    mutations: {
        set_isCollapse(state) {
            state.isCollapse = !state.isCollapse
                //html5sessionStorage存储
            sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse))
        },
        set_username(state, value) {
            state.username = value
        }
    },
    //异步
    actions: {},
    //模块化
    modules: {}
});