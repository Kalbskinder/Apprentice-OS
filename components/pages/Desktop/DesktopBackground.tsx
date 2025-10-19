"use client";
import { useRef, useState, useEffect } from "react";

export default function Desktop() {
  const desktopRef = useRef<HTMLDivElement | null>(null);
  const [selectionBox, setSelectionBox] = useState<{ x: number; y: number; width: number; height: number } | null>(
    null
  );
  const [isSelecting, setIsSelecting] = useState(false);
  const startPos = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      if (!isSelecting || !startPos.current || !desktopRef.current) return;

      const rect = desktopRef.current.getBoundingClientRect();
      const menuBarEl = document.querySelector(".menu-bar") as HTMLElement | null;
      const menubarHeight = menuBarEl ? Math.round(menuBarEl.getBoundingClientRect().height) : 40;

      const rawX = e.clientX - rect.left;
      const rawY = e.clientY - rect.top;

      const clampedX = Math.max(0, Math.min(rawX, rect.width));
      const clampedY = Math.max(menubarHeight, Math.min(rawY, rect.height));

      const x = Math.min(clampedX, startPos.current.x);
      const y = Math.min(clampedY, startPos.current.y);
      const width = Math.abs(clampedX - startPos.current.x);
      const height = Math.abs(clampedY - startPos.current.y);

      setSelectionBox({ x, y, width, height });
    }

    function handleMouseUp() {
      setIsSelecting(false);
      setSelectionBox(null);
      startPos.current = null;
    }

    if (isSelecting) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isSelecting]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    if (!desktopRef.current) return;

    const rect = desktopRef.current.getBoundingClientRect();
    const menuBarEl = document.querySelector(".menu-bar") as HTMLElement | null;
    const menubarHeight = menuBarEl ? Math.round(menuBarEl.getBoundingClientRect().height) : 40;

    const startX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const startY = Math.max(menubarHeight, Math.min(e.clientY - rect.top, rect.height));

    startPos.current = { x: startX, y: startY };
    setSelectionBox({ x: startX, y: startY, width: 0, height: 0 });
    setIsSelecting(true);
  };

  return (
    <div ref={desktopRef} className="desktop" onMouseDown={handleMouseDown}>
      <div className="desktop-bg" />
      {selectionBox && (
        <div
          className="selection-box"
          style={{
            left: `${selectionBox.x}px`,
            top: `${selectionBox.y}px`,
            width: `${selectionBox.width}px`,
            height: `${selectionBox.height}px`,
          }}
        />
      )}
    </div>
  );
}
