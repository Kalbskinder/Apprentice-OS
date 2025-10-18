import React, { useState, useRef, useEffect } from "react"
import { MenuBarIconProps } from "@/lib/types/MenuBar/MenuBarIconProps"

export default function MenuBarIcon({ name, icon, dropdownItems = [] }: MenuBarIconProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!ref.current) return
      if (!ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div
      className="menu-bar-item"
      ref={ref}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      tabIndex={0}
      onBlur={() => setOpen(false)}
    >
      <div className="menu-bar-item-icon-container">
        <img
          src={icon}
          alt={`${name} icon`}
          width={20}
          height={20}
          className="menu-bar-item-icon"
        />
      </div>

      {dropdownItems.length > 0 && (
        <div
          className="menu-bar-item-dropdown"
          style={{ display: open ? "flex" : "none" }}
          role="menu"
        >
          {dropdownItems.map((item, index) => (
            <div
              key={index}
              className="menu-bar-item-dropdown-item"
              onClick={() => {
                item.action()
                setOpen(false)
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
  )
}
