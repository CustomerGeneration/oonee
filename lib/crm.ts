import type { Lead } from "./leads";

/**
 * Placeholder per la futura integrazione con Framework360 CRM.
 *
 * TODO: quando saranno disponibili le credenziali (FRAMEWORK360_API_KEY /
 * FRAMEWORK360_ENDPOINT), sostituire il console.log con la reale chiamata HTTP
 * per creare/aggiornare il contatto nel CRM. Mantenere la funzione async e
 * non bloccante rispetto al flusso di cattura lead.
 */
export async function saveToFramework360(lead: Lead): Promise<void> {
  console.log("[Framework360 CRM] TODO — lead da sincronizzare:", {
    id: lead.id,
    nome: lead.contatti.nome,
    email: lead.contatti.email,
    telefono: lead.contatti.telefono,
    vendi: lead.vendi,
  });
}
