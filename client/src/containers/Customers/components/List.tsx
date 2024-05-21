"use client";

import * as React from "react";
import useCustomersColumns from "../hooks/useCustomersColumns";
import { data } from "../constants";
import { TableUI } from "@/shared/components/Tables/TableUI";
import { Customer } from "../interfaces";

export function CustomersList() {
  const columns = useCustomersColumns();

  return <TableUI<Customer> columns={columns} data={data} />;
}
