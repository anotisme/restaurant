import clsx from "clsx";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export function TypographyH2({ children, className }: Props) {
  return <h2 className={clsx("text-3xl font-bold", className)}>{children}</h2>;
}
