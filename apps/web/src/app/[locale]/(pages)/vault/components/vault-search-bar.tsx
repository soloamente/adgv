/**
 * Vault Search Bar Component
 * @description Search input component for filtering vault items
 */

"use client"

import { useEffect, useState } from "react"

import { Icon } from "basehub/react-icon"
import { useDebounce } from "use-debounce"

interface VaultSearchBarProps {
  /**
   * Placeholder text for the search input
   */
  placeholder?: string
  /**
   * Icon content from BaseHub
   */
  iconContent?: string
  /**
   * Callback fired when search query changes (debounced)
   */
  onSearchChange?: (query: string) => void
  /**
   * Debounce delay in milliseconds
   * @default 300
   */
  debounceMs?: number
}

/**
 * Search bar component for the vault page
 * Handles search input with debouncing using use-debounce hook
 */

export function VaultSearchBar({
  placeholder = "Search...",
  iconContent,
  onSearchChange,
  debounceMs = 300,
}: VaultSearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [debouncedQuery] = useDebounce(searchQuery, debounceMs)

  // Notify parent of debounced search query changes
  useEffect(() => {
    if (onSearchChange) {
      onSearchChange(debouncedQuery)
    }
  }, [debouncedQuery, onSearchChange])

  const handleClear = () => {
    setSearchQuery("")
  }

  return (
    <label
      htmlFor="vault-search"
      className="bg-card sh flex w-xs items-center justify-between rounded-full px-3.75 py-1.75 text-sm font-medium transition-all duration-200"
    >
      <input
        id="vault-search"
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="placeholder:text-search-placeholder w-full truncate focus-visible:ring-offset-0 focus-visible:outline-none"
        spellCheck={false}
      />
      <div className="flex items-center gap-1">
        {searchQuery ? (
          <button
            type="button"
            onClick={handleClear}
            className="text-muted-foreground group flex items-center justify-center rounded transition-colors"
            aria-label="Clear search"
          >
            <span className="bg-background group-hover:text-foreground text-muted-foreground cursor-pointer rounded-lg px-2 py-1.5 text-sm leading-none font-medium transition-colors duration-200">
              <Icon
                content={iconContent ?? ""}
                components={{
                  svg: (props) => <svg {...props} style={{ width: "14px", height: "14px" }} />,
                }}
              />
            </span>
          </button>
        ) : (
          <div className="flex items-center gap-1">
            <span className="bg-background text-muted-foreground rounded-lg px-2 py-1.5 text-sm leading-none font-medium">
              ctrl
            </span>
            <span className="bg-background text-muted-foreground rounded-lg px-2.5 py-1.5 text-sm leading-none font-medium">
              s
            </span>
          </div>
        )}
      </div>
    </label>
  )
}
