import axios from "@/utils/request.js"
//获取验证码
export function GetSms(data) {
    axios.request({
        method: 'get',
        url: '/getSms/',
        data: data
    })
}
//获取用户角色
//登录
//注册