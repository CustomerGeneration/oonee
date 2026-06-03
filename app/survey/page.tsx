import Container from "@/components/Container";
import SurveyForm from "@/components/survey/SurveyForm";

export const metadata = {
  title: "Analisi Conversion Architecture",
  description:
    "Rispondi a 5 domande. In 60 secondi capiamo se la Conversion Architecture può funzionare per te.",
};

export default function SurveyPage() {
  return (
    <section className="flex min-h-[100svh] w-full items-start pb-16 pt-28 sm:items-center sm:py-40">
      <Container className="min-w-0">
        <SurveyForm />
      </Container>
    </section>
  );
}
