import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

export default function Manifesto() {
  return (
    <section id="manifesto" className="py-32 sm:py-40">
      <Container>
        <Reveal>
          <h1 className="max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Non vendiamo marketing.
            <br />
            <span className="text-accent">Generiamo clienti.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-8 max-w-2xl text-lg text-white/60 sm:text-xl">
            Quello che vedi sopra è la punta dell&apos;iceberg. Sotto,
            l&apos;architettura che fa convertire davvero.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <a
            href="#conversion-architecture"
            className="mt-10 inline-flex items-center gap-2 text-base font-medium text-white underline-offset-8 transition-colors hover:text-accent hover:underline"
          >
            ↓ Scopri la Conversion Architecture
          </a>
        </Reveal>
      </Container>
    </section>
  );
}
