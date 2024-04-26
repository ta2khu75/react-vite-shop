import axios from "../utils/axiosInstance";
const createCategory = (name, image) => {
  const form = new FormData();
  form.append("name", name);
  if (image !== null && image !== undefined) {
    form.append("image", image);
  }
  return axios.post("admin/category", form);
};
const updateCategory = (id, name, image) => {
  const form = new FormData();
  form.append("name", name);
  console.log(image);
  if (image !== null && image !== undefined && typeof image !== "string") form.append("image", image);
  return axios.put(`admin/category/${id}`, form);
};
const deleteCategory = (id) => {
  return axios.delete(`admin/category/${id}`);
};
const getAllCategory = () => {
  return axios.get("admin/category");
};
const getImageCategory = (fileName) => {
  const response = axios.get(`admin/category/image/${fileName}`, {
    responseType: "blob",
  });
  return response;
  // const mimeType = response.headers["content-type"];
  // return new File([response.data], fileName, { type: mimeType });
};
export {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategory,
  getImageCategory,
};
