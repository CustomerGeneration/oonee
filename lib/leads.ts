import { promises as fs } from "fs";
import path from "path";
import type { SurveyAnswers } from "./survey";

export interface Lead extends SurveyAnswers {
  id: string;
  createdAt: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

/**
 * Salva il lead come backup locale in ./data/leads.json (array di lead).
 * Crea la cartella se non esiste.
 *
 * NOTA: su Vercel/serverless il filesystem è di sola lettura (eccetto /tmp),
 * quindi questo salvataggio funziona in locale e su server con disco scrivibile,
 * ma NON persiste su Vercel. La fonte di verità per i lead resta l'email Resend
 * (e in futuro il CRM Framework360). Il chiamante gestisce gli errori in modo
 * non bloccante.
 */
export async function saveLeadToFile(lead: Lead): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });

  let leads: Lead[] = [];
  try {
    const raw = await fs.readFile(LEADS_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) leads = parsed;
  } catch {
    // file inesistente o JSON corrotto → ripartiamo da array vuoto
    leads = [];
  }

  leads.push(lead);
  await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
}
