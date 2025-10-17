"use client"

import BootScreen from "../components/BootScreen/BootScreen";
import { useEffect, useState } from "react";
import LockScreen from "../components/LockScreen/LockScreen";

/*
States for localStorage:
- booting
- lock-screen
- system
- shutdown
*/

export default function Home() {
  const [globalState, setGlobalState] = useState<string>("")

  useEffect(() => {
    setGlobalState(localStorage.getItem("state") || "booting")
  }, [])

  return (
    <>
      {globalState === "booting" ? (
        <BootScreen />
      ) : globalState === "lock-screen" ? (
        <LockScreen />
      ) : (
        <BootScreen />
      )}
    </>
  );
}
