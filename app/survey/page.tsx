import Container from "@/components/Container";
import SurveyForm from "@/components/survey/SurveyForm";

export const metadata = {
  title: "Analisi Conversion Architecture",
  description:
    "Rispondi a 5 domande. In 60 secondi capiamo se la Conversion Architecture può funzionare per te.",
};

export default function SurveyPage() {
  return (
    <section className="flex min-h-screen w-full items-center py-28 sm:py-40">
      <Container className="min-w-0">
        <SurveyForm />
      </Container>
    </section>
  );
}
