import type { ReactNode } from "react";
import Container from "@/components/Container";

/**
 * Wrapper comune per le pagine legali: nota [BOZZA], titolo, contenuto.
 */
export default function LegalPage({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}) {
  return (
    <section className="py-28 sm:py-36">
      <Container className="max-w-3xl">
        {/* Nota bozza — da rimuovere dopo validazione legale */}
        <div className="mb-10 rounded-xl border border-amber-400/40 bg-amber-400/10 px-4 py-3 text-sm text-amber-200">
          [BOZZA — testi standard da far validare da un legale prima della
          pubblicazione definitiva]
        </div>

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 text-sm text-white/40">
          Ultimo aggiornamento: {lastUpdated}
        </p>

        <div className="legal-content mt-10">{children}</div>
      </Container>
    </section>
  );
}
