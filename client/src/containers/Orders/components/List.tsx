"use client";

import * as React from "react";
import useOrdersColumns from "../hooks/useOrdersColumns";
import { data } from "../constants";
import { TableUI } from "@/shared/components/Tables/TableUI";
import { Payment } from "../interfaces";

export function OrdersList() {
  const columns = useOrdersColumns();

  return <TableUI<Payment> columns={columns} dataSource={data} />;
}
