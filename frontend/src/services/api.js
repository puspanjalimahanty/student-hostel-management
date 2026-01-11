import axios from "axios";

const API = axios.create({
  baseURL: "https://student-hostel-management.onrender.com/api"
});

API.interceptors.request.use((req) => {
  const userInfo = localStorage.getItem("user");
  if (userInfo) {
    const user = JSON.parse(userInfo);
    req.headers.Authorization = `Bearer ${user.token}`;
  }
  return req;
});

export default API;
