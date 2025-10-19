"use client"
import { useEffect, useState, useRef } from "react"
// @ts-ignore
import "./CalendarItem.css"

export default function CalendarItem() {
  const [calendarString, setCalendarString] = useState("")
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  // Update clock every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const weekday = now.toLocaleString("en-US", { weekday: "long" })
      const month = now.toLocaleString("en-US", { month: "short" })
      const day = now.getDate()
      const time = now.toLocaleTimeString("en-US", { hour12: false })
      setCalendarString(`${weekday}, ${month} ${day}  ${time}`)
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  // Click outside to close
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!ref.current) return
      if (!ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  // Calendar generation
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const today = now.getDate()

  const weeks: number[][] = []
  let day = 1 - firstDay
  while (day <= daysInMonth) {
    const week: number[] = []
    for (let i = 0; i < 7; i++) {
      week.push(day > 0 && day <= daysInMonth ? day : 0)
      day++
    }
    weeks.push(week)
  }

  return (
    <div
      className="calendar-item"
      ref={ref}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <span className="calendar-item-name">{calendarString}</span>

      {open && (
        <div className="calendar-dropdown">
          <div className="calendar-header">
            <div className="calendar-header-day">
              {now.toLocaleString("en-US", { weekday: "long" })}
            </div>
            <div className="calendar-header-date">
              {now.toLocaleString("en-US", { day: "numeric", month: "long", year: "numeric" })}
            </div>
          </div>

          <div className="calendar-grid">
            <div className="calendar-weekdays">
              {["M", "T", "W", "T", "F", "S", "S"].map((d, index) => (
                <span key={index}>{d}</span>
              ))}
            </div>
            <div className="calendar-days">
              {weeks.map((week, wi) => (
                <div key={wi} className="calendar-week">
                  {week.map((d, di) => (
                    <span
                      key={di}
                      className={`calendar-day ${d === today ? "today" : ""} ${
                        d === 0 ? "empty" : ""
                      }`}
                    >
                      {d > 0 ? d : ""}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
