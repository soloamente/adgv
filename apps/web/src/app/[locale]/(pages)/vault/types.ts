/**
 * Vault Page Types
 * @description Type definitions for the vault page and its components
 */

import type { Query } from "basehub";

/**
 * Type for vault query result from BaseHub
 */
export type VaultQueryResult = Query["vault"];

/**
 * Type for a single vault item
 */
export type VaultItem = NonNullable<
  NonNullable<VaultQueryResult>["items"]
>[number];

/**
 * Type for vault item image media (BlockImage)
 */
export interface BlockImageMedia {
  __typename: "BlockImage";
  url: string;
  width?: number | null;
  height?: number | null;
}

/**
 * Type for vault item video media (BlockVideo)
 */
export interface BlockVideoMedia {
  __typename: "BlockVideo";
  url: string;
}

/**
 * Type for vault item audio media (BlockAudio)
 */
export interface BlockAudioMedia {
  __typename: "BlockAudio";
  url: string;
}

/**
 * Type for vault item file media (BlockFile)
 */
export interface BlockFileMedia {
  __typename: "BlockFile";
  url: string;
  fileName?: string | null;
}

/**
 * Union type for all possible media types
 */
export type VaultItemMedia =
  | BlockImageMedia
  | BlockVideoMedia
  | BlockAudioMedia
  | BlockFileMedia;

/**
 * Type for category item
 */
export type VaultCategory = NonNullable<VaultItem["categories"]>[number];

/**
 * Type for brand item
 */
export type VaultBrand = NonNullable<VaultItem["brands"]>[number];

