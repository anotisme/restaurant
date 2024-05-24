import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Profile",
  description: "This is profile page",
};

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="m-4">{children}</main>;
}
