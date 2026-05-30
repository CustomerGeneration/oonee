import Hero from "@/components/Hero";
import Manifesto from "@/components/sections/Manifesto";
import ConversionArchitecture from "@/components/sections/ConversionArchitecture";
import Programmi from "@/components/sections/Programmi";
import Press from "@/components/sections/Press";
import ServiziSecondari from "@/components/sections/ServiziSecondari";
import Founder from "@/components/sections/Founder";
import CtaFinale from "@/components/sections/CtaFinale";

export default function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <ConversionArchitecture />
      <Programmi />
      <Press />
      <ServiziSecondari />
      <Founder />
      <CtaFinale />
    </>
  );
}
