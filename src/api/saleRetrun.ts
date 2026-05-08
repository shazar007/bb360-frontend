import { HTTP_CLIENT } from "../utils/httpClient";
import { ENDPOINTS } from "./endPoint";

export const createSalesReturnApi = (values: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.SALES_RETURN, values);
};
export const getAllSalesReturns = () => {
  return HTTP_CLIENT.get(ENDPOINTS.SALES_RETURN);
};
