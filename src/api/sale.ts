import { HTTP_CLIENT } from "../utils/httpClient";
import { ENDPOINTS } from "./endPoint";

export const CreateSalesInvoiceApi = (values: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.SALES_INVOICE, values);
};

export const GetSalesInvoiceApi = () => {
  return HTTP_CLIENT.get(ENDPOINTS.SALES_INVOICE);
};

export const GetSalesInvoiceByIdApi = (id: string) => {
  return HTTP_CLIENT.get(`${ENDPOINTS.SALES_INVOICE}/${id}`);
};

export const UpdateSalesInvoiceApi = (id: string, values: any) => {
  return HTTP_CLIENT.put(`${ENDPOINTS.SALES_INVOICE}/${id}`, values);
};

export const GetSalesInvoiceByInvoiceNo = (invoiceNo: string) => {
  return HTTP_CLIENT.get(
    `${ENDPOINTS.SALES_INVOICE}/by-invoiceNumber/${invoiceNo}`,
  );
};
