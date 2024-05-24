import clsx from "clsx";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export function TypographyH3({ children, className }: Props) {
  return <h3 className={clsx("text-2xl font-bold", className)}>{children}</h3>;
}
