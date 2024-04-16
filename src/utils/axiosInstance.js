import  axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:3300/api/',
});
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log('response :>> ', response);
    return response.data;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log(error?.response?.data?.messages);
    throw new Error(error?.response?.data?.message)
  });
export default instance;