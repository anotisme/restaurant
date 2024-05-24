import clsx from "clsx";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export function TypographyH1({ children, className }: Props) {
  return <h1 className={clsx("text-4xl font-bold", className)}>{children}</h1>;
}
