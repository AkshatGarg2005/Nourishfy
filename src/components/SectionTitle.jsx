import React from "react";
import { CardTitle, CardDescription } from "components/ui/card";

export default function SectionTitle({ icon: Icon, title, desc }) {
  return (
    <div className="flex items-start gap-3">
      <div className="rounded-2xl bg-emerald-100 text-emerald-800 p-2"><Icon className="h-5 w-5"/></div>
      <div>
        <CardTitle>{title}</CardTitle>
        {desc && <CardDescription className="mt-1">{desc}</CardDescription>}
      </div>
    </div>
  );
}
