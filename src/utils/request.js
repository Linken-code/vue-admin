import axios from "axios";
import { Message } from "element-ui";
//创建axios，赋值给service
//api地址http://www.web-jshtml.cn/productapi
const BASEURL = process.env.NODE_ENV === "production" ? "" : "/devapi";
// const BASEURL = 'http://www.web-jshtml.cn/productapi';
const service = axios.create({
    baseURL: BASEURL, //http://localhost:8080/devapi
    timeout: 5000
});

// 添加请求拦截器,请求数据之前做数据处理
service.interceptors.request.use(
    function(config) {
        // 在发送请求之前做些什么
        //如果后台需要前端在请求头添加参数 token userId
        // config.headers['token'] = '11'
        // config.headers.token = '11'
        return config;
    },
    function(error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 添加响应拦截器，请求接口，返回数据进行拦截
service.interceptors.response.use(
    function(response) {
        let data = response.data;
        if (data.resCode === 0) {
            return response;
        } else {
            // 对响应数据做点什么
            Message.error(data.Message);
            return Promise.reject(data);
        }
    },
    function(error) {
        // 对响应错误做点什么
        return Promise.reject(error);
    }
);
export default service;
//没有使用default，可以同时声明多个export。文件import需要{}括号