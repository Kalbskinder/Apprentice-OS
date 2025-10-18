"use client"

// @ts-ignore
import "./MenuBar.css"
import MenuBarIcon from "./MenuBarItem/MenuBarIcon"
import MenuBarItem from "./MenuBarItem/MenuBarItem"
import CalendarItem from "./MenuBarItem/CalendarItem"

export default function MenuBar() {
  return (
    <div className="menu-bar">
      {/* LEFT */}
      <div className="left">
        <MenuBarIcon
          name="Apprentice OS"
          icon="/assets/icons/apprentice-os-logo.png"
          dropdownItems={[
            { name: "About", action: () => alert("Apprentice OS v1.0") },
            { name: "Logout", action: () => {}},
            { name: "Reboot", action: () => {}},
          ]}
        />
        <MenuBarItem
          name="Settings"
          dropdownItems={[
            { name: "Appearance", action: () => alert("Coming soon...") },
            { name: "Keyboard Shortcuts", action: () => alert("Coming soon...") },
          ]}
        />
        <MenuBarItem
          name="Help"
          dropdownItems={[
            { name: "GitHub", action: () => window.open("https://github.com/Kalbskinder/Apprentice-OS", "_blank") },
            { name: "Documentation", action: () => alert("Coming soon...") },
          ]}
        />
      </div>

      {/* CENTER */}
      <div className="center">
        <CalendarItem />
      </div>

      {/* RIGHT */}
      <div className="right"></div>
    </div>
  )
}
