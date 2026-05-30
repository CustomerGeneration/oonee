/**
 * Tipi e configurazione della survey, condivisi tra client (form) e server (API).
 * Nessun import di moduli Node qui: questo file è importabile anche lato client.
 */

export type VendiType = "lead" | "ecom" | "altro";

export interface SurveyContatti {
  nome: string;
  email: string;
  telefono: string;
  sito?: string;
}

export interface SurveyAnswers {
  vendi: VendiType;
  fatturato: string;
  investimento: string;
  sfida: string;
  contatti: SurveyContatti;
}

/* --- Opzioni dei singoli step --- */

export const STEP1_OPTIONS: { value: VendiType; label: string }[] = [
  { value: "lead", label: "Servizi / consulenze / B2B (lead generation)" },
  { value: "ecom", label: "Prodotti / ecommerce" },
  { value: "altro", label: "Altro" },
];

export const FATTURATO_OPTIONS = [
  "Sotto 100k",
  "100k - 500k",
  "500k - 1M",
  "Oltre 1M",
];

export const INVESTIMENTO_OPTIONS = [
  "Sotto 1k",
  "1k - 5k",
  "5k - 15k",
  "Oltre 15k",
];

export const SFIDA_OPTIONS_LEAD = [
  "Lead di bassa qualità",
  "Costo lead troppo alto",
  "Non chiudo abbastanza",
  "Altro",
];

export const SFIDA_OPTIONS_ECOM = [
  "ROAS basso",
  "Poche vendite",
  "Scarsa retention",
  "Altro",
];

/** Ritorna le opzioni dello Step 4 in base alla scelta dello Step 1. */
export function getSfidaOptions(vendi: VendiType | null): string[] | null {
  if (vendi === "lead") return SFIDA_OPTIONS_LEAD;
  if (vendi === "ecom") return SFIDA_OPTIONS_ECOM;
  // vendi === "altro" → campo testo libero (nessuna opzione predefinita)
  return null;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validazione del payload ricevuto dall'API. Usata lato server come ultima
 * barriera (il client valida già step per step).
 */
export function validateSurveyPayload(
  data: unknown,
):
  | { ok: true; value: SurveyAnswers }
  | { ok: false; error: string } {
  if (typeof data !== "object" || data === null) {
    return { ok: false, error: "Payload non valido." };
  }
  const d = data as Record<string, unknown>;

  const vendi = d.vendi;
  if (vendi !== "lead" && vendi !== "ecom" && vendi !== "altro") {
    return { ok: false, error: "Campo 'vendi' non valido." };
  }

  const fatturato = typeof d.fatturato === "string" ? d.fatturato.trim() : "";
  const investimento =
    typeof d.investimento === "string" ? d.investimento.trim() : "";
  const sfida = typeof d.sfida === "string" ? d.sfida.trim() : "";

  if (!fatturato) return { ok: false, error: "Seleziona il fatturato." };
  if (!investimento)
    return { ok: false, error: "Seleziona l'investimento mensile." };
  if (!sfida) return { ok: false, error: "Indica la tua sfida principale." };

  const c =
    typeof d.contatti === "object" && d.contatti !== null
      ? (d.contatti as Record<string, unknown>)
      : {};

  const nome = typeof c.nome === "string" ? c.nome.trim() : "";
  const email = typeof c.email === "string" ? c.email.trim() : "";
  const telefono = typeof c.telefono === "string" ? c.telefono.trim() : "";
  const sito = typeof c.sito === "string" ? c.sito.trim() : "";

  if (!nome) return { ok: false, error: "Il nome è obbligatorio." };
  if (!EMAIL_RE.test(email))
    return { ok: false, error: "Email non valida." };
  if (!telefono) return { ok: false, error: "Il telefono è obbligatorio." };

  return {
    ok: true,
    value: {
      vendi,
      fatturato,
      investimento,
      sfida,
      contatti: { nome, email, telefono, ...(sito ? { sito } : {}) },
    },
  };
}
