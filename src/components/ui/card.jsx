import React from "react";
import { cn } from "lib/cn";

export function Card({ className="", children }) {
  return <div className={cn("bg-white border border-neutral-200 rounded-2xl shadow-sm", className)}>{children}</div>;
}
export function CardHeader({ className="", children }) {
  return <div className={cn("p-4 md:p-5", className)}>{children}</div>;
}
export function CardTitle({ className="", children }) {
  return <div className={cn("text-lg font-semibold tracking-tight", className)}>{children}</div>;
}
export function CardDescription({ className="", children }) {
  return <p className={cn("text-sm text-neutral-600", className)}>{children}</p>;
}
export function CardContent({ className="", children }) {
  return <div className={cn("p-4 md:p-5 pt-0 md:pt-0", className)}>{children}</div>;
}
