import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
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
