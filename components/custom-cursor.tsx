"use client"

import { useEffect, useState } from "react"

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [hidden, setHidden] = useState(true)
  const [clicked, setClicked] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setHidden(false)
    }

    const handleMouseDown = () => setClicked(true)
    const handleMouseUp = () => setClicked(false)

    const handleLinkHoverEvents = () => {
      document.querySelectorAll("a, button, input, textarea").forEach((el) => {
        el.addEventListener("mouseenter", () => setLinkHovered(true))
        el.addEventListener("mouseleave", () => setLinkHovered(false))
      })
    }

    window.addEventListener("mousemove", updatePosition)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    window.addEventListener("mouseenter", () => setHidden(false))
    window.addEventListener("mouseleave", () => setHidden(true))

    // Set up link hover detection after a short delay to ensure DOM is ready
    setTimeout(handleLinkHoverEvents, 500)

    return () => {
      window.removeEventListener("mousemove", updatePosition)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("mouseenter", () => setHidden(false))
      window.removeEventListener("mouseleave", () => setHidden(true))
    }
  }, [])

  return (
    <>
      <div
        className={`fixed pointer-events-none z-50 rounded-full mix-blend-difference transition-transform duration-150 ${
          hidden ? "opacity-0" : "opacity-100"
        } ${clicked ? "scale-75" : "scale-100"}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${linkHovered ? 1.5 : 1})`,
        }}
      >
        <div className="relative">
          <div className="absolute w-8 h-8 bg-white rounded-full"></div>
        </div>
      </div>
      <style jsx global>{`
        body {
          cursor: none;
        }
        
        a, button, input, textarea, [role="button"] {
          cursor: none;
        }
        
        @media (max-width: 768px) {
          body {
            cursor: auto;
          }
          
          a, button, input, textarea, [role="button"] {
            cursor: auto;
          }
        }
      `}</style>
    </>
  )
}

