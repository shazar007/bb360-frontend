import { HTTP_CLIENT } from "../utils/httpClient";
import { ENDPOINTS } from "./endPoint";

export const getAccountLedger = (
  id: string | number,
  from: string,
  to: string,
) => {
  return HTTP_CLIENT.get(
    `${ENDPOINTS.ACCOUNT_LEDGER}/${id}?from=${from}&to=${to}`,
  );
};

export const addDebitCreaitNotes = (values: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.DEBIT_CREDIT_NOTE, values);
};
