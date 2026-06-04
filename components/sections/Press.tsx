import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

type PressItem = {
  outlet: string;
  title: string;
  href: string;
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
    outlet: "Cronache di Milano",
    title: "La lead generation tradizionale è in crisi",
    href: "https://cronachedimilano.com/la-lead-generation-tradizionale-e-in-crisi/",
  },
  {
    outlet: "Primo Piano 24",
    title: "La lead generation tradizionale è in crisi",
    href: "https://primopiano24.it/la-lead-generation-tradizionale-e-in-crisi/",
  },
];

function PressCard({ item }: { item: PressItem }) {
  return (
    <article className="mr-6 flex h-full w-[280px] shrink-0 flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-7 sm:w-[340px] sm:p-8">
      <h3 className="text-xl font-bold tracking-tight">{item.outlet}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-white/50">
        {item.title}
      </p>
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-accent underline-offset-8 transition-colors hover:underline"
      >
        Leggi l&apos;articolo →
      </a>
    </article>
  );
}

export default function Press() {
  // duplico la lista per il loop continuo (translateX -50%)
  const loop = [...PRESS, ...PRESS];

  return (
    <section
      id="press"
      className="overflow-hidden border-t border-white/5 bg-[#0A1525] py-16 sm:py-32 lg:py-40"
    >
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
      </Container>

      {/* Carosello a scorrimento continuo (pausa al passaggio del mouse) */}
      <div className="marquee-mask group mt-10 sm:mt-16">
        <ul className="marquee-track">
          {loop.map((item, i) => (
            <li
              key={`${item.outlet}-${i}`}
              className="flex"
              aria-hidden={i >= PRESS.length}
            >
              <PressCard item={item} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
