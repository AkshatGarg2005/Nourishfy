import React from "react";
import { cn } from "lib/cn";

export function Input({ className="", ...props }) {
  return (
    <input
      className={cn("h-10 w-full rounded-xl border border-neutral-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-emerald-300", className)}
      {...props}
    />
  );
}
