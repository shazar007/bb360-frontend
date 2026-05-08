import { useQuery } from "@tanstack/react-query";
import { getPurchaseOrderByPoNumber } from "./purchaseOrder";
import { getPurchaseRecevingPoNumber } from "./purchaseReceiving";

export const useGetPurchaseOrderByPoNumber = (
  poNumber: string,
  options?: any,
) => {
  return useQuery({
    queryKey: ["getPurchaseOrderByPoNumber", poNumber],
    queryFn: () => getPurchaseOrderByPoNumber(poNumber),
    ...options,
    enabled: !!poNumber && (options?.enabled ?? true),
    staleTime: Infinity,
  });
};
export const useGetPurchaseRecevingPoNumber = (
  poNumber: string,
  options?: any,
) => {
  return useQuery({
    queryKey: ["getPurchaseRecevingPoNumber", poNumber],
    queryFn: () => getPurchaseRecevingPoNumber(poNumber),
    ...options,
    enabled: !!poNumber && (options?.enabled ?? true),
    staleTime: Infinity,
  });
};
