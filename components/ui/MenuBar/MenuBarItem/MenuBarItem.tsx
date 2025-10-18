import { MenuBarItemProps } from "@/lib/types/MenuBar/MenuBarItemProps";
import React, { useState, useRef, useEffect } from "react";

export default function MenuBarItem({ name, dropdownItems = [] }: MenuBarItemProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  // Close on outside click
  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div
      className="menu-bar-item"
      ref={ref}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      tabIndex={0}
      onBlur={() => setOpen(false)}
    >
      <span className="menu-bar-item-name">{name}</span>

      {dropdownItems.length > 0 && (
        <div
          className="menu-bar-item-dropdown"
          style={{ display: open ? "flex" : "none" }}
          role="menu"
        >
          {dropdownItems.map((item, i) => (
            <div
              key={i}
              className="menu-bar-item-dropdown-item"
              onClick={() => {
                item.action();
                setOpen(false);
              }}
              role="menuitem"
              tabIndex={0}
            >
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
