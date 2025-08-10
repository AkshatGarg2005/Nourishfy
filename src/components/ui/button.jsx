import React from "react";
import { cn } from "lib/cn";

export function Button({ variant="default", size="md", className="", children, ...props }) {
  const base = "inline-flex items-center justify-center rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-300 disabled:opacity-50 disabled:pointer-events-none";
  const variants = {
    default: "bg-neutral-900 hover:bg-black text-white",
    secondary: "bg-emerald-100 hover:bg-emerald-200 text-emerald-900",
    outline: "border border-neutral-300 hover:bg-neutral-50",
    ghost: "hover:bg-neutral-100",
  };
  const sizes = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-11 px-5 text-base",
    icon: "h-10 w-10",
  };
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}
