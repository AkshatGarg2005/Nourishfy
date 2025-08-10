import React from "react";
import { cn } from "lib/cn";

export function Input({ className="", ...props }) {
  return (
    <input
      className={cn(
        "h-10 w-full rounded-xl border bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-emerald-300",
        "border-neutral-300 text-neutral-900 placeholder-neutral-400",
        "dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-100 dark:placeholder-neutral-500",
        className
      )}
      {...props}
    />
  );
}
