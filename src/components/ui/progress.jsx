import React from "react";
export function Progress({ value=0 }) {
  return (
    <div className="w-full h-2 rounded-full bg-neutral-200 overflow-hidden">
      <div className="h-full bg-emerald-600" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  );
}
