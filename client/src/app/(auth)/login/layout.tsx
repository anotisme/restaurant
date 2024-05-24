import type { Metadata } from "next";
import Image from "next/image";
import React from "react";
import loginBanner from "./../../../../public/images/login-banner.jpg";

export const metadata: Metadata = {
  title: "Login",
  description: "This is login page",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen">
      <div className="flex items-center justify-center">
        <div className="w-1/2">
          <Image
            alt="login-banner"
            src={loginBanner}
            className="object-cover h-screen"
          />
        </div>
        <div className="w-1/2 m-4">{children}</div>
      </div>
    </div>
  );
}
