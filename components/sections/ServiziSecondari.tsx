import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

/**
 * Sezione Blog (separata da studioos).
 */
export default function ServiziSecondari() {
  return (
    <section className="border-t border-white/5 bg-[#050810] py-16 sm:py-32 lg:py-40">
      <Container>
        <Reveal className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 sm:p-12">
          <span className="inline-block rounded-full border border-white/15 px-3 py-1 text-xs uppercase tracking-widest text-white/40">
            Coming soon
          </span>
          <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
            blog oonee
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-white/60">
            Idee per chi vende online davvero.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
