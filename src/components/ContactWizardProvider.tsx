"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import type { Advertised } from "./ContactWizard";

// A „Hogy hívnak?” mező ide menti a nevet, hogy a kérdéssor első lépése már kitöltve várjon (URL-be nem tesszük).
export const WIZARD_NAME_KEY = "nezor-wizard-name";

// A kérdéssor külön oldalon él (/konzultacio). Ez a hook oda navigál, opcionálisan az "igen"/"nem" előválasztással.
export function useContactWizard() {
  const router = useRouter();
  return useCallback(
    (advertised?: Advertised) => {
      router.push(advertised ? `/konzultacio?hirdetett=${advertised}` : "/konzultacio");
    },
    [router],
  );
}
