/**
 * Vault Page
 * @description This page displays a collection of items from BaseHub vault.
 * A collection of all the stuff I love, get inspired by, and want to share.
 */

import { Pump } from "basehub/react-pump";
import { VaultPageContent } from "./components";
import { vaultPageQuery } from "./queries";

export default function VaultPage() {
  return (
    <Pump queries={[vaultPageQuery]}>
      {async ([{ vault, icons }]) => {
        "use server";

        return (
          <VaultPageContent
            items={vault?.items ?? []}
            magnifierIcon={icons?.magnifier ?? ""}
          />
        );
      }}
    </Pump>
  );
}
