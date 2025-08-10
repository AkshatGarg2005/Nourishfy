import React from "react";
import { cn } from "lib/cn";

export function Badge({ variant="default", className="", children }) {
  const styles = {
    default: "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900",
    secondary: "bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200",
    outline: "border border-neutral-300 text-neutral-700 dark:border-neutral-700 dark:text-neutral-300",
  };
  return (
    <span className={cn("inline-flex items-center rounded-full px-3 py-1 text-xs font-medium", styles[variant], className)}>
      {children}
    </span>
  );
}
