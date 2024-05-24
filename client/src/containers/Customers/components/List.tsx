"use client";

import * as React from "react";
import useCustomersColumns from "../hooks/useCustomersColumns";
import { TableUI } from "@/shared/components/Tables/TableUI";
import { Customer } from "../interfaces";
import useGetCustomersListInfo from "../hooks/useGetCustomersListInfo";

export function CustomersList() {
  const { data: getCustomersResponse, loading } = useGetCustomersListInfo();
  const columns = useCustomersColumns();

  const dataSource: Customer[] = getCustomersResponse?.data ?? [];
  console.log(dataSource);

  return (
    <TableUI<Customer>
      columns={columns}
      loading={loading}
      dataSource={dataSource}
    />
  );
}
