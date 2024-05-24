import { NextResponse } from "next/server";
import { API_ROUTE } from "../../shared/constants/api";

export default async function GET() {
  const data = fetch(API_ROUTE.customers.getAll);

  return NextResponse.json({
    data,
  });
}
