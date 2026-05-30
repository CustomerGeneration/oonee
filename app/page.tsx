import Hero from "@/components/Hero";
import Container from "@/components/Container";

export default function Home() {
  return (
    <>
      <Hero />

      {/* Placeholder — verrà sostituito dalle sezioni reali nelle prossime fasi */}
      <section
        id="manifesto"
        className="flex min-h-screen items-center py-32"
      >
        <Container>
          <p className="text-sm uppercase tracking-[0.3em] text-white/40">
            [ Sezione Manifesto — in arrivo nella Fase 3 ]
          </p>
        </Container>
      </section>
    </>
  );
}
