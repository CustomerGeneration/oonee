import Link from "next/link";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

export default function CtaFinale() {
  return (
    <section
      id="cta"
      className="border-t border-white/5 bg-gradient-to-b from-[#050810] to-black py-16 sm:py-32 lg:py-48"
    >
      <Container className="text-center">
        <Reveal>
          <h2 className="mx-auto max-w-4xl text-[clamp(1.9rem,6vw,3.75rem)] font-bold leading-[1.1] tracking-tight">
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
            className="mt-12 inline-flex min-h-[52px] items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-black transition hover:bg-accent hover:text-white active:scale-[0.98] sm:text-lg"
          >
            Inizia l&apos;analisi →
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
