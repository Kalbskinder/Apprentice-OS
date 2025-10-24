"use client"

import BootScreen from "../components/pages/BootScreen/BootScreen";
import { useEffect, useState } from "react";
import LockScreen from "../components/pages/LockScreen/LockScreen";
import Desktop from "@/components/pages/Desktop/Desktop";
import { onStateChange } from "@/lib/stateManagement";

/*
States for localStorage:
- booting
- lock-screen
- system
*/

export default function Home() {
  const [globalState, setGlobalState] = useState<string>("")

  useEffect(() => {
    // Set initial state
    setGlobalState(localStorage.getItem("state") || "booting")
    
    // Listen for state changes using the utility function
    const cleanup = onStateChange((newState) => {
      setGlobalState(newState)
    })
    
    // Cleanup event listener
    return cleanup
  }, [])

  return (
    <>
      {globalState === "booting" ? (
        <BootScreen />
      ) : globalState === "lock-screen" ? (
        <LockScreen />
      ) : globalState === "desktop" ? (
        <Desktop />
      ) : (
        <BootScreen />
      )}
    </>
  );
}
