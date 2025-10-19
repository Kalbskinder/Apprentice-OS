"use client";
import { useRef, useState } from "react";

export default function Desktop() {
  const desktopRef = useRef<HTMLDivElement | null>(null);
  const [selectionBox, setSelectionBox] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const startPos = useRef<{ x: number; y: number } | null>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    console.log("Mouse down");

    if (!desktopRef.current) return;
    const rect = desktopRef.current.getBoundingClientRect();
    const startX = e.clientX - rect.left;
    const startY = e.clientY - rect.top;

    startPos.current = { x: startX, y: startY };
    setSelectionBox({ x: startX, y: startY, width: 0, height: 0 });
    setIsSelecting(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isSelecting || !startPos.current || !desktopRef.current) return;
    const rect = desktopRef.current.getBoundingClientRect();
    const x = Math.min(e.clientX - rect.left, startPos.current.x);
    const y = Math.min(e.clientY - rect.top, startPos.current.y);
    const width = Math.abs(e.clientX - rect.left - startPos.current.x);
    const height = Math.abs(e.clientY - rect.top - startPos.current.y);
    setSelectionBox({ x, y, width, height });
  };

  const handleMouseUp = () => {
    setIsSelecting(false);
    setSelectionBox(null);
  };

  return (
    <div
      ref={desktopRef}
      className="desktop"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="desktop-bg" />
      {selectionBox && (
        <div
          className="selection-box"
          style={{
            left: selectionBox.x,
            top: selectionBox.y,
            width: selectionBox.width,
            height: selectionBox.height,
          }}
        />
      )}
    </div>
  );
}
