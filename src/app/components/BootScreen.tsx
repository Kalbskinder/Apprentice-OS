"use client"

import { useEffect, useState } from "react"
import { messages } from "../../../lib/bootMessages"
import "./BootScreen.css"

export default function BootScreen() {
  const [lines, setLines] = useState<string[]>([])
  const [infoLine, setInfoLine] = useState<string[]>([])

  useEffect(() => {
    const bootHeader = `
    _                               _   _             ___  ____  
   / \\   _ __  _ __  _ __ ___ _ __ | |_(_) ___ ___   / _ \\/ ___| 
  / _ \\ | '_ \\| '_ \\| '__/ _ \\ '_ \\| __| |/ __/ _ \\ | | | \\___ \\ 
 / ___ \\| |_) | |_) | | |  __/ | | | |_| | (_|  __/ | |_| |___) |
/_/   \\_\\ .__/| .__/|_|  \\___|_| |_|\\__|_|\\___\\___|  \\___/|____/ 
        |_|   |_|     

Version 0.1.0
`
    setLines([bootHeader])

    messages.forEach((msg) => {
      setTimeout(() => {
        setInfoLine(prev => [...prev, msg])
      }, Math.random() * 1000)
    })
  }, [])

  return (
    <div className="boot-screen">
      <pre>
        <div className="boot-header">{lines}</div>
        {infoLine.map((line, index) => (
          <div className="info-line" key={index}>[<span className="green-ok"> OK </span>] {line}</div>
        ))}
      </pre>
    </div>
  )
}
