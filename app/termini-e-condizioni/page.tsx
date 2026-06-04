import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/legal/LegalPage";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = {
  title: "Termini e Condizioni",
  description:
    "Termini e condizioni di utilizzo del sito oonee, marchio di Ad Maiora srls.",
};

export default function TerminiPage() {
  return (
    <LegalPage title="Termini e Condizioni" lastUpdated="Giugno 2026">
      <p>
        I presenti Termini e Condizioni regolano l’accesso e l’utilizzo del sito{" "}
        {COMPANY.siteUrl} (il “Sito”), gestito da{" "}
        <strong>{COMPANY.legalName}</strong>, P.IVA {COMPANY.vat}, con sede
        legale in {COMPANY.address}. Utilizzando il Sito accetti i presenti
        Termini.
      </p>

      <h2>1. Oggetto</h2>
      <p>
        Il Sito presenta i servizi di {COMPANY.brand}, marchio di{" "}
        {COMPANY.legalName}, e consente agli utenti di richiedere informazioni e
        contatti tramite appositi form. {COMPANY.brand} è una marketing agency
        specializzata in Conversion Architecture.
      </p>

      <h2>2. Proprietà intellettuale</h2>
      <p>
        I contenuti del Sito (testi, grafica, logo, marchi, layout, codice) sono
        di proprietà di {COMPANY.legalName} o dei rispettivi titolari e sono
        protetti dalle normative su proprietà intellettuale e industriale. I
        marchi “{COMPANY.brand}” e “Customer Generation” sono di titolarità di{" "}
        {COMPANY.legalName}. È vietata la riproduzione, anche parziale, senza
        autorizzazione scritta.
      </p>

      <h2>3. Utilizzo del Sito</h2>
      <p>
        L’utente si impegna a utilizzare il Sito in conformità alla legge e a non
        comprometterne il funzionamento o la sicurezza. I form di contatto devono
        essere compilati con dati veritieri e riferiti all’utente o a soggetti
        legittimamente rappresentati.
      </p>

      <h2>4. Richieste di contatto</h2>
      <p>
        L’invio di una richiesta tramite i form non costituisce obbligo di
        instaurare un rapporto contrattuale. Il trattamento dei dati forniti è
        descritto nella <Link href="/privacy-policy">Privacy Policy</Link>.
      </p>

      <h2>5. Limitazione di responsabilità</h2>
      <p>
        Il Sito è fornito “così com’è”. {COMPANY.legalName} non garantisce
        l’assenza di interruzioni o errori e non è responsabile per eventuali
        danni derivanti dall’uso o dall’impossibilità di utilizzo del Sito, nei
        limiti consentiti dalla legge. Il Sito può contenere collegamenti a siti
        di terzi, di cui {COMPANY.legalName} non è responsabile.
      </p>

      <h2>6. Modifiche</h2>
      <p>
        {COMPANY.legalName} si riserva di modificare in qualsiasi momento i
        contenuti del Sito e i presenti Termini. Le modifiche hanno effetto dalla
        pubblicazione su questa pagina.
      </p>

      <h2>7. Legge applicabile e foro competente</h2>
      <p>
        I presenti Termini sono regolati dalla legge italiana. Per ogni
        controversia è competente il foro del luogo in cui ha sede il Titolare,
        salvo il foro inderogabile del consumatore ove applicabile.
      </p>

      <h2>8. Contatti</h2>
      <p>
        Per informazioni sui presenti Termini scrivi a{" "}
        <a href={`mailto:${COMPANY.privacyEmail}`}>{COMPANY.privacyEmail}</a>.
      </p>
    </LegalPage>
  );
}
