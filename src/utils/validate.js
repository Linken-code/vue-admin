 // 过滤特殊字符 
 export function stripscript(s) {
     var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{ }【】‘；：”“'。，、？]")
     var rs = "";
     for (var i = 0; i < s.length; i++) {
         rs = rs + s.substr(i, 1).replace(pattern, '');
     }
     return rs;
 }
 //验证邮箱
 export function validateuserEmail(value) {
     let reg = /^[\u4e00-\u9fa5a-zA-Z\d]+([-_.][\u4e00-\u9fa5A-Za-z\d]+)*@([\u4e00-\u9fa5A-Za-z\d]+[-.]){1,2}[\u4e00-\u9fa5A-Za-z\d]{2,5}$/g;
     return !reg.test(value) ? true : false

 }
 //验证密码
 export function validatePass(value) {
     let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\s\S]{8,16}$/;
     return !reg.test(value) ? true : false
 }
 //验证验证码
 export function validateCode(value) {
     let reg = /^[a-z0-9]{6}$/;
     return !reg.test(value) ? true : false
 }