import { Customer } from "@/containers/Customers/interfaces";
import * as fetcher from "@/services/utils/fetcher";
import { GetAllResponse } from "@/shared/interfaces";

export async function getCustomerList() {
  const data = await fetcher.get<GetAllResponse<Customer>>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/customers`
  );
  return data;
}

export async function getCustomerDetail({
  customerId,
}: {
  customerId: string;
}) {
  const data = await fetcher.get<Customer>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/customers/${customerId}`
  );
  return data;
}
