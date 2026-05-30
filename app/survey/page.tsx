import Link from "next/link";
import Container from "@/components/Container";

export const metadata = {
  title: "Analisi Conversion Architecture",
};

// Stub temporaneo — la survey 5-step viene implementata nella Fase 6.
export default function SurveyPage() {
  return (
    <section className="flex min-h-screen items-center py-32">
      <Container className="text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Analisi in arrivo.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-white/60">
          La survey verrà attivata a breve. [ Fase 6 ]
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-2 text-base font-semibold text-white underline-offset-8 hover:text-accent hover:underline"
        >
          ← Torna alla home
        </Link>
      </Container>
    </section>
  );
}
