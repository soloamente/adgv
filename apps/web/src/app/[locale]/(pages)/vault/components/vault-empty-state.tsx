/**
 * Vault Empty State Component
 * @description Component displayed when there are no vault items
 */

interface VaultEmptyStateProps {
  /**
   * Custom message to display
   */
  message?: string;
}

/**
 * Empty state component for when the vault has no items
 */
export function VaultEmptyState({
  message = "No items in the vault yet. Add some content in BaseHub!",
}: VaultEmptyStateProps) {
  return (
    <div className="flex min-h-[400px] w-full max-w-4xl flex-col items-center justify-center text-center">
      <p className="text-muted-foreground text-lg">{message}</p>
    </div>
  );
}

