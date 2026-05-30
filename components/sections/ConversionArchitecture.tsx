import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

type Pillar = {
  number: string;
  title: string;
  body?: string;
  quote?: string;
  attribution?: string;
};

const PILLARS: Pillar[] = [
  {
    number: "01",
    title: "Parte dal business, non dal canale",
    body: "Prima di scegliere come comunicare, capiamo cosa vendi, a chi, e perché dovrebbero comprare da te.",
  },
  {
    number: "02",
    title: "È un funnel adattivo",
    quote:
      "Il funnel adattivo costruisce un percorso su misura per ogni singolo utente, step dopo step, abbandonando l'approccio generico.",
    attribution: "— Angelo Maiolini, Economy Magazine",
  },
  {
    number: "03",
    title: "È iper-personalizzata",
    body: "Non comunichiamo a un pubblico. Comunichiamo a una persona. Concentrandoci non sul prodotto in sé, ma su come quel prodotto risolva concretamente il suo problema specifico.",
  },
  {
    number: "04",
    title: "Non è copiabile",
    body: "Ogni Conversion Architecture è unica perché ogni business è unico. Per questo funziona. Per questo non si replica.",
  },
];

export default function ConversionArchitecture() {
  return (
    <section
      id="conversion-architecture"
      className="border-t border-white/10 py-20 sm:py-32 lg:py-40"
    >
      <Container>
        <Reveal>
          <h2 className="max-w-4xl text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
            La Conversion Architecture è il metodo proprietario di Oonee.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-white/60">
            Non è un funnel. Non è una strategia pre-confezionata. Non è il
            template che vedi su LinkedIn. È un&apos;architettura cucita su misura
            per il tuo business: costruita step dopo step, partendo da chi vendi,
            non dal canale che usi.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-2">
          {PILLARS.map((pillar, i) => (
            <Reveal
              key={pillar.number}
              delay={(i % 2) * 0.1}
              className="flex h-full flex-col bg-black p-6 sm:p-8 lg:p-10"
            >
              <span className="text-sm font-bold tracking-widest text-accent">
                {pillar.number}
              </span>
              <h3 className="mt-4 text-lg font-bold uppercase tracking-tight sm:text-xl lg:text-2xl">
                {pillar.title}
              </h3>

              {pillar.body && (
                <p className="mt-4 text-base leading-relaxed text-white/60">
                  {pillar.body}
                </p>
              )}

              {pillar.quote && (
                <figure className="mt-4">
                  <blockquote className="border-l-2 border-accent pl-4 text-base italic leading-relaxed text-white/80">
                    “{pillar.quote}”
                  </blockquote>
                  <figcaption className="mt-3 pl-4 text-sm text-white/40">
                    {pillar.attribution}
                  </figcaption>
                </figure>
              )}
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
