import clsx from "clsx";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export function TypographyH4({ children, className }: Props) {
  return <h4 className={clsx("text-xl font-bold", className)}>{children}</h4>;
}
