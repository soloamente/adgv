/**
 * Vault Page Content Component
 * @description Client component that handles search filtering and displays vault items
 */

"use client";

import { useState, useMemo } from "react";
import { VaultSearchBar } from "./vault-search-bar";
import { VaultGrid } from "./vault-grid";
import { VaultEmptyState } from "./vault-empty-state";
import { filterVaultItems } from "../utils";
import type { VaultItem } from "../types";

interface VaultPageContentProps {
  /**
   * Array of vault items from BaseHub
   */
  items: VaultItem[];
  /**
   * Magnifier icon content from BaseHub
   */
  magnifierIcon?: string;
  globePointerIcon?: string;

}

/**
 * Main content component for the vault page
 * Handles search filtering and displays vault items in a grid layout
 */
export function VaultPageContent({
  items,
  magnifierIcon,
  globePointerIcon,
}: VaultPageContentProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter items based on search query
  const filteredItems = useMemo(
    () => filterVaultItems(items, searchQuery),
    [items, searchQuery]
  );

  return (
    <main className="container mx-auto flex min-h-screen font-inter flex-col items-center gap-8 px-4 py-8 md:px-8">
      {/* Search Bar */}
      <VaultSearchBar
        placeholder="Search..."
        iconContent={magnifierIcon}
        onSearchChange={setSearchQuery}
        
      />

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
        <VaultGrid items={filteredItems} iconContent={globePointerIcon} />
      )}
    </main>
  );
}
