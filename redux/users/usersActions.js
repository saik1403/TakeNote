import { LOGIN, LOGOUT, ADD_USER, STORE_USER } from "./usersTypes";

const login = (userName) => {
    return {
        type:LOGIN,
        payload:userName
    }
}
const logout = () => {
    return {
        type:LOGOUT
    }
}
const addUser = (user) => {
    return {
        type:ADD_USER,
        payload:user
    }
}
const storeUsers = (users) => {
    return {
        type:STORE_USER,
        payload:users
    }
}
export { login, logout, addUser, storeUsers };