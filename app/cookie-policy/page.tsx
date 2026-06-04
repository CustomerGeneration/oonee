import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/legal/LegalPage";
import ManageCookiesButton from "@/components/cookie/ManageCookiesButton";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Informativa sull'uso dei cookie e delle tecnologie di tracciamento sul sito Oonee.",
};

export default function CookiePolicyPage() {
  return (
    <LegalPage title="Cookie Policy" lastUpdated="Giugno 2026">
      <p>
        Questa Cookie Policy spiega cosa sono i cookie, quali utilizziamo sul
        sito {COMPANY.siteUrl} e come puoi gestire le tue preferenze. Titolare
        del trattamento è <strong>{COMPANY.legalName}</strong> (P.IVA{" "}
        {COMPANY.vat}). Per i dettagli sul trattamento dei dati consulta la{" "}
        <Link href="/privacy-policy">Privacy Policy</Link>.
      </p>

      <h2>1. Cosa sono i cookie</h2>
      <p>
        I cookie sono piccoli file di testo che i siti salvano sul dispositivo
        dell’utente per memorizzare informazioni (es. preferenze, statistiche).
        Utilizziamo anche tecnologie analoghe (localStorage, pixel) con finalità
        simili.
      </p>

      <h2>2. Categorie di cookie utilizzati</h2>

      <h3>Cookie tecnici / necessari (sempre attivi)</h3>
      <p>
        Indispensabili per il funzionamento del sito e per memorizzare le tue
        scelte sui cookie. Non richiedono consenso e non possono essere
        disattivati. Includono il cookie che salva le tue preferenze di
        consenso.
      </p>

      <h3>Cookie analitici (opzionali, previo consenso)</h3>
      <p>
        Raccolgono informazioni in forma aggregata/anonima sull’uso del sito per
        aiutarci a migliorarlo. In futuro potremo utilizzare{" "}
        <strong>Google Analytics 4</strong>. Vengono attivati solo dopo il tuo
        consenso.
      </p>

      <h3>Cookie di marketing (opzionali, previo consenso)</h3>
      <p>
        Utilizzati per misurare le campagne pubblicitarie e mostrare annunci
        pertinenti, anche tramite pixel di terze parti (es.{" "}
        <strong>Meta/Facebook</strong> e altre piattaforme). Vengono attivati
        solo dopo il tuo consenso.
      </p>

      <h2>3. Gestione del consenso</h2>
      <p>
        Al primo accesso un banner ti consente di <strong>accettare</strong>,{" "}
        <strong>rifiutare</strong> o <strong>personalizzare</strong> le
        categorie di cookie. Di default i cookie analitici e di marketing sono
        disattivati e non vengono caricati finché non presti un consenso
        esplicito. Puoi modificare le tue scelte in qualsiasi momento:
      </p>
      <p>
        <ManageCookiesButton className="font-semibold text-accent underline underline-offset-4" />{" "}
        per riaprire il pannello delle preferenze.
      </p>

      <h2>4. Durata</h2>
      <p>
        La scelta sul consenso viene conservata fino a 12 mesi, dopodiché ti
        verrà richiesta nuovamente. I cookie di terze parti seguono le durate
        stabilite dai rispettivi fornitori.
      </p>

      <h2>5. Cookie e servizi di terze parti</h2>
      <p>
        Quando attivati con il tuo consenso, alcuni servizi di terze parti
        possono installare cookie propri. Ti invitiamo a consultare le
        rispettive informative (es. Google, Meta) per maggiori dettagli sul loro
        trattamento.
      </p>

      <h2>6. Contatti</h2>
      <p>
        Per qualsiasi domanda relativa a questa Cookie Policy scrivi a{" "}
        <a href={`mailto:${COMPANY.privacyEmail}`}>{COMPANY.privacyEmail}</a>.
      </p>
    </LegalPage>
  );
}
