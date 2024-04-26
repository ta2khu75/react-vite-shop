import axios from "../utils/axiosInstance"
const login=(email, password)=>{
    const form=new FormData();
    form.append("email",email);
    form.append("password",password)
    return axios.post("login",form);
}
const register=(email, name, password)=>{
    const form=new FormData();
    form.append("email",email);
    form.append("password", password);
    form.append("name",name)
    return axios.post("register",form)
}
const createUser=(email, name, password, locked, roleId)=>{
    const form=new FormData();
    form.append("email", email);
    form.append("name",name);
    form.append("password",password);
    form.append("locked",locked)
    form.append("roleId",roleId);
    return axios.post("admin/user",form)
}
const updateUser=(id, email, name, password,locked, roleId)=>{
    const form=new FormData();
    form.append("email", email);
    form.append("name",name);
    form.append("locked",locked)
    form.append("password",password);
    form.append("roleId",roleId);
    return axios.put(`admin/user/${id}`,form)
}
const deleteUser=(id)=>{
    return axios.delete(`admin/user/${id}`);
}
const getUserById=(id)=>{
    return axios.get(`admin/user/${id}`);
}
const getPageUser=(page, size)=>{
    return axios.get(`admin/user?page=${page}&size=${size}`);
}
export {login, register, createUser, updateUser, deleteUser, getPageUser,getUserById}