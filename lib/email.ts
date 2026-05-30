import { Resend } from "resend";
import type { Lead } from "./leads";
import { STEP1_OPTIONS } from "./survey";

/**
 * Invia l'email di notifica del nuovo lead via Resend.
 * Best-effort: se la configurazione manca, ritorna sent=false senza lanciare,
 * così il flusso di cattura lead non si interrompe.
 */
export async function sendLeadEmail(
  lead: Lead,
): Promise<{ sent: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_EMAIL_TO;
  const from = process.env.LEAD_EMAIL_FROM;

  if (!apiKey || !to || !from) {
    return {
      sent: false,
      error:
        "Configurazione Resend mancante (RESEND_API_KEY / LEAD_EMAIL_TO / LEAD_EMAIL_FROM).",
    };
  }

  const resend = new Resend(apiKey);
  const vendiLabel =
    STEP1_OPTIONS.find((o) => o.value === lead.vendi)?.label ?? lead.vendi;

  const row = (label: string, value: string) =>
    `<tr>
      <td style="padding:8px 16px;color:#888;font-size:13px;white-space:nowrap;vertical-align:top">${label}</td>
      <td style="padding:8px 16px;color:#111;font-size:14px;font-weight:600">${value}</td>
    </tr>`;

  const sito = lead.contatti.sito
    ? `<a href="${lead.contatti.sito}" style="color:#0099cc">${lead.contatti.sito}</a>`
    : "—";

  const html = `
  <div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:0 auto">
    <h2 style="font-size:18px;color:#111">Nuovo lead — analisi Conversion Architecture</h2>
    <p style="color:#666;font-size:14px">Ricevuto il ${new Date(
      lead.createdAt,
    ).toLocaleString("it-IT")}</p>
    <table style="width:100%;border-collapse:collapse;border:1px solid #eee;border-radius:8px;overflow:hidden">
      ${row("Cosa vende", vendiLabel)}
      ${row("Fatturato/anno", lead.fatturato)}
      ${row("Investimento/mese", lead.investimento)}
      ${row("Sfida principale", lead.sfida)}
      ${row("Nome", lead.contatti.nome)}
      ${row(
        "Email",
        `<a href="mailto:${lead.contatti.email}" style="color:#0099cc">${lead.contatti.email}</a>`,
      )}
      ${row(
        "Telefono",
        `<a href="tel:${lead.contatti.telefono}" style="color:#0099cc">${lead.contatti.telefono}</a>`,
      )}
      ${row("Sito web", sito)}
    </table>
    <p style="color:#aaa;font-size:12px;margin-top:16px">ID lead: ${lead.id}</p>
  </div>`;

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: lead.contatti.email,
      subject: `Nuovo lead — ${lead.contatti.nome} (${vendiLabel})`,
      html,
    });
    if (error) return { sent: false, error: error.message ?? String(error) };
    return { sent: true };
  } catch (e) {
    return { sent: false, error: e instanceof Error ? e.message : String(e) };
  }
}
