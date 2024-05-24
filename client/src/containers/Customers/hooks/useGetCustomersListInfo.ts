"use client";

import { useQuery } from "@tanstack/react-query";
import { getCustomerList } from "@/services/customers";
import { QueryKey } from "@/shared/interfaces/api";

export default function useGetCustomersListInfo() {
  const { isPending, data } = useQuery({
    queryKey: [QueryKey.GetCustomers],
    queryFn: getCustomerList,
  });

  return { data, loading: isPending };
}
