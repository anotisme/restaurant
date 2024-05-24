"use client";

import { useQuery } from "@tanstack/react-query";
import { getCustomerDetail, getCustomerList } from "@/services/customers";
import { QueryKey } from "@/shared/interfaces/api";

interface Props {
  customerId: string;
}

export default function useGetCustomerDetailInfo({ customerId }: Props) {
  const { isPending, data } = useQuery({
    queryKey: [QueryKey.GetCustomer],
    queryFn: () =>
      getCustomerDetail({
        customerId,
      }),
  });

  return { data, loading: isPending };
}
