/**
 * Gestione del consenso cookie (GDPR), custom, senza servizi esterni.
 *
 * Categorie:
 * - necessary: sempre attivi, non disattivabili (cookie tecnici/funzionali).
 * - analytics: opt-in (es. Google Analytics 4).
 * - marketing: opt-in (es. Meta pixel e altri pixel pubblicitari).
 *
 * Il consenso è salvato sia in localStorage sia in un cookie (così è
 * eventualmente leggibile anche lato server / da un tag manager in futuro).
 * Di default tutto è BLOCCATO tranne i necessari: gli script analitici e di
 * marketing partono SOLO dopo opt-in esplicito.
 */

export type ConsentState = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

/** Bump della versione → forza a richiedere di nuovo il consenso. */
export const CONSENT_VERSION = 1;
export const CONSENT_KEY = `oonee_cookie_consent_v${CONSENT_VERSION}`;
/** Validità del consenso (mesi) prima di richiederlo di nuovo. */
export const CONSENT_MONTHS = 12;

export const DEFAULT_CONSENT: ConsentState = {
  necessary: true,
  analytics: false,
  marketing: false,
};

type StoredConsent = ConsentState & { ts: number; v: number };

export function readConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredConsent;
    if (parsed.v !== CONSENT_VERSION) return null;
    // scadenza
    const ageMs = Date.now() - parsed.ts;
    if (ageMs > CONSENT_MONTHS * 30 * 24 * 60 * 60 * 1000) return null;
    return {
      necessary: true,
      analytics: !!parsed.analytics,
      marketing: !!parsed.marketing,
    };
  } catch {
    return null;
  }
}

export function writeConsent(consent: ConsentState): void {
  if (typeof window === "undefined") return;
  const payload: StoredConsent = {
    ...consent,
    necessary: true,
    ts: Date.now(),
    v: CONSENT_VERSION,
  };
  try {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(payload));
  } catch {
    /* storage non disponibile: ignora */
  }
  // cookie (leggibile anche lato server / GTM in futuro)
  const maxAge = CONSENT_MONTHS * 30 * 24 * 60 * 60;
  const value = encodeURIComponent(
    `analytics:${consent.analytics ? 1 : 0}|marketing:${consent.marketing ? 1 : 0}`,
  );
  document.cookie = `${CONSENT_KEY}=${value}; max-age=${maxAge}; path=/; SameSite=Lax`;
}
