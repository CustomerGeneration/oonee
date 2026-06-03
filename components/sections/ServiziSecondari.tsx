import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

type Service = {
  name: string;
  description: string;
};

const SERVICES: Service[] = [
  {
    name: "STUDIOOS",
    description:
      "Contenuti che vendono. Video, copy, creatività progettati per convertire.",
  },
  {
    name: "BLOG OONEE",
    description: "Idee per chi vende online davvero.",
  },
];

export default function ServiziSecondari() {
  return (
    <section className="border-t border-white/5 bg-gradient-to-b from-[#0A1525] to-[#050810] py-20 sm:py-32 lg:py-40">
      <Container>
        <Reveal>
          <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
            Non solo strategia. Anche esecuzione.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          {SERVICES.map((service, i) => (
            <Reveal
              key={service.name}
              delay={(i % 2) * 0.1}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 sm:p-10"
            >
              <span className="inline-block rounded-full border border-white/15 px-3 py-1 text-xs uppercase tracking-widest text-white/40">
                Coming soon
              </span>
              <h3 className="mt-6 text-2xl font-bold tracking-tight sm:text-3xl">
                {service.name}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-white/60">
                {service.description}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
