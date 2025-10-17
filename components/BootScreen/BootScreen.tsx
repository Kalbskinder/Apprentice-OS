"use client"

import { useEffect, useState } from "react"
import { messages } from "../../lib/bootMessages"
// @ts-ignore
import "./BootScreen.css"

export default function BootScreen() {
  const [lines, setLines] = useState<string[]>([])
  const [infoLine, setInfoLine] = useState<string[]>([])
  const [bootState, setBootState] = useState<string>("")

  useEffect(() => {
    setBootState("booting")
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

    messages.forEach((msg, i) => {
        setTimeout(() => {
            setInfoLine(prev => {
            const updated = [...prev, msg]
            setTimeout(() => {
                if (updated.length === messages.length) {
                setBootState("loading")
            }}, 500)
            return updated
        })
      }, Math.random() * 1000)
    })

  }, [])

  useEffect(() => {
    if (bootState === "loading") {
      const timeout = setTimeout(() => {
        setBootState("done")
        localStorage.setItem("state", "lock-screen")
        window.location.reload()
      }, 4000);
      return () => clearTimeout(timeout);
    }
  }, [bootState]);

  return (
    <div className="boot-screen">
      { bootState === "booting" ? (
        <pre>
            <div className="boot-header">{lines}</div>
            {infoLine.map((line, index) => (
            <div className="info-line" key={index}>[<span className="green-ok"> OK </span>] {line}</div>
            ))}
        </pre>
      ): bootState === "loading" ? (
        <div className="boot-loading-container">
          <div className="boot-loading-content">
            <h1>Apprentice OS</h1>
          </div>
        </div>
      ) : ( null )
      }

    </div>
  )
}
