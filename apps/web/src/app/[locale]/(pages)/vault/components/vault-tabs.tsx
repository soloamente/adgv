"use client"

import { useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

export function VaultTabs() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("all")
  const timeRanges = [
    { label: "All", value: "all" },
    { label: "Designs", value: "designs" },
    { label: "Products", value: "products" },
    { label: "Music", value: "music" },
    { label: "Movies", value: "movies" },
    { label: "Books", value: "books" },
  ]

  const containerRef = useRef<HTMLDivElement>(null)
  const activeTabElementRef = useRef<HTMLButtonElement>(null)
  const baseListRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const activeTabElement = activeTabElementRef.current
    const baseList = baseListRef.current

    if (selectedTimeRange && container && activeTabElement && baseList) {
      // Use requestAnimationFrame to ensure DOM has updated
      requestAnimationFrame(() => {
        // Use the base list dimensions as the reference for calculations
        const listHeight = baseList.offsetHeight
        const { offsetLeft, offsetWidth } = activeTabElement

        // Container width is set to 100% via CSS, so we use the container's actual width
        const containerWidth = container.offsetWidth
        container.style.height = `${listHeight}px`

        // Calculate clip-path percentages based on the container width
        const clipLeftPercent = (offsetLeft / containerWidth) * 100
        const clipRightPercent = 100 - ((offsetLeft + offsetWidth) / containerWidth) * 100

        // Ensure clip-path values are within valid range
        const safeClipLeft = Math.max(0, Math.min(100, clipLeftPercent))
        const safeClipRight = Math.max(0, Math.min(100, clipRightPercent))

        container.style.clipPath = `inset(0 ${safeClipRight.toFixed(2)}% 0 ${safeClipLeft.toFixed(2)}% round 17px)`
      })
    }
  }, [selectedTimeRange])

  return (
    <div className="relative flex flex-1 items-center">
      {/* Base list - visible buttons */}
      <ul ref={baseListRef} className="relative flex items-center gap-2">
        {timeRanges.map((range) => (
          <li key={range.value}>
            <button
              ref={selectedTimeRange === range.value ? activeTabElementRef : null}
              data-tab={range.value}
              onClick={() => setSelectedTimeRange(range.value)}
              className={cn(
                "flex h-[34px] cursor-pointer items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors",
                selectedTimeRange === range.value
                  ? "text-foreground"
                  : "text-stats-title hover:text-foreground"
              )}
            >
              {range.label}
            </button>
          </li>
        ))}
      </ul>

      {/* Overlay list - clipped with background */}
      <div ref={containerRef} aria-hidden className="clip-path-container bg-card">
        <ul className="relative flex items-center gap-2">
          {timeRanges.map((range) => (
            <li key={range.value}>
              <button
                data-tab={range.value}
                onClick={() => setSelectedTimeRange(range.value)}
                className="text-foreground flex h-[34px] cursor-pointer items-center gap-2 rounded-full px-4 text-sm font-medium"
                tabIndex={-1}
              >
                {range.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
