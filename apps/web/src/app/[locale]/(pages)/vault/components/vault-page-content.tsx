/**
 * Vault Page Content Component
 * @description Client component that handles search filtering and displays vault items
 */

"use client"

import { useMemo, useState } from "react"

import type { VaultItem } from "../types"
import { filterVaultItems } from "../utils"
import { VaultEmptyState } from "./vault-empty-state"
import { VaultGrid } from "./vault-grid"
import { VaultSearchBar } from "./vault-search-bar"
import { VaultTabs } from "./vault-tabs"

interface VaultPageContentProps {
  /**
   * Array of vault items from BaseHub
   */
  items: VaultItem[]
  /**
   * Magnifier icon content from BaseHub
   */
  magnifierIcon?: string
  globePointerIcon?: string
  arrowUpRightIcon?: string
  deleteLeftFilledIcon?: string
}

/**
 * Main content component for the vault page
 * Handles search filtering and displays vault items in a grid layout
 */
export function VaultPageContent({
  items,
  magnifierIcon,
  globePointerIcon,
  arrowUpRightIcon,
  deleteLeftFilledIcon,
}: VaultPageContentProps) {
  const [searchQuery, setSearchQuery] = useState("")

  // Filter items based on search query
  const filteredItems = useMemo(() => filterVaultItems(items, searchQuery), [items, searchQuery])

  return (
    <main className="font-sf-pro-rounded flex min-h-screen flex-col items-center gap-4 px-4 py-8 md:px-8">
      <div className="flex w-full items-center justify-between gap-2">
        {/* Header */}
        <VaultTabs />
        <VaultSearchBar
          placeholder="Search..."
          iconContent={deleteLeftFilledIcon}
          onSearchChange={setSearchQuery}
        />
      </div>

      {/* Content */}
      {filteredItems.length === 0 ? (
        <VaultEmptyState
          message={
            searchQuery.trim()
              ? "No items found matching your search."
              : "No items in the vault yet. Add some content in BaseHub!"
          }
        />
      ) : (
        <VaultGrid items={filteredItems} iconContent={arrowUpRightIcon} />
      )}
    </main>
  )
}
