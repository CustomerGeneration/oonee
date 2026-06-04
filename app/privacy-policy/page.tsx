import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/legal/LegalPage";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Informativa sul trattamento dei dati personali ai sensi del Regolamento (UE) 2016/679 (GDPR).",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" lastUpdated="Giugno 2026">
      <p>
        La presente informativa descrive le modalità di trattamento dei dati
        personali degli utenti che consultano il sito {COMPANY.siteUrl} e
        utilizzano i relativi servizi, ai sensi del Regolamento (UE) 2016/679
        (“GDPR”) e della normativa italiana applicabile.
      </p>

      <h2>1. Titolare del trattamento</h2>
      <p>
        Il Titolare del trattamento è <strong>{COMPANY.legalName}</strong>,
        P.IVA {COMPANY.vat}, con sede legale in {COMPANY.address}.{" "}
        {COMPANY.brand} è un marchio di {COMPANY.legalName}.
        <br />
        Per qualsiasi richiesta in materia di privacy è possibile scrivere a{" "}
        <a href={`mailto:${COMPANY.privacyEmail}`}>{COMPANY.privacyEmail}</a>.
      </p>

      <h2>2. Tipologie di dati trattati</h2>
      <ul>
        <li>
          <strong>Dati di contatto</strong> forniti volontariamente tramite i
          form del sito (es. nome, email, telefono, sito web, informazioni sul
          business).
        </li>
        <li>
          <strong>Dati di navigazione</strong> raccolti automaticamente (es.
          indirizzo IP, tipo di browser e dispositivo, pagine visitate),
          eventualmente tramite cookie e tecnologie analoghe.
        </li>
        <li>
          <strong>Dati statistici e di marketing</strong> raccolti solo previo
          tuo consenso tramite strumenti di analisi e pixel pubblicitari.
        </li>
      </ul>

      <h2>3. Finalità e base giuridica</h2>
      <ul>
        <li>
          <strong>Gestione delle richieste di contatto e dei lead</strong>{" "}
          (rispondere, fornire informazioni, valutare una collaborazione) — base
          giuridica: esecuzione di misure precontrattuali e legittimo interesse
          (art. 6.1.b e 6.1.f GDPR).
        </li>
        <li>
          <strong>Statistiche e analisi</strong> sull’utilizzo del sito (cookie
          analitici) — base giuridica: consenso (art. 6.1.a GDPR).
        </li>
        <li>
          <strong>Marketing e remarketing</strong> tramite pixel pubblicitari —
          base giuridica: consenso (art. 6.1.a GDPR).
        </li>
        <li>
          <strong>Adempimenti di legge</strong> e gestione di eventuali
          contenziosi — base giuridica: obbligo legale e legittimo interesse.
        </li>
      </ul>

      <h2>4. Modalità del trattamento</h2>
      <p>
        I dati sono trattati con strumenti informatici e telematici, con misure
        di sicurezza adeguate a prevenire accessi non autorizzati, perdita o
        divulgazione. Le email dei lead sono gestite tramite il fornitore di
        invio email (Resend) e potranno essere sincronizzate con un sistema CRM.
      </p>

      <h2>5. Comunicazione e destinatari</h2>
      <p>
        I dati possono essere trattati da soggetti autorizzati e da fornitori
        terzi che agiscono in qualità di responsabili del trattamento (es.
        servizi di hosting, invio email, analisi statistiche, piattaforme
        pubblicitarie). I dati non sono diffusi né venduti a terzi.
      </p>

      <h2>6. Trasferimento extra UE</h2>
      <p>
        Alcuni fornitori potrebbero trattare dati al di fuori dello Spazio
        Economico Europeo. In tal caso il trasferimento avviene nel rispetto del
        GDPR, sulla base di clausole contrattuali standard o altre garanzie
        adeguate.
      </p>

      <h2>7. Periodo di conservazione</h2>
      <p>
        I dati di contatto sono conservati per il tempo necessario a gestire la
        richiesta e l’eventuale rapporto, e comunque non oltre i termini
        previsti dalla legge. I dati statistici e di marketing sono conservati
        secondo la durata indicata nella{" "}
        <Link href="/cookie-policy">Cookie Policy</Link> e finché permane il
        consenso.
      </p>

      <h2>8. Diritti dell’interessato</h2>
      <p>
        Hai diritto di accesso, rettifica, cancellazione, limitazione,
        portabilità e opposizione al trattamento, nonché di revocare il consenso
        in qualsiasi momento. Per esercitare i tuoi diritti scrivi a{" "}
        <a href={`mailto:${COMPANY.privacyEmail}`}>{COMPANY.privacyEmail}</a>.
        Hai inoltre il diritto di proporre reclamo all’Autorità Garante per la
        protezione dei dati personali (www.garanteprivacy.it).
      </p>

      <h2>9. Modifiche</h2>
      <p>
        Il Titolare può aggiornare la presente informativa. Le modifiche saranno
        pubblicate su questa pagina con indicazione della data di ultimo
        aggiornamento.
      </p>
    </LegalPage>
  );
}
