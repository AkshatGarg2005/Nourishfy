import React from "react";
import { cn } from "lib/cn";

export function Avatar({ className="", children }) {
  return <div className={cn("h-9 w-9 rounded-full bg-gradient-to-br from-emerald-600 to-lime-600 grid place-items-center text-white", className)}>{children}</div>;
}
export function AvatarFallback({ className="", children }) {
  return <span className={cn("font-semibold", className)}>{children}</span>;
}
