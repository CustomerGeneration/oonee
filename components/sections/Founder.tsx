import Image from "next/image";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

export default function Founder() {
  return (
    <section id="founder" className="border-t border-white/5 bg-[#050810] py-16 sm:py-32 lg:py-40">
      <Container>
        <Reveal>
          <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
            Chi c&apos;è dietro oonee.
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-10 sm:mt-16 md:grid-cols-[300px_1fr] md:gap-16">
          {/* Foto founder */}
          <Reveal className="flex justify-center md:justify-start">
            <div className="relative h-[200px] w-[200px] overflow-hidden rounded-full border border-accent/60 shadow-[0_0_70px_-15px_rgba(0,153,204,0.7)] md:h-[300px] md:w-[300px]">
              <Image
                src="/founder.jpg"
                alt="Angelo Nico Maiolini"
                fill
                sizes="(min-width: 768px) 300px, 200px"
                className="object-cover object-center"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col justify-center">
            <p className="max-w-2xl text-lg leading-relaxed text-white/70">
              Angelo Nico Maiolini. Imprenditore digitale. Marchio Customer
              Generation<sup className="text-accent">®</sup> registrato. Citato
              su Fortune Italia ed Economy Magazine.
            </p>

            <blockquote className="group mt-8 max-w-2xl border-l-2 border-accent pl-6 text-xl italic leading-relaxed text-white/90 transition-all duration-300 hover:border-l-4 hover:pl-7 hover:text-white sm:text-2xl">
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
