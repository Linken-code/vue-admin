import axios from "axios";
import { Message } from 'element-ui';
//创建axios，赋值给axios
//api地址http://www.web-jshtml.cn/productApi
const BASEURL = '/dev-api';
const axios = axios.create({
    baseURL: BASEURL,
    timeout: 1000,
});

// 添加请求拦截器
axios.interceptors.request.use(
    function(config) {
        // 在发送请求之前做些什么
        return config;
    },
    function(error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 添加响应拦截器
axios.interceptors.response.use(
    function(response) {
        let data = response.data
        if (data.code !== 0) {
            Message.error(data.Message);
            return Promise.reject(data);
        } else {
            // 对响应数据做点什么
            return response;
        }
    },
    function(error) {
        // 对响应错误做点什么
        return Promise.reject(error);
    }
);


export default axios;
//没有使用default，可以同时声明多个export。文件import需要{}括号