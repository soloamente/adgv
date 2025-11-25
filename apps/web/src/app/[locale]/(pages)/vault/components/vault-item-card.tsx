/**
 * Vault Item Card Component
 * @description Card component for displaying individual vault items
 */

import { BaseHubImage } from "basehub/next-image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { isBlockImage, getVaultItemTitle } from "../utils";
import type { VaultItem } from "../types";

interface VaultItemCardProps {
  /**
   * The vault item to display
   */
  item: VaultItem;
}

/**
 * Card component for displaying a single vault item
 * Shows image, title, description, source URL, categories, and brands
 */
export function VaultItemCard({ item }: VaultItemCardProps) {
  const title = getVaultItemTitle(item);
  const imageMedia = isBlockImage(item.image) ? item.image : null;

  return (
    <Card className="group relative flex h-full flex-col overflow-hidden transition-all duration-200 hover:shadow-lg">
      {/* Media display */}
      {imageMedia && (
        <div className="relative aspect-video w-full">
          <BaseHubImage
            src={imageMedia.url}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      )}

      <CardHeader className="flex-1">
        <CardTitle className="line-clamp-2 text-xl">{title}</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-2">
        {/* Description
        {item.description && (
          <p className="text-muted-foreground line-clamp-3 text-sm">
            {item.description}
          </p>
        )} */}

        {/* Source URL */}
        {item.sourceUrl && (
          <a
            href={item.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 inline-flex items-center gap-1 text-sm font-medium transition-colors"
          >
            Visit source
            <span aria-hidden="true">→</span>
          </a>
        )}

        {/* Categories and Brands */}
        {(item.categories?.length || item.brands?.length) && (
          <div className="flex flex-wrap gap-2 pt-2">
            {/* Categories */}
            {item.categories?.map((category) => (
              <span
                key={category._id}
                className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium"
              >
                {category._title}
              </span>
            ))}

            {/* Brands */}
            {item.brands?.map((brand) => (
              <span
                key={brand._id}
                className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
              >
                {brand.name || brand._title}
              </span>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
