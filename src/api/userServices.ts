import { HTTP_CLIENT } from "../utils/httpClient";
import { ENDPOINTS } from "./endPoint";

export const UserLogin = (values: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.USER_LOGIN, values);
};
export const UserLogout = () => {
  return HTTP_CLIENT.post(ENDPOINTS.USER_LOGOUT);
};
