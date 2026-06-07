import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

type PressItem = {
  outlet: string;
  href: string;
  /** logo immagine già presente nel progetto (Fortune, Economy, Cronache di Milano) */
  logo?: string;
};

const PRESS: PressItem[] = [
  {
    outlet: "Fortune Italia",
    logo: "/fortune-press.png",
    href: "https://www.fortuneita.com/2025/12/21/la-calabria-diventa-hub-tecnologico-lai-rivoluziona-il-marketing-digitale-dalle-coste-del-sud-il-commento-di-angelo-nico-maiolini/",
  },
  {
    outlet: "Economy",
    logo: "/economy-press.png",
    href: "https://www.economymagazine.it/maiolini-dai-troppi-bit-alliper-personalizzazione-ecco-il-nuovo-marketing/",
  },
  {
    outlet: "Cronache di Milano",
    href: "https://cronachedimilano.com/la-lead-generation-tradizionale-e-in-crisi/",
  },
  {
    outlet: "Corriere di Palermo",
    href: "https://corrieredipalermo.it/la-lead-generation-tradizionale-e-in-crisi/",
  },
  {
    outlet: "Il Corriere di Firenze",
    href: "https://ilcorrieredifirenze.it/la-lead-generation-tradizionale-e-in-crisi/",
  },
  {
    outlet: "La Città di Roma",
    href: "https://lacittadiroma.it/la-lead-generation-tradizionale-e-in-crisi/",
  },
  {
    outlet: "Corriere di Ancona",
    href: "https://corrierediancona.it/la-lead-generation-tradizionale-e-in-crisi/",
  },
  {
    outlet: "Corriere della Sardegna",
    href: "https://corrieredellasardegna.it/la-lead-generation-tradizionale-e-in-crisi/",
  },
  {
    outlet: "Primo Piano 24",
    href: "https://primopiano24.it/la-lead-generation-tradizionale-e-in-crisi/",
  },
  {
    outlet: "Canale Uno",
    href: "https://www.canaleuno.it/2026/01/08/la-lead-generation-tradizionale-e-in-crisi/",
  },
  {
    outlet: "Cronache della Calabria",
    href: "https://cronachedellacalabria.it/la-lead-generation-tradizionale-e-in-crisi/",
  },
  {
    outlet: "Notizie Di",
    href: "https://notiziedi.it/la-lead-generation-tradizionale-e-in-crisi/",
  },
];

function PressChip({
  item,
  ariaHidden,
}: {
  item: PressItem;
  ariaHidden?: boolean;
}) {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={item.outlet}
      tabIndex={ariaHidden ? -1 : undefined}
      aria-hidden={ariaHidden}
      className="group relative mr-[22px] flex h-24 min-w-[188px] shrink-0 items-center justify-center rounded-[14px] bg-white px-[30px] no-underline transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_18px_42px_-16px_rgba(0,0,0,0.55)]"
    >
      {/* freccia di link, visibile all'hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-[11px] top-[9px] text-sm text-[#2E9BEF] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      >
        ↗
      </span>

      {item.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.logo}
          alt={item.outlet}
          className="max-h-14 max-w-[150px] object-contain"
        />
      ) : (
        <span className="whitespace-nowrap text-center font-serif text-lg leading-tight text-[#16181d]">
          {item.outlet}
        </span>
      )}
    </a>
  );
}

export default function Press() {
  // duplico per il loop continuo (translateX -50%)
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
          <p className="mt-8 max-w-none text-lg leading-relaxed text-white/60 lg:whitespace-nowrap">
            La nostra visione sull&apos;iper-personalizzazione e sulla
            Conversion Architecture è stata raccontata da:
          </p>
        </Reveal>
      </Container>

      {/* Striscia di soli loghi a scorrimento continuo (pausa al passaggio del mouse) */}
      <div className="marquee-mask mt-10 sm:mt-16">
        <div className="marquee-track">
          {loop.map((item, i) => (
            <PressChip
              key={`${item.outlet}-${i}`}
              item={item}
              ariaHidden={i >= PRESS.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
