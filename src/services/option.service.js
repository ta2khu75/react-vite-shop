import axios from "../utils/axiosInstance";
const getAllProductOptions = (id) =>{
    if(id==undefined) return [];
    return axios.get(`admin/option/product/${id}`);
}
const createOption = (productId, name) =>{
    const form = new FormData();
    form.append("productId", productId);
    form.append("name", name);
    return axios.post("admin/option", form);
}
const updateOption = (id, productId, name) =>{
    const form = new FormData();
    form.append("productId", productId);
    form.append("name", name);
    return axios.put(`admin/option/${id}`, form);
}
const deleteOption = (id) =>{
    return axios.delete(`admin/option/${id}`);
}
export {getAllProductOptions, createOption, updateOption, deleteOption}