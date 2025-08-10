import React from "react";

export function Checkbox({ checked, onCheckedChange }) {
  return (
    <input
      type="checkbox"
      checked={!!checked}
      onChange={(e)=>onCheckedChange(e.target.checked)}
      className="h-4 w-4 rounded border-neutral-300 text-emerald-600 focus:ring-emerald-300"
    />
  );
}
