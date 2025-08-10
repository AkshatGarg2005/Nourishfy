import React, { useState } from "react";
import { cn } from "lib/cn";

export function Tabs({ defaultValue, children }) {
  const [value, setValue] = useState(defaultValue);
  return React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;
    if (child.type === TabsList) return React.cloneElement(child, { value, setValue });
    if (child.type === TabsContent) return value === child.props.value ? child : null;
    return child;
  });
}
export function TabsList({ value, setValue, children, className="" }) {
  return (
    <div className={cn("inline-grid grid-cols-2 gap-2 rounded-xl bg-neutral-100 p-1", className)}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { value, setValue })
      )}
    </div>
  );
}
export function TabsTrigger({ value: val, value, setValue, children }) {
  const active = value === val;
  return (
    <button
      onClick={()=>setValue(val)}
      className={cn(
        "rounded-lg px-3 py-1.5 text-sm",
        active ? "bg-white shadow font-medium" : "text-neutral-600"
      )}
    >
      {children}
    </button>
  );
}
export function TabsContent({ children, className="" }) {
  return <div className={cn("mt-4", className)}>{children}</div>;
}
