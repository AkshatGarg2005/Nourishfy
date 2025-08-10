import React, { useState } from "react";
import { cn } from "lib/cn";

export function Tabs({ defaultValue, onValueChange, children }) {
  const [value, setValue] = useState(defaultValue);
  const setAndEmit = (v) => {
    setValue(v);
    if (onValueChange) onValueChange(v);
  };
  return React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;
    if (child.type === TabsList) {
      return React.cloneElement(child, { activeValue: value, setValue: setAndEmit });
    }
    if (child.type === TabsContent) {
      return value === child.props.value ? child : null;
    }
    return child;
  });
}

export function TabsList({ activeValue, setValue, children, className = "" }) {
  return (
    <div
      className={cn(
        // container styling (now dark-mode friendly)
        "inline-grid grid-cols-2 gap-2 rounded-xl p-1",
        "bg-neutral-100 border border-neutral-200",
        "dark:bg-neutral-800 dark:border-neutral-700",
        className
      )}
      role="tablist"
      aria-orientation="horizontal"
    >
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
      type="button"
      role="tab"
      aria-selected={active}
      aria-pressed={active}
      onClick={() => setValue(value)}
      className={cn(
        "rounded-lg px-3 py-1.5 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-300",
        active
          ? // active styles
            "bg-white text-neutral-900 shadow dark:bg-neutral-900 dark:text-neutral-100"
          : // inactive styles
            "text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-100"
      )}
    >
      {children}
    </button>
  );
}

export function TabsContent({ children, className = "" }) {
  return <div className={cn("mt-4", className)}>{children}</div>;
}
