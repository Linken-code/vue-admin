//信息弹窗 
import { GetCategory } from "../api/news";
import { MessageBox, Message } from 'element-ui';

export function message(msg) {
    MessageBox.confirm(msg.content, '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        msg.fn && msg.fn(msg.data)
        Message({
            type: 'success',
            message: '删除成功!'
        });
    }).catch(() => {
        Message({
            type: 'info',
            message: '已取消删除'
        });
    });
}
//获取分类信息
export function getInfoCategory() {
    const Category = []
    GetCategory({}).then(Response => {
        let data = Response.data.data
        Category = data
    }).catch(error => {

    })
    return Category
}