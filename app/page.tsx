import Hero from "@/components/Hero";
import Manifesto from "@/components/sections/Manifesto";
import ConversionArchitecture from "@/components/sections/ConversionArchitecture";
import Programmi from "@/components/sections/Programmi";
import Press from "@/components/sections/Press";

export default function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <ConversionArchitecture />
      <Programmi />
      <Press />
    </>
  );
}
