import { useQuery } from "@tanstack/react-query";
import { getPurchaseOrderByPoNumber } from "./purchaseOrder";

export const useGetPurchaseOrderByPoNumber = (
  poNumber: string,
  options?: any,
) => {
  return useQuery({
    queryKey: ["getPurchaseOrderByPoNumber", poNumber],
    queryFn: () => getPurchaseOrderByPoNumber(poNumber),
    ...options,
    enabled: !!poNumber && (options?.enabled ?? true), // 👈 important (prevents auto call with empty id)
    staleTime: Infinity,
  });
};
