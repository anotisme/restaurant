import { TypographyH3 } from "@/shared/components/Typography";
import React from "react";
import LoginForm from "./Form";

export default function Login() {
  return (
    <div>
      <TypographyH3 className="text-center">Login</TypographyH3>
      <LoginForm />
    </div>
  );
}
