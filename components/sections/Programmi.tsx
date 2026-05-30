import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

function ArrowList({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-base text-white/70">
          <span className="text-accent">→</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function Programmi() {
  return (
    <section
      id="programmi"
      className="border-t border-white/10 py-20 sm:py-32 lg:py-40"
    >
      <Container>
        <Reveal>
          <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
            Due verticali. Un solo metodo.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-white/60">
            Online si vende in due modi: a contatto (lead) o a transazione
            (ecom). Per ciascuno abbiamo costruito un programma dedicato.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* CARD A — Customer Generation */}
          <Reveal
            className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 lg:p-10"
          >
            <div id="customer-generation" className="scroll-mt-24">
              <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Customer Generation<sup className="text-accent">®</sup>
              </h3>
              <p className="mt-4 text-base text-white/70">
                Per chi vende servizi, consulenze, prodotti high-ticket.
              </p>
            </div>

            <figure className="mt-6">
              <blockquote className="border-l-2 border-accent pl-4 text-base italic leading-relaxed text-white/80">
                “Cerchiamo direttamente di prendere il cliente e non il lead,
                perché abbiamo procedure che trasformano potenzialmente ogni
                contatto in acquirente.”
              </blockquote>
              <figcaption className="mt-3 pl-4 text-sm text-white/40">
                — Angelo Maiolini, Fortune Italia
              </figcaption>
            </figure>

            <ArrowList
              items={[
                "Non liste infinite di lead non qualificati.",
                "Clienti pronti a comprare.",
              ]}
            />

            <a
              href="#cta"
              className="mt-8 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-base font-semibold text-white transition hover:border-accent hover:text-accent active:scale-[0.98] sm:min-h-0 sm:w-fit sm:justify-start sm:rounded-none sm:border-0 sm:px-0 sm:py-0 sm:underline-offset-8 sm:hover:text-accent sm:hover:underline sm:active:scale-100 lg:mt-auto lg:pt-8"
            >
              Scopri Customer Generation →
            </a>
          </Reveal>

          {/* CARD B — Revenue Generation */}
          <Reveal
            delay={0.1}
            className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 lg:p-10"
          >
            <div id="revenue-generation" className="scroll-mt-24">
              <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Revenue Generation
              </h3>
              <p className="mt-4 text-base text-white/70">
                Per chi ha un ecommerce e vuole scalare.
              </p>
            </div>

            <ArrowList
              items={[
                "Architettura conversion-first costruita per il tuo store.",
                "Ottimizzazione ROAS, AOV, LTV, retention.",
                "Niente trucchi, solo struttura che converte.",
              ]}
            />

            <a
              href="#cta"
              className="mt-8 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-base font-semibold text-white transition hover:border-accent hover:text-accent active:scale-[0.98] sm:min-h-0 sm:w-fit sm:justify-start sm:rounded-none sm:border-0 sm:px-0 sm:py-0 sm:underline-offset-8 sm:hover:text-accent sm:hover:underline sm:active:scale-100 lg:mt-auto lg:pt-8"
            >
              Scopri Revenue Generation →
            </a>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
