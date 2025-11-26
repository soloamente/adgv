/**
 * Vault Item Card Component
 * @description Card component for displaying individual vault items
 */
import Link from "next/link"

import { BaseHubImage } from "basehub/next-image"
import { Icon } from "basehub/react-icon"

import type { VaultItem } from "../types"
import { getVaultItemTitle, isBlockImage } from "../utils"

interface VaultItemCardProps {
  /**
   * The vault item to display
   */
  item: VaultItem
  iconContent?: string
}

/**
 * Card component for displaying a single vault item
 * Shows image, title, description, source URL, categories, and brands
 */
export function VaultItemCard({ item, iconContent }: VaultItemCardProps) {
  const title = getVaultItemTitle(item)
  const imageMedia = isBlockImage(item.image) ? item.image : null

  return (
    <div className="group bg-card relative flex aspect-square h-full flex-col items-start justify-center overflow-hidden rounded-3xl px-5 py-4">
      {/* Media display */}
      {imageMedia && (
        <div className="relative h-full w-full">
          <BaseHubImage
            src={imageMedia.url}
            alt={title}
            fill
            className="object-cover transition-transform duration-300"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col gap-2">
        {/* Description
        {item.description && (
          <p className="text-muted-foreground line-clamp-3 text-sm">
            {item.description}
          </p>
        )} */}

        {/* Source URL */}
        {item.sourceUrl && (
          <Link
            href={{ pathname: item.sourceUrl }}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 absolute top-4 right-4 inline-flex items-center gap-1 text-sm font-medium transition-colors"
          >
            {iconContent && <Icon content={iconContent} />}
          </Link>
        )}

        {/* Categories and Brands */}
        {(item.categories?.length || item.brands?.length) && (
          <div className="flex flex-wrap gap-2 pt-2">
            {/* Categories */}
            {/* {item.categories?.map((category) => (
              <Link
                key={category._id}
                href={{ pathname: category._slugPath }}
                className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium"
              >
                {category.categoryName || category._title}
              </Link>
            ))} */}

            {/* Brands */}
            {item.brands?.map((brand) => (
              <Link
                key={brand._id}
                href={{ pathname: brand._slugPath }}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary/70 hover:text-primary inline-flex items-center text-xs transition-all duration-300 ease-in-out hover:font-medium"
              >
                {brand.name || brand._title}
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="flex w-full items-center justify-between">
        <h1 className="text-xl font-medium">{title}</h1>
        {item.price && <span className="text-muted-foreground">${item.price}</span>}
      </div>
    </div>
  )
}
