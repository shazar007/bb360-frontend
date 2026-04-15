import axios from "axios";
import Cookies from "js-cookie";
import { notifyError } from "../components/toast";
import { BASE_URL } from "../api/endPoint";

export const HTTP_CLIENT = axios.create({
  baseURL: BASE_URL,
});

let isSessionExpiredHandled = false;

export const setupInterceptors = (navigate: any) => {
  HTTP_CLIENT.interceptors.request.use(
    (config: any) => {
      const token = Cookies.get("token");

      console.log("TOKEN FROM COOKIE:", token);

      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
      }

      return config;
    },
    (error: any) => Promise.reject(error),
  );

  HTTP_CLIENT.interceptors.response.use(
    (response: any) => response,
    (error: any) => {
      const status = error.response?.status;
      const isLogoutCall = error.config?.url?.includes("logout");

      if (status === 401 && !isSessionExpiredHandled && !isLogoutCall) {
        isSessionExpiredHandled = true;

        Cookies.remove("token");

        notifyError("Session expired. Please login again.");
        navigate("/");

        setTimeout(() => {
          isSessionExpiredHandled = false;
        }, 2000);
      }

      if (status === 500) {
        notifyError("Server error — please try again later.");
      }

      return Promise.reject(error);
    },
  );
};
