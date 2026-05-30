"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  FATTURATO_OPTIONS,
  INVESTIMENTO_OPTIONS,
  STEP1_OPTIONS,
  getSfidaOptions,
  type SurveyContatti,
  type VendiType,
} from "@/lib/survey";

const TOTAL_STEPS = 5;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "form" | "submitting" | "done";

const emptyContatti: SurveyContatti = {
  nome: "",
  email: "",
  telefono: "",
  sito: "",
};

function OptionButton({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`flex min-h-[56px] w-full items-center rounded-xl border px-5 py-4 text-left text-base transition active:scale-[0.99] ${
        selected
          ? "border-accent bg-accent/10 text-white"
          : "border-white/15 text-white/80 hover:border-white/40"
      }`}
    >
      {label}
    </button>
  );
}

function Field({
  label,
  required,
  ...props
}: {
  label: string;
  required?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-white/60">
        {label}
        {required && <span className="text-accent"> *</span>}
      </span>
      <input
        {...props}
        className="min-h-[48px] w-full rounded-xl border border-white/15 bg-white/[0.02] px-4 py-3 text-base text-white placeholder:text-white/30 focus:border-accent focus:outline-none"
      />
    </label>
  );
}

export default function SurveyForm() {
  const [status, setStatus] = useState<Status>("form");
  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const [vendi, setVendi] = useState<VendiType | null>(null);
  const [fatturato, setFatturato] = useState("");
  const [investimento, setInvestimento] = useState("");
  const [sfida, setSfida] = useState("");
  const [contatti, setContatti] = useState<SurveyContatti>(emptyContatti);

  const sfidaOptions = getSfidaOptions(vendi);

  // Verifica se lo step corrente è completo
  function stepValid(): boolean {
    switch (step) {
      case 1:
        return vendi !== null;
      case 2:
        return fatturato !== "";
      case 3:
        return investimento !== "";
      case 4:
        return sfida.trim() !== "";
      case 5:
        return (
          contatti.nome.trim() !== "" &&
          EMAIL_RE.test(contatti.email.trim()) &&
          contatti.telefono.trim() !== ""
        );
      default:
        return false;
    }
  }

  function next() {
    setError(null);
    if (!stepValid()) return;
    if (step < TOTAL_STEPS) {
      setStep((s) => s + 1);
    } else {
      void submit();
    }
  }

  function back() {
    setError(null);
    if (step > 1) setStep((s) => s - 1);
  }

  function selectVendi(value: VendiType) {
    setVendi(value);
    setSfida(""); // le opzioni dello step 4 cambiano in base allo step 1
  }

  async function submit() {
    if (vendi === null) return;
    setStatus("submitting");
    setError(null);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vendi,
          fatturato,
          investimento,
          sfida: sfida.trim(),
          contatti: {
            nome: contatti.nome.trim(),
            email: contatti.email.trim(),
            telefono: contatti.telefono.trim(),
            sito: contatti.sito?.trim() || undefined,
          },
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        throw new Error(data.error ?? "Invio non riuscito.");
      }
      setStatus("done");
    } catch (e) {
      setStatus("form");
      setError(
        e instanceof Error
          ? e.message
          : "Qualcosa è andato storto. Riprova.",
      );
    }
  }

  /* --- Schermata di conferma --- */
  if (status === "done") {
    return (
      <div className="mx-auto max-w-xl text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-accent text-3xl text-accent">
          ✓
        </div>
        <h1 className="mt-8 text-3xl font-bold tracking-tight sm:text-4xl">
          Richiesta ricevuta.
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-white/60">
          Ti contatteremo entro 48 ore lavorative per discutere come la
          Conversion Architecture può funzionare nel tuo business.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-2 text-base font-semibold text-white underline-offset-8 hover:text-accent hover:underline"
        >
          ← Torna alla home
        </Link>
      </div>
    );
  }

  /* --- Form --- */
  const submitting = status === "submitting";

  return (
    <div className="mx-auto max-w-xl">
      {/* Progress */}
      <div className="mb-10">
        <div className="mb-3 flex items-center justify-between text-sm text-white/40">
          <span>
            Step {step} di {TOTAL_STEPS}
          </span>
          <span>{Math.round((step / TOTAL_STEPS) * 100)}%</span>
        </div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full bg-accent"
            initial={false}
            animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {step === 1 && (
            <fieldset>
              <legend className="text-2xl font-bold tracking-tight sm:text-3xl">
                Cosa vendi online?
              </legend>
              <div className="mt-8 space-y-3">
                {STEP1_OPTIONS.map((o) => (
                  <OptionButton
                    key={o.value}
                    label={o.label}
                    selected={vendi === o.value}
                    onClick={() => selectVendi(o.value)}
                  />
                ))}
              </div>
            </fieldset>
          )}

          {step === 2 && (
            <fieldset>
              <legend className="text-2xl font-bold tracking-tight sm:text-3xl">
                Quanto fatturi all&apos;anno?
              </legend>
              <div className="mt-8 space-y-3">
                {FATTURATO_OPTIONS.map((o) => (
                  <OptionButton
                    key={o}
                    label={o}
                    selected={fatturato === o}
                    onClick={() => setFatturato(o)}
                  />
                ))}
              </div>
            </fieldset>
          )}

          {step === 3 && (
            <fieldset>
              <legend className="text-2xl font-bold tracking-tight sm:text-3xl">
                Quanto investi al mese in marketing?
              </legend>
              <div className="mt-8 space-y-3">
                {INVESTIMENTO_OPTIONS.map((o) => (
                  <OptionButton
                    key={o}
                    label={o}
                    selected={investimento === o}
                    onClick={() => setInvestimento(o)}
                  />
                ))}
              </div>
            </fieldset>
          )}

          {step === 4 && (
            <fieldset>
              <legend className="text-2xl font-bold tracking-tight sm:text-3xl">
                Qual è la tua sfida principale?
              </legend>
              {sfidaOptions ? (
                <div className="mt-8 space-y-3">
                  {sfidaOptions.map((o) => (
                    <OptionButton
                      key={o}
                      label={o}
                      selected={sfida === o}
                      onClick={() => setSfida(o)}
                    />
                  ))}
                </div>
              ) : (
                <textarea
                  value={sfida}
                  onChange={(e) => setSfida(e.target.value)}
                  rows={4}
                  placeholder="Raccontaci la tua sfida principale…"
                  className="mt-8 w-full rounded-xl border border-white/15 bg-white/[0.02] px-4 py-3 text-base text-white placeholder:text-white/30 focus:border-accent focus:outline-none"
                />
              )}
            </fieldset>
          )}

          {step === 5 && (
            <fieldset>
              <legend className="text-2xl font-bold tracking-tight sm:text-3xl">
                Dove ti contattiamo?
              </legend>
              <div className="mt-8 space-y-5">
                <Field
                  label="Nome"
                  required
                  type="text"
                  autoComplete="name"
                  value={contatti.nome}
                  onChange={(e) =>
                    setContatti({ ...contatti, nome: e.target.value })
                  }
                />
                <Field
                  label="Email"
                  required
                  type="email"
                  autoComplete="email"
                  value={contatti.email}
                  onChange={(e) =>
                    setContatti({ ...contatti, email: e.target.value })
                  }
                />
                <Field
                  label="Telefono"
                  required
                  type="tel"
                  autoComplete="tel"
                  value={contatti.telefono}
                  onChange={(e) =>
                    setContatti({ ...contatti, telefono: e.target.value })
                  }
                />
                <Field
                  label="Sito web (opzionale)"
                  type="url"
                  inputMode="url"
                  placeholder="https://"
                  value={contatti.sito}
                  onChange={(e) =>
                    setContatti({ ...contatti, sito: e.target.value })
                  }
                />
              </div>
            </fieldset>
          )}
        </motion.div>
      </AnimatePresence>

      {error && (
        <p className="mt-6 text-sm text-red-400" role="alert">
          {error}
        </p>
      )}

      {/* Navigazione */}
      <div className="mt-10 flex items-center justify-between gap-4">
        {step > 1 ? (
          <button
            type="button"
            onClick={back}
            disabled={submitting}
            className="text-base text-white/60 transition-colors hover:text-white disabled:opacity-40"
          >
            ← Indietro
          </button>
        ) : (
          <Link
            href="/"
            className="text-base text-white/60 transition-colors hover:text-white"
          >
            ← Annulla
          </Link>
        )}

        <button
          type="button"
          onClick={next}
          disabled={!stepValid() || submitting}
          className="min-h-[48px] rounded-full bg-white px-8 py-3 text-base font-semibold text-black transition hover:bg-accent hover:text-white active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-black disabled:active:scale-100"
        >
          {submitting
            ? "Invio…"
            : step === TOTAL_STEPS
              ? "Invia →"
              : "Avanti →"}
        </button>
      </div>
    </div>
  );
}
