import React from "react";

export default function Header() {
  return (
    <header className="flex justify-between">
      <div className="w-20 h-20 items-center flex justify-center">Logo</div>
      <div className="flex gap-2 items-center justify-center">Menu</div>
    </header>
  );
}
