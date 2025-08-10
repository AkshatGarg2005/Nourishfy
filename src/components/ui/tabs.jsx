import React, { useState } from "react";
import { cn } from "lib/cn";

export function Tabs({ defaultValue, children }) {
  const [value, setValue] = useState(defaultValue);
  return React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;
    if (child.type === TabsList) {
      return React.cloneElement(child, { activeValue: value, setValue });
    }
    if (child.type === TabsContent) {
      return value === child.props.value ? child : null;
    }
    return child;
  });
}

export function TabsList({ activeValue, setValue, children, className = "" }) {
  return (
    <div className={cn("inline-grid grid-cols-2 gap-2 rounded-xl bg-neutral-100 p-1", className)}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { activeValue, setValue })
          : child
      )}
    </div>
  );
}

export function TabsTrigger({ value, activeValue, setValue, children }) {
  const active = activeValue === value;
  return (
    <button
      onClick={() => setValue(value)}
      className={cn(
        "rounded-lg px-3 py-1.5 text-sm",
        active ? "bg-white shadow font-medium" : "text-neutral-600"
      )}
      aria-pressed={active}
    >
      {children}
    </button>
  );
}

export function TabsContent({ children, className = "" }) {
  return <div className={cn("mt-4", className)}>{children}</div>;
}
