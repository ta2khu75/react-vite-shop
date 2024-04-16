import axios  from "../utils/axiosInstance";
const getAllProductSizes=(productId)=>{
    if(productId==undefined) return [];
    return axios.get(`admin/size/product/${productId}`);
}
const createSize=(productId,name)=>{
    const form=new FormData();
    form.append("productId",productId);
    form.append("name",name);
    return axios.post("admin/size",form);
}
const updateSize=(id,productId,name)=>{
    const form=new FormData();
    form.append("productId",productId);
    form.append("name",name);
    return axios.put(`admin/size/${id}`,form);
}
const deleteSize=(id)=>{
    return axios.delete(`admin/size/${id}`);
}
export {getAllProductSizes,createSize,updateSize,deleteSize}
