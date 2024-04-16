import axios from "../utils/axiosInstance"
const createRole=(name)=>{
    const form=new FormData();
    form.append("name",name);
    return axios.post("admin/role",form)
}
const updateRole=(id, name)=>{
    const form=new FormData();
    form.append("name",name);
    return axios.put(`admin/role/${id}`,form);
}
const deleteRole=(id)=>{
    return axios.delete(`admin/role/${id}`)
}
const getAllRole=()=>{
    return axios.get("admin/role");
}
export {getAllRole, createRole, updateRole, deleteRole}