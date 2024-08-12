import axios from "axios";

const TOKEN = localStorage.getItem("access_token");

export const http = axios.create({
  baseURL:  " http://192.168.0.121:5000",
  headers: {
    "Content-Type": "application/json",
    Accept: "/",
    Authorization: `Bearer ${TOKEN}` || "",
  },
});

http.interceptors.response.use(
  function (response) {
    return response;
  },
  function (err) {
    if (err.message === "Network Error") {
      alert("Network Error");
    }
    if (
      err.response.data.statusCode === 401 &&
      err.response.config.method === "get"
    ) {
      localStorage.removeItem("access_token");
      window.location.href = "/";
    }
    return Promise.reject(err);
  }
);