import React from "react";

export default function Stat({ label, value }) {
  return (
    <div className="rounded-2xl border p-4">
      <div className="text-2xl font-semibold">{value}</div>
      <div className="text-xs uppercase tracking-wide text-neutral-500 mt-1">{label}</div>
    </div>
  );
}
