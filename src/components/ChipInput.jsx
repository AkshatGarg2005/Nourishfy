import React, { useState } from "react";
import { Badge } from "components/ui/badge";
import { Button } from "components/ui/button";
import { Input } from "components/ui/input";
import { Plus } from "lucide-react";

export default function ChipInput({ label, placeholder, values, setValues }) {
  const [draft, setDraft] = useState("");
  const add = (val) => {
    const v = val.trim();
    if (!v) return;
    if (values.includes(v)) return;
    setValues([...values, v]);
    setDraft("");
  };
  const remove = (name) => setValues(values.filter(x => x !== name));

  return (
    <div>
      <div className="mb-2 text-sm font-medium text-neutral-700">{label}</div>
      <div className="flex flex-wrap gap-2 mb-2">
        {values.map(v => (
          <Badge key={v} variant="secondary" className="rounded-full px-3 py-1 text-xs">
            {v}
            <button
              aria-label={`remove ${v}`}
              className="ml-2 text-neutral-500 hover:text-neutral-800"
              onClick={()=>remove(v)}
            >×</button>
          </Badge>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <Input
          value={draft}
          onChange={(e)=>setDraft(e.target.value)}
          placeholder={placeholder}
          onKeyDown={(e)=> e.key === "Enter" && add(draft)}
        />
        <Button type="button" onClick={()=>add(draft)} size="sm" variant="secondary"><Plus className="h-4 w-4"/></Button>
      </div>
    </div>
  );
}
