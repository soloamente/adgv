/**
 * Vault Search Bar Component
 * @description Search input component for filtering vault items
 */

"use client";

import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { Icon } from "basehub/react-icon";
import { Input } from "@/components/ui/input";

interface VaultSearchBarProps {
  /**
   * Placeholder text for the search input
   */
  placeholder?: string;
  /**
   * Icon content from BaseHub
   */
  iconContent?: string;
  /**
   * Callback fired when search query changes (debounced)
   */
  onSearchChange?: (query: string) => void;
  /**
   * Debounce delay in milliseconds
   * @default 300
   */
  debounceMs?: number;
}

/**
 * Search bar component for the vault page
 * Handles search input with debouncing using use-debounce hook
 */
export function VaultSearchBar({
  placeholder = "Search vault items...",
  iconContent,
  onSearchChange,
  debounceMs = 300,
}: VaultSearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery] = useDebounce(searchQuery, debounceMs);

  // Notify parent of debounced search query changes
  useEffect(() => {
    if (onSearchChange) {
      onSearchChange(debouncedQuery);
    }
  }, [debouncedQuery, onSearchChange]);

  return (
    <label
      htmlFor="vault-search"
      className="bg-background flex w-xs items-center justify-between rounded-full px-3.75 py-1.75 text-sm  transition-all duration-200"
    >
      <Input
        id="vault-search"
        type="search"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="placeholder:text-search-placeholder w-full truncate border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
        spellCheck={false}
      />
      {iconContent && <Icon content={iconContent} />}
    </label>
  );
}
