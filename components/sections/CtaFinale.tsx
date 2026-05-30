import Link from "next/link";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

export default function CtaFinale() {
  return (
    <section
      id="cta"
      className="border-t border-white/10 py-32 sm:py-48"
    >
      <Container className="text-center">
        <Reveal>
          <h2 className="mx-auto max-w-4xl text-3xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            Scopri il potenziale del tuo business con la Conversion
            Architecture.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-8 max-w-2xl text-lg text-white/60 sm:text-xl">
            Rispondi a 5 domande. In 60 secondi capiamo se la Conversion
            Architecture può funzionare per te.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <Link
            href="/survey"
            className="mt-12 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-black transition-colors hover:bg-accent hover:text-white sm:text-lg"
          >
            Inizia l&apos;analisi →
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
