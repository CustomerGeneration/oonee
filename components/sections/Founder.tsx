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

        <div className="mt-10 grid grid-cols-1 gap-10 sm:mt-16 md:grid-cols-[420px_1fr] md:gap-16">
          {/* Foto founder a colori, sfumata morbida nel fondo nero (volto luminoso) */}
          <Reveal className="flex justify-center md:justify-start">
            <div className="relative aspect-[3/4] w-full max-w-[360px] md:max-w-[420px]">
              <Image
                src="/founder-color.jpg"
                alt="Angelo Nico Maiolini"
                fill
                priority
                sizes="(min-width: 768px) 420px, 360px"
                className="object-cover"
                style={{
                  maskImage:
                    "radial-gradient(ellipse at center, #000 52%, transparent 86%)",
                  WebkitMaskImage:
                    "radial-gradient(ellipse at center, #000 52%, transparent 86%)",
                }}
              />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col justify-center">
            {/* Bio breve */}
            <p className="max-w-2xl text-base leading-relaxed text-white/60">
              Angelo Nico Maiolini. Imprenditore digitale. Marchio Customer
              Generation<sup className="text-accent">®</sup> registrato. Citato
              su Fortune Italia ed Economy Magazine.
            </p>

            {/* Manifesto */}
            <div className="mt-8 max-w-2xl space-y-4 border-l-2 border-accent pl-6">
              <p className="text-lg leading-relaxed text-white/85 sm:text-xl">
                Le persone non sono bombardate dalla pubblicità. Ci sono immerse.
                E la ignorano.
              </p>
              <p className="text-lg leading-relaxed text-white/85 sm:text-xl">
                Vince una sola azienda: quella che smette di parlare alla massa e
                parla al singolo.
              </p>
              <p className="text-lg leading-relaxed text-white/85 sm:text-xl">
                Iper-personalizzazione. Uno a uno, su scala. Questa è la
                Conversion Architecture.
              </p>
            </div>

            {/* Frase-bandiera */}
            <p className="mt-10 max-w-2xl text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
              Non facciamo più marketing.{" "}
              <span className="text-accent">Costruiamo conversione.</span>
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
