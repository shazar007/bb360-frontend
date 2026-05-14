import axios from "axios";
import Cookies from "js-cookie";
import { notifyError } from "../components/toast";
import { BASE_URL } from "../api/endPoint";
import { logout } from "../redux/userSlice";
import { store } from "../redux/store";

export const HTTP_CLIENT = axios.create({
  baseURL: BASE_URL,
});

export const setupInterceptors = (navigate: any) => {
  HTTP_CLIENT.interceptors.request.use(
    (config: any) => {
      const token = Cookies.get("token") || localStorage.getItem("token");

      console.log("TOKEN FROM COOKIE:", token); // is this null?

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        console.warn("⚠️ No token found — request will be unauthorized");
      }

      return config;
    },
    (error: any) => Promise.reject(error),
  );

  HTTP_CLIENT.interceptors.response.use(
    (response: any) => response,
    (error: any) => {
      const status = error.response?.status;

      if (status === 401) {
        Cookies.remove("token");
        store.dispatch(logout());

        notifyError("Session expired. Please login again.");
        navigate("/login");
      }

      if (status === 500) {
        notifyError("Server error — please try again later.");
      }

      return Promise.reject(error);
    },
  );
};
