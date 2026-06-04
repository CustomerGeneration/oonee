"use client";

import { useState } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Conversion Architecture", href: "/#conversion-architecture" },
  { label: "Customer Generation", href: "/#customer-generation" },
  { label: "Revenue Generation", href: "/#revenue-generation" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-content items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          aria-label="oonee — home"
          className="inline-flex items-center gap-2 transition-opacity hover:opacity-70"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-oonee.svg"
            alt=""
            aria-hidden
            className="h-8 w-auto sm:h-9"
          />
          <span className="text-lg font-bold tracking-tight text-white sm:text-xl">
            oonee
          </span>
        </Link>

        {/* Nav desktop */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-white/70 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA desktop */}
        <Link
          href="/#cta"
          className="hidden rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-accent hover:text-white active:scale-[0.97] md:inline-flex"
        >
          Scopri il potenziale →
        </Link>

        {/* Hamburger mobile */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Chiudi menu" : "Apri menu"}
          aria-expanded={open}
          className="-mr-2 flex h-11 w-11 items-center justify-center text-white md:hidden"
        >
          {open ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Menu mobile a tendina */}
      {open && (
        <nav className="border-t border-white/10 bg-black/95 px-5 py-6 backdrop-blur-md md:hidden">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-[44px] items-center text-base text-white/80 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/#cta"
            onClick={() => setOpen(false)}
            className="mt-4 flex min-h-[48px] w-full items-center justify-center rounded-full bg-white px-5 text-base font-semibold text-black transition active:scale-[0.98]"
          >
            Scopri il potenziale →
          </Link>
        </nav>
      )}
    </header>
  );
}
