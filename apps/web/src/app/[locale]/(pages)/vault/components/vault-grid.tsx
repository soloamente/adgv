/**
 * Vault Grid Component
 * @description Grid layout component for displaying vault items
 */

import { VaultItemCard } from "./vault-item-card";
import type { VaultItem } from "../types";

interface VaultGridProps {
  /**
   * Array of vault items to display
   */
  items: VaultItem[];
}

/**
 * Grid component for displaying vault items in a responsive grid layout
 */
export function VaultGrid({ items }: VaultGridProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <VaultItemCard key={item._id} item={item} />
      ))}
    </div>
  );
}

