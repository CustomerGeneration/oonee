import { Target, TrendingUp } from "lucide-react";
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

type Kpi = { value: string; label: string };

function Risultati({ kpis }: { kpis: Kpi[] }) {
  return (
    <div className="mt-8 rounded-xl border border-white/10 bg-black/40 p-5">
      <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
        Risultati medi
      </p>
      <div className="mt-4 grid grid-cols-2 gap-4">
        {kpis.map((k) => (
          <div key={k.label}>
            <p className="text-2xl font-bold text-accent sm:text-3xl">
              {k.value}
            </p>
            <p className="mt-1 text-sm text-white/60">{k.label}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs italic text-white/30">
        *placeholder, dati reali in arrivo
      </p>
    </div>
  );
}

const cardClass =
  "flex h-full flex-col rounded-2xl border border-accent/30 bg-white/[0.02] p-6 shadow-[0_0_60px_-25px_rgba(0,153,204,0.6)] sm:p-8 lg:p-10";

const ctaClass =
  "mt-8 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-base font-semibold text-white transition hover:border-accent hover:text-accent active:scale-[0.98] sm:min-h-0 sm:w-fit sm:justify-start sm:rounded-none sm:border-0 sm:px-0 sm:py-0 sm:underline-offset-8 sm:hover:text-accent sm:hover:underline sm:active:scale-100 lg:mt-auto lg:pt-8";

export default function Programmi() {
  return (
    <section
      id="programmi"
      className="border-t border-white/5 bg-gradient-to-b from-[#050810] to-[#0A1525] py-16 sm:py-32 lg:py-40"
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

        <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-16 lg:grid-cols-2">
          {/* CARD A — Customer Generation */}
          <Reveal className={cardClass}>
            <Target size={40} className="text-accent" aria-hidden />

            <div id="customer-generation" className="mt-6 scroll-mt-24">
              <p className="text-sm font-semibold uppercase tracking-wide text-accent">
                Vendi servizi, consulenze, B2B?
              </p>
              <h3 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
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

            <Risultati
              kpis={[
                { value: "3x", label: "lead qualificati medi" },
                { value: "−40%", label: "costo per acquisizione" },
              ]}
            />

            <a href="#cta" className={ctaClass}>
              Scopri Customer Generation →
            </a>
          </Reveal>

          {/* CARD B — Revenue Generation */}
          <Reveal delay={0.1} className={cardClass}>
            <TrendingUp size={40} className="text-accent" aria-hidden />

            <div id="revenue-generation" className="mt-6 scroll-mt-24">
              <p className="text-sm font-semibold uppercase tracking-wide text-accent">
                Hai un ecommerce e vuoi scalare?
              </p>
              <h3 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
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

            <Risultati
              kpis={[
                { value: "+45%", label: "ROAS medio" },
                { value: "+30%", label: "retention rate" },
              ]}
            />

            <a href="#cta" className={ctaClass}>
              Scopri Revenue Generation →
            </a>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
