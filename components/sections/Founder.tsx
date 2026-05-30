import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

export default function Founder() {
  return (
    <section id="founder" className="border-t border-white/10 py-20 sm:py-32 lg:py-40">
      <Container>
        <Reveal>
          <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
            Chi c&apos;è dietro Oonee.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-[280px_1fr] md:gap-16">
          {/* Placeholder foto founder — TODO: sostituire con foto reale */}
          <Reveal className="flex justify-center md:justify-start">
            <div className="flex aspect-square w-full max-w-[280px] items-center justify-center rounded-2xl border border-white/15 bg-white/[0.02]">
              <span className="text-6xl font-bold tracking-tight text-white/30">
                AM
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col justify-center">
            <p className="max-w-2xl text-lg leading-relaxed text-white/70">
              Angelo Nico Maiolini. Imprenditore digitale. Marchio Customer
              Generation<sup className="text-accent">®</sup> registrato. Citato
              su Fortune Italia ed Economy Magazine.
            </p>

            <blockquote className="mt-8 max-w-2xl border-l-2 border-accent pl-6 text-xl italic leading-relaxed text-white/90 sm:text-2xl">
              “Con gli strumenti digitali attuali non esistono più limitazioni
              geografiche. Non rappresentiamo più una regione in ritardo, ma
              un&apos;area all&apos;avanguardia.”
            </blockquote>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
