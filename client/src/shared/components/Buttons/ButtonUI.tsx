import React, { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";

interface Props extends React.ComponentProps<typeof Button> {
  children: ReactNode;
  loading?: boolean;
}

export default function ButtonUI({ children, loading, ...props }: Props) {
  return (
    <Button {...props} disabled={loading}>
      {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
}
