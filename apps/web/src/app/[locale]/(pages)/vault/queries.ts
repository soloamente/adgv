/**
 * Vault Page Queries
 * @description BaseHub query definitions for the vault page
 */

import type { QueryGenqlSelection } from "basehub";

/**
 * BaseHub query selection for vault page
 * Includes vault items with all necessary fields and icons
 */
export const vaultPageQuery: QueryGenqlSelection = {
  icons: {
    magnifier: true,
    globePointer: true,
  },
  vault: {
    items: {
      _id: true,
      _title: true,
      _slug: true,
      title: true,
      price: true,
      description: true,
      sourceUrl: true,
      image: {
        __typename: true,
        on_BlockImage: {
          url: true,
          width: true,
          height: true,
        },
        on_BlockVideo: {
          url: true,
        },
        on_BlockAudio: {
          url: true,
        },
        on_BlockFile: {
          url: true,
          fileName: true,
        },
      },
      brands: {
        _id: true,
        _title: true,
        name: true,
      },
      categories: {
        _id: true,
        _title: true,
      },
    },
  },
};

