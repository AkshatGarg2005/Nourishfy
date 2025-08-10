import React, { useEffect } from "react";

export function Dialog({ children, open, onOpenChange }) {
  const [internal, setInternal] = React.useState(!!open);
  useEffect(()=>{ if (open !== undefined) setInternal(!!open); }, [open]);
  return React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;
    return React.cloneElement(child, { __open: internal, __setOpen: onOpenChange || setInternal });
  });
}

export function DialogTrigger({ asChild, children, __setOpen }) {
  const child = React.isValidElement(children)
    ? React.cloneElement(children, { onClick: () => __setOpen(true) })
    : <button onClick={()=>__setOpen(true)}>{children}</button>;
  return asChild ? child : <button onClick={()=>__setOpen(true)}>{children}</button>;
}

export function DialogContent({ children, __open, __setOpen }) {
  if (!__open) return null;
  return (
    <div className="fixed inset-0 z-[100]">
      <div className="absolute inset-0 bg-black/30" onClick={()=>__setOpen(false)} />
      <div className="absolute left-1/2 top-1/2 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-4 shadow-lg">
        {React.Children.map(children, (c) => React.isValidElement(c) ? React.cloneElement(c, { __setOpen }) : c)}
      </div>
    </div>
  );
}

export function DialogHeader({ children }) { return <div className="mb-2">{children}</div>; }
export function DialogTitle({ children }) { return <div className="text-base font-semibold">{children}</div>; }
