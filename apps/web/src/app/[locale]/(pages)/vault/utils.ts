/**
 * Vault Page Utilities
 * @description Utility functions for type guards and media handling
 */

import type { VaultItem } from "./types";

/**
 * Type guard to check if media is a BlockImage
 */
export function isBlockImage(
  media: VaultItem["image"]
): media is Extract<
  NonNullable<VaultItem["image"]>,
  { __typename: "BlockImage" }
> {
  return (
    media !== null &&
    typeof media === "object" &&
    "__typename" in media &&
    media.__typename === "BlockImage" &&
    "url" in media &&
    typeof media.url === "string"
  );
}

/**
 * Type guard to check if media is a BlockVideo
 */
export function isBlockVideo(
  media: VaultItem["image"]
): media is Extract<
  NonNullable<VaultItem["image"]>,
  { __typename: "BlockVideo" }
> {
  return (
    media !== null &&
    typeof media === "object" &&
    "__typename" in media &&
    media.__typename === "BlockVideo" &&
    "url" in media &&
    typeof media.url === "string"
  );
}

/**
 * Type guard to check if media is a BlockAudio
 */
export function isBlockAudio(
  media: VaultItem["image"]
): media is Extract<
  NonNullable<VaultItem["image"]>,
  { __typename: "BlockAudio" }
> {
  return (
    media !== null &&
    typeof media === "object" &&
    "__typename" in media &&
    media.__typename === "BlockAudio" &&
    "url" in media &&
    typeof media.url === "string"
  );
}

/**
 * Type guard to check if media is a BlockFile
 */
export function isBlockFile(
  media: VaultItem["image"]
): media is Extract<
  NonNullable<VaultItem["image"]>,
  { __typename: "BlockFile" }
> {
  return (
    media !== null &&
    typeof media === "object" &&
    "__typename" in media &&
    media.__typename === "BlockFile" &&
    "url" in media &&
    typeof media.url === "string"
  );
}

/**
 * Get the display title for a vault item
 */
export function getVaultItemTitle(item: VaultItem): string {
  return item.title || item._title || "Untitled";
}

/**
 * Filter vault items based on search query
 */
export function filterVaultItems(
  items: VaultItem[],
  searchQuery: string
): VaultItem[] {
  if (!searchQuery.trim()) {
    return items;
  }

  const query = searchQuery.toLowerCase().trim();

  return items.filter((item) => {
    const title = getVaultItemTitle(item).toLowerCase();
    const description = item.description?.toLowerCase() || "";
    const categories =
      item.categories
        ?.map((cat) => cat._title?.toLowerCase() || "")
        .join(" ") || "";
    const brands =
      item.brands
        ?.map((brand) => (brand.name || brand._title || "").toLowerCase())
        .join(" ") || "";

    return (
      title.includes(query) ||
      description.includes(query) ||
      categories.includes(query) ||
      brands.includes(query)
    );
  });
}
