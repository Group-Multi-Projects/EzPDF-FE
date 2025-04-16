import axios from "axios";
import Cookies from "js-cookie";
window.onerror = (message, error) => {
    console.error("Runtime Error:", message, error);
    return true; // Ngăn popup lỗi
  };
// Set config defaults when creating the instance

const BASE_URL =  import.meta.env.VITE_BASE_URL
console.log(BASE_URL);

const instance = axios.create({
    baseURL: BASE_URL,
    // withCredentials: true, // Đảm bảo cookie được gửi cùng request
  });
  
// // Alter defaults after instance has been created
instance.defaults.headers.common['Authorization'] = `Bearer ${Cookies.get('accessToken')}`;

instance.interceptors.request.use((config) => {
  const token = Cookies.get('accessToken'); // Lấy token mới nhất
  if (token) {
      config.headers.Authorization = `Bearer ${token}`;
  }
  console.log("🔍 Sending request with headers:", config.headers);
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error.response;
  });

  export default instance;
  