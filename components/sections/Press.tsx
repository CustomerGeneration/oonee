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
    <section id="press" className="border-t border-white/5 bg-[#0A1525] py-16 sm:py-32 lg:py-40">
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

        <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-16 md:grid-cols-2">
          {PRESS.map((item, i) => (
            <Reveal
              key={item.outlet}
              delay={(i % 2) * 0.1}
              className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition duration-300 hover:border-accent/50 hover:shadow-[0_0_50px_-20px_rgba(0,153,204,0.55)] sm:p-10"
            >
              <h3 className="text-2xl font-bold tracking-tight">
                {item.outlet}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/50">
                {item.title}
              </p>

              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex w-fit items-center gap-2 text-base font-semibold text-accent underline-offset-8 transition-colors hover:underline"
                >
                  Leggi articolo →
                </a>
              ) : (
                <span className="mt-6 inline-flex w-fit items-center gap-2 text-base text-white/30">
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
