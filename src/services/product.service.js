import axios from "../utils/axiosInstance";
const getAllProducts = () => {
  return axios.get("admin/product");
};
const createProduct = (categoryId, name, thumbnail, active) => {
  const form = new FormData();
  form.append("categoryId", categoryId);
  form.append("name", name);
  if (thumbnail != null) form.append("thumbnail", thumbnail);
  form.append("active", active);
  form.append("userId", 2);
  return axios.post("admin/product", form);
};
const updateProduct = (id, categoryId, name, thumbnail, active) => {
  const form = new FormData();
  form.append("categoryId", categoryId);
  form.append("name", name);
  if (typeof thumbnail !== "string") form.append("thumbnail", thumbnail);
  form.append("active", active);
  form.append("userId", 24);
  return axios.put(`admin/product/${id}`, form);
};
const deleteProduct = (id) => {
  return axios.delete(`admin/product/${id}`);
};
const getProductImage = async (name) => {
  try {
    const data = await axios.get(`admin/product/image/${name}`, {
      responseType: "blob",
    });
    return URL.createObjectURL(data);
  } catch (error) {
    return;
  }
};
const getProduct = (id) => {
  return axios.get(`admin/product/${id}`);
};
export {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductImage,
  getProduct,
};
