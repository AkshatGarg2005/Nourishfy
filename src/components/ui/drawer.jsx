import React from "react";

export function Drawer({ children }) { return <>{children}</>; }

export function DrawerContent({ open, setOpen, className="", children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100]">
      <div className="absolute inset-0 bg-black/30" onClick={()=>setOpen(false)} />
      <div className={`absolute left-1/2 bottom-0 w-full max-w-xl -translate-x-1/2 rounded-t-2xl bg-white p-4 shadow-lg ${className}`}>
        {children}
      </div>
    </div>
  );
}

export function DrawerHeader({ children }) { return <div className="mb-2">{children}</div>; }
export function DrawerTitle({ children }) { return <div className="text-base font-semibold">{children}</div>; }
export function DrawerClose({ asChild, children }) {
  return asChild ? children : <button>{children}</button>;
}
