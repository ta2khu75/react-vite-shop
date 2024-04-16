import axios from "../utils/axiosInstance";
const getAllProductImages = (id) =>{
    if(id==undefined) return [];
    return axios.get(`admin/product-images/product/${id}`);
}
const getProductimage =async (id,name) =>{
    try {
        const productImage=await  axios.get(`admin/product-images/image/${id}?name=${name}`, {
      responseType: "blob",
    });
        return URL.createObjectURL(productImage);
    } catch (error) {
        console.error("Error fetching product image:", error);
        return;
    }
    
   // return productImages?.map( (productImage) => {const imageUrl=URL.createObjectURL(productImage.image); return {...productImage,imageUrl} });
}
const addProductImage=(id, file)=>{
    const form = new FormData();
    form.append("productId", id);
    form.append("image", file);
    return axios.post(`admin/product-images`, form);
}
const updateProductImage=(id, productId, file)=>{
    const form = new FormData();
    form.append("productId", productId);
    form.append("image", file);
    return axios.put(`admin/product-images/${id}`, form);
}
const deleteProductImage=(id)=>{
    return axios.delete(`admin/product-images/${id}`)
}
export {getAllProductImages,getProductimage, addProductImage, updateProductImage, deleteProductImage}