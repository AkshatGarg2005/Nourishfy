import React from "react";

export function Drawer({ children }) {
  return <>{children}</>;
}

export function DrawerContent({ open, setOpen, className = "", children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100]">
      {/* Dim overlay */}
      <div
        className="absolute inset-0 bg-black/40 dark:bg-black/60"
        onClick={() => setOpen(false)}
      />
      {/* Bottom sheet */}
      <div
        className={[
          "absolute left-1/2 bottom-0 w-full max-w-xl -translate-x-1/2",
          "rounded-t-2xl border bg-white shadow-lg",
          "border-neutral-200 dark:border-neutral-800",
          "dark:bg-neutral-900",
          "p-4",
          className,
        ].join(" ")}
      >
        {/* Handle bar */}
        <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-neutral-300 dark:bg-neutral-700" />
        {children}
      </div>
    </div>
  );
}

export function DrawerHeader({ children }) {
  return <div className="mb-2">{children}</div>;
}

export function DrawerTitle({ children }) {
  return (
    <div className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
      {children}
    </div>
  );
}

export function DrawerClose({ asChild, children }) {
  return asChild ? children : <button>{children}</button>;
}
