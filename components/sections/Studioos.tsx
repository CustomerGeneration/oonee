"use client";

import { useState } from "react";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "submitting" | "done";

export default function Studioos() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!EMAIL_RE.test(email.trim())) {
      setError("Inserisci un'email valida.");
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "waitlist",
          source: "studioos / lista d'attesa",
          nome: nome.trim() || undefined,
          email: email.trim(),
        }),
      });
      if (!res.ok) {
        const d = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(d.error ?? "Invio non riuscito.");
      }
      setStatus("done");
    } catch (err) {
      setStatus("idle");
      setError(
        err instanceof Error ? err.message : "Qualcosa è andato storto. Riprova.",
      );
    }
  }

  return (
    <section
      id="studioos"
      className="border-t border-white/5 bg-gradient-to-b from-[#0A1525] to-[#050810] py-16 sm:py-32 lg:py-40"
    >
      <Container>
        <Reveal className="mx-auto max-w-2xl rounded-3xl border border-accent/30 bg-white/[0.02] p-8 text-center shadow-[0_0_90px_-30px_rgba(0,153,204,0.6)] sm:p-12">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/studioos-logo.svg"
            alt="studioos"
            className="mx-auto h-16 w-auto sm:h-20"
          />

          {/* Badge scarsità */}
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-red-400/40 bg-red-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-red-300">
            <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
            Sold out — 8/8 posti occupati
          </div>

          <h2 className="mt-6 text-3xl font-bold lowercase tracking-tight sm:text-4xl">
            studioos
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-white/60">
            Contenuti che vendono. Video, copy e creatività progettati per
            convertire, non solo per piacere.
          </p>

          {/* CTA / form lista d'attesa */}
          <div className="mt-8">
            {status === "done" ? (
              <p className="mx-auto max-w-md text-base font-medium text-white">
                ✓ Sei in lista. Ti avviseremo via email appena si libera un
                posto.
              </p>
            ) : !open ? (
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition hover:bg-accent hover:text-white active:scale-[0.98]"
              >
                Avvisami quando si libera un posto
              </button>
            ) : (
              <form
                onSubmit={submit}
                className="mx-auto flex max-w-md flex-col gap-3 text-left"
              >
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Nome (opzionale)"
                  autoComplete="name"
                  className="min-h-[48px] w-full rounded-xl border border-white/15 bg-white/[0.03] px-4 py-3 text-base text-white placeholder:text-white/30 focus:border-accent focus:outline-none"
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="La tua email*"
                  autoComplete="email"
                  className="min-h-[48px] w-full rounded-xl border border-white/15 bg-white/[0.03] px-4 py-3 text-base text-white placeholder:text-white/30 focus:border-accent focus:outline-none"
                />
                {error && (
                  <p className="text-sm text-red-400" role="alert">
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="min-h-[48px] rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition hover:bg-accent hover:text-white active:scale-[0.98] disabled:opacity-40"
                >
                  {status === "submitting" ? "Invio…" : "Avvisami →"}
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
