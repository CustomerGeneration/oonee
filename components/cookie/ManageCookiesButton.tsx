"use client";

import { OPEN_PREFERENCES_EVENT } from "./CookieConsent";

/**
 * Link "Gestisci cookie": riapre il banner delle preferenze cookie.
 */
export default function ManageCookiesButton({
  className = "",
}: {
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT))}
      className={className}
    >
      Gestisci cookie
    </button>
  );
}
