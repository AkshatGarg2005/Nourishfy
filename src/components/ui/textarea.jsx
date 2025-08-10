import React from "react";
import { cn } from "lib/cn";

export function Textarea({ className="", ...props }) {
  return (
    <textarea
      className={cn("w-full rounded-xl border border-neutral-300 bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-emerald-300", className)}
      {...props}
    />
  );
}
