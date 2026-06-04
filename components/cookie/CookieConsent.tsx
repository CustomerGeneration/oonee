"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { readConsent, writeConsent, type ConsentState } from "@/lib/consent";
import ConsentGatedScripts from "./ConsentGatedScripts";

/** Evento globale per riaprire le preferenze (es. dal link "Gestisci cookie"). */
export const OPEN_PREFERENCES_EVENT = "oonee:open-cookie-preferences";

type View = "banner" | "preferences";

function Toggle({
  checked,
  disabled,
  onChange,
  label,
}: {
  checked: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
        checked ? "bg-accent" : "bg-white/20"
      } ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${
          checked ? "left-[1.375rem]" : "left-0.5"
        }`}
      />
    </button>
  );
}

export default function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [consent, setConsent] = useState<ConsentState | null>(null);
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>("banner");
  // toggle di lavoro nella vista "Personalizza"
  const [prefs, setPrefs] = useState({ analytics: false, marketing: false });

  // Primo mount: leggi consenso salvato; se assente, mostra il banner.
  useEffect(() => {
    setMounted(true);
    const saved = readConsent();
    setConsent(saved);
    if (!saved) {
      setView("banner");
      setOpen(true);
    }
  }, []);

  // Riapertura preferenze dal footer ("Gestisci cookie").
  useEffect(() => {
    const handler = () => {
      const current = readConsent();
      setPrefs({
        analytics: current?.analytics ?? false,
        marketing: current?.marketing ?? false,
      });
      setView("preferences");
      setOpen(true);
    };
    window.addEventListener(OPEN_PREFERENCES_EVENT, handler);
    return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, handler);
  }, []);

  const persist = useCallback((c: ConsentState) => {
    writeConsent(c);
    setConsent(c);
    setOpen(false);
  }, []);

  const acceptAll = () =>
    persist({ necessary: true, analytics: true, marketing: true });
  const rejectAll = () =>
    persist({ necessary: true, analytics: false, marketing: false });
  const savePrefs = () =>
    persist({ necessary: true, ...prefs });

  const openPreferences = () => {
    setPrefs({
      analytics: consent?.analytics ?? false,
      marketing: consent?.marketing ?? false,
    });
    setView("preferences");
  };

  if (!mounted) return null;

  return (
    <>
      {/* Gli script di tracking partono solo dopo opt-in (e con gli ID inseriti) */}
      <ConsentGatedScripts consent={consent} />

      {open && (
        <div
          role="dialog"
          aria-modal="false"
          aria-label="Preferenze cookie"
          className="fixed inset-x-0 bottom-0 z-[100] p-4 sm:p-6"
        >
          <div className="mx-auto w-full max-w-3xl rounded-2xl border border-white/15 bg-[#0a0a0a]/95 p-6 shadow-2xl backdrop-blur-md sm:p-8">
            {view === "banner" ? (
              <>
                <h2 className="text-lg font-bold tracking-tight">
                  Rispettiamo la tua privacy
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  Usiamo cookie tecnici necessari al funzionamento del sito e,
                  previo tuo consenso, cookie analitici e di marketing. Puoi
                  accettare, rifiutare o scegliere quali attivare. Maggiori
                  dettagli nella{" "}
                  <Link
                    href="/cookie-policy"
                    className="text-accent underline underline-offset-4"
                  >
                    Cookie Policy
                  </Link>
                  .
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={openPreferences}
                    className="order-3 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/50 sm:order-1"
                  >
                    Personalizza
                  </button>
                  <button
                    type="button"
                    onClick={rejectAll}
                    className="order-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/50"
                  >
                    Rifiuta tutti
                  </button>
                  <button
                    type="button"
                    onClick={acceptAll}
                    className="order-1 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-accent hover:text-white sm:order-3"
                  >
                    Accetta tutti
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-lg font-bold tracking-tight">
                  Preferenze cookie
                </h2>
                <p className="mt-2 text-sm text-white/50">
                  Attiva solo le categorie che desideri. Puoi cambiare scelta in
                  qualsiasi momento da “Gestisci cookie” nel footer.
                </p>

                <div className="mt-6 space-y-4">
                  {/* Necessari */}
                  <div className="flex items-start justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-4">
                    <div>
                      <p className="text-sm font-semibold">
                        Necessari{" "}
                        <span className="text-white/40">(sempre attivi)</span>
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-white/50">
                        Indispensabili al funzionamento del sito. Non possono
                        essere disattivati.
                      </p>
                    </div>
                    <Toggle checked disabled label="Cookie necessari" />
                  </div>

                  {/* Analitici */}
                  <div className="flex items-start justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-4">
                    <div>
                      <p className="text-sm font-semibold">Analitici</p>
                      <p className="mt-1 text-xs leading-relaxed text-white/50">
                        Statistiche anonime sull’uso del sito (es. Google
                        Analytics 4) per migliorarlo.
                      </p>
                    </div>
                    <Toggle
                      checked={prefs.analytics}
                      onChange={(v) =>
                        setPrefs((p) => ({ ...p, analytics: v }))
                      }
                      label="Cookie analitici"
                    />
                  </div>

                  {/* Marketing */}
                  <div className="flex items-start justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-4">
                    <div>
                      <p className="text-sm font-semibold">Marketing</p>
                      <p className="mt-1 text-xs leading-relaxed text-white/50">
                        Pixel pubblicitari (es. Meta) per misurare le campagne e
                        mostrarti annunci pertinenti.
                      </p>
                    </div>
                    <Toggle
                      checked={prefs.marketing}
                      onChange={(v) =>
                        setPrefs((p) => ({ ...p, marketing: v }))
                      }
                      label="Cookie marketing"
                    />
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={rejectAll}
                    className="order-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/50 sm:order-1"
                  >
                    Rifiuta tutti
                  </button>
                  <button
                    type="button"
                    onClick={savePrefs}
                    className="order-3 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/50 sm:order-2"
                  >
                    Salva preferenze
                  </button>
                  <button
                    type="button"
                    onClick={acceptAll}
                    className="order-1 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-accent hover:text-white sm:order-3"
                  >
                    Accetta tutti
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
