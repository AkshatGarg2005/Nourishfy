import React from "react";
import { cn } from "lib/cn";

export function Badge({ variant="default", className="", children }) {
  const styles = {
    default: "bg-neutral-900 text-white",
    secondary: "bg-neutral-100 text-neutral-800",
    outline: "border border-neutral-300 text-neutral-700",
  };
  return (
    <span className={cn("inline-flex items-center rounded-full px-3 py-1 text-xs font-medium", styles[variant], className)}>
      {children}
    </span>
  );
}
