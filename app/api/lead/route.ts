import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { validateSurveyPayload } from "@/lib/survey";
import { saveLeadToFile, type Lead } from "@/lib/leads";
import { sendLeadEmail } from "@/lib/email";
import { saveToFramework360 } from "@/lib/crm";

// fs richiede il runtime Node.js (non Edge)
export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON non valido." }, { status: 400 });
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
