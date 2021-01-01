import cookie from "js-cookie";

export function getToken() {
    return cookie.get('admin_token')
}
export function setToken(token) {
    return cookie.set('admin_token', token)
}
export function removeToken() {
    return cookie.remove('admin_token')
}
export function setUserName(value) {
    return cookie.set('username', value)
}

export function getUserName() {
    return cookie.get('username')
}
export function removeUserName() {
    return cookie.remove('username')
}