import service from "../utils/request.js";
//新增列表
export function GetList(data) {
    return service.request({
        method: "post",
        url: "/news/getList/",
        data: data
    });
}
//新增信息
export function AddInfo(data) {
    return service.request({
        method: "post",
        url: "/news/add/",
        data: data
    });
}
//编辑
export function EditInfo(data) {
    return service.request({
        method: "post",
        url: "/news/editInfo/",
        data: data
    });
}
//删除
export function DeleteInfo(data) {
    return service.request({
        method: "post",
        url: "/news/deleteInfo/",
        data: data
    });
}
//添加一级分类
export function AddFirstCategory(data) {
    return service.request({
        method: "post",
        url: "/news/addFirstCategory/",
        data: data
    });
}
//获取分类
export function GetCategory() {
    return service.request({
        method: "post",
        url: "/news/getCategoryAll/"

    });
}
//删除分类
export function DeleteCategory(data) {
    return service.request({
        method: "post",
        url: "/news/deleteCategory/",
        data: data
    });
}
//修改分类
export function SendEditCategory(data) {
    return service.request({
        method: "post",
        url: "/news/editCategory/",
        data: data
    });
}