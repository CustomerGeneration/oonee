import Link from "next/link";
import Container from "./Container";
import ManageCookiesButton from "./cookie/ManageCookiesButton";
import { COMPANY } from "@/lib/company";

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Termini e Condizioni", href: "/termini-e-condizioni" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-16">
      <Container className="flex flex-col gap-8">
        {/* Riga principale */}
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <Link
              href="/"
              className="text-2xl font-bold tracking-tight text-white transition-opacity hover:opacity-70"
            >
              oonee
            </Link>
            <p className="mt-4 text-sm text-white/40">
              © 2026 oonee. All rights reserved.
            </p>
          </div>

          <a
            href="mailto:info@customergeneration.it"
            className="text-sm text-white/60 transition-colors hover:text-white"
          >
            info@customergeneration.it
          </a>
        </div>

        {/* Dati societari */}
        <p className="text-xs leading-relaxed text-white/40">
          {COMPANY.brand} è un marchio di {COMPANY.legalName} — P.IVA{" "}
          {COMPANY.vat} — Sede legale: {COMPANY.address}
        </p>

        {/* Link legali + gestione cookie */}
        <div className="flex flex-col gap-x-6 gap-y-2 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:flex-wrap sm:items-center">
          {LEGAL_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <ManageCookiesButton className="text-left transition-colors hover:text-white" />
        </div>
      </Container>
    </footer>
  );
}
