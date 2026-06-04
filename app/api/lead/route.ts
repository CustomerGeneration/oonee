import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { validateSurveyPayload } from "@/lib/survey";
import { saveLeadToFile, type Lead } from "@/lib/leads";
import { sendLeadEmail, sendWaitlistEmail } from "@/lib/email";
import { saveToFramework360 } from "@/lib/crm";

// fs richiede il runtime Node.js (non Edge)
export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON non valido." }, { status: 400 });
  }

  // --- Lead "lista d'attesa" (es. studioos): riusa lo stesso endpoint/email ---
  if (
    typeof body === "object" &&
    body !== null &&
    (body as Record<string, unknown>).type === "waitlist"
  ) {
    const d = body as Record<string, unknown>;
    const email = typeof d.email === "string" ? d.email.trim() : "";
    const nome = typeof d.nome === "string" ? d.nome.trim() : "";
    const source =
      typeof d.source === "string" && d.source.trim()
        ? d.source.trim()
        : "lista d'attesa";

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Email non valida." }, { status: 400 });
    }

    const wait = await sendWaitlistEmail({
      nome: nome || undefined,
      email,
      source,
      createdAt: new Date().toISOString(),
    });
    if (!wait.sent) {
      console.warn("[Resend] waitlist non inviata:", wait.error);
    }
    return NextResponse.json({ ok: true });
  }

  const result = validateSurveyPayload(body);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  const lead: Lead = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    ...result.value,
  };

  // 1. Backup locale in ./data/leads.json (non bloccante)
  try {
    await saveLeadToFile(lead);
  } catch (e) {
    console.error("[leads.json] salvataggio fallito:", e);
  }

  // 2. Email Resend (best-effort, non blocca la conferma)
  const email = await sendLeadEmail(lead);
  if (!email.sent) {
    console.warn("[Resend] email non inviata:", email.error);
  }

  // 3. CRM Framework360 (placeholder)
  try {
    await saveToFramework360(lead);
  } catch (e) {
    console.error("[CRM] errore:", e);
  }

  return NextResponse.json({ ok: true });
}
