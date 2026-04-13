import axios from "axios";
import { store } from "../redux/store";
import { setIsLoggedIn } from "../redux/userSlice";
import { notifyError } from "../components/toast";
import { BASE_URL } from "../api/endPoint";

export const HTTP_CLIENT = axios.create({
  baseURL: BASE_URL,
});

let isSessionExpiredHandled = false;

export const setupInterceptors = (navigate: any) => {
  // ================= REQUEST INTERCEPTOR =================
  HTTP_CLIENT.interceptors.request.use(
    (config: any) => {
      const token = store.getState().user?.token;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error: any) => Promise.reject(error),
  );

  // ================= RESPONSE INTERCEPTOR =================
  HTTP_CLIENT.interceptors.response.use(
    (response: any) => response,
    (error: any) => {
      const status = error.response?.status;

      const isLogoutCall = error.config?.url?.includes("logout");

      if (status === 401 && !isSessionExpiredHandled && !isLogoutCall) {
        isSessionExpiredHandled = true;

        store.dispatch(setIsLoggedIn(false));
        localStorage.removeItem("token");

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
