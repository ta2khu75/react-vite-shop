import axios from "../utils/axiosInstance";
const createProductDetails = (productId, optionId, sizeId, price) => {
    const form = new FormData();
    form.append("productId", productId);
    form.append("optionId", optionId);
    if (sizeId) form.append("sizeId", sizeId);
    form.append("price", price);
    return axios.post("admin/product-details", form);
}
const updateProductDetails = (id, productId, optionId, sizeId, price) => {
    const form = new FormData();
    form.append("productId", productId);
    form.append("optionId", optionId);
    form.append("sizeId", sizeId);
    form.append("price", price);
    return axios.put(`admin/product-details/${id}`, form);
}
const getAllProductDetails = (productId) => {
    if (productId == undefined) return [];
    return axios.get(`admin/product-details/product/${productId}`);
}
const deleteProductDetails = (id) => {
    return axios.delete(`admin/product-details/${id}`)
}
const getProductDetails=(id)=>{
    return axios.get(`admin/product-details/${id}`);
}
export { createProductDetails, updateProductDetails, getAllProductDetails, deleteProductDetails, getProductDetails }
