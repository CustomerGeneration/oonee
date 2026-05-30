import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

type PressItem = {
  outlet: string;
  title: string;
  href: string | null; // null = link non ancora disponibile
};

const PRESS: PressItem[] = [
  {
    outlet: "Fortune Italia",
    title:
      "La Calabria diventa hub tecnologico: l'AI rivoluziona il marketing digitale",
    href: "https://www.fortuneita.com/2025/12/21/la-calabria-diventa-hub-tecnologico-lai-rivoluziona-il-marketing-digitale-dalle-coste-del-sud-il-commento-di-angelo-nico-maiolini/",
  },
  {
    outlet: "Economy Magazine",
    title:
      "Dai troppi bit all'iper-personalizzazione, ecco il nuovo marketing",
    href: "https://www.economymagazine.it/maiolini-dai-troppi-bit-alliper-personalizzazione-ecco-il-nuovo-marketing/",
  },
  {
    outlet: "Sky Italia",
    title: "Intervista TV",
    href: null,
  },
  {
    outlet: "Cronache di Milano",
    title: "Articolo dedicato",
    href: null,
  },
];

export default function Press() {
  return (
    <section id="press" className="border-t border-white/10 py-20 sm:py-32 lg:py-40">
      <Container>
        <Reveal>
          <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
            Quello che facciamo ha avuto eco.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-white/60">
            La nostra visione sull&apos;iper-personalizzazione e sulla
            Conversion Architecture è stata raccontata da:
          </p>
        </Reveal>

        <div className="mt-16 divide-y divide-white/10 border-y border-white/10">
          {PRESS.map((item, i) => (
            <Reveal
              key={item.outlet}
              delay={(i % 2) * 0.05}
              className="flex flex-col gap-4 py-8 md:flex-row md:items-center md:justify-between md:gap-8"
            >
              <div className="md:flex md:flex-1 md:items-baseline md:gap-8">
                <h3 className="text-xl font-bold tracking-tight sm:text-2xl md:w-64 md:shrink-0">
                  {item.outlet}
                </h3>
                <p className="mt-2 text-base text-white/60 md:mt-0">
                  {item.title}
                </p>
              </div>

              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="-my-2 inline-flex min-h-[44px] w-fit items-center gap-2 py-2 text-base font-semibold text-white underline-offset-8 transition-colors hover:text-accent hover:underline md:my-0 md:min-h-0 md:py-0"
                >
                  Leggi →
                </a>
              ) : (
                <span className="inline-flex w-fit items-center gap-2 text-base text-white/30">
                  Disponibile a breve
                </span>
              )}
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
