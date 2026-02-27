import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Demo from "@/components/Demo";
import DemoForms from "@/components/DemoForms";
import HowItWorks from "@/components/HowItWorks";
import Security from "@/components/Security";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Stats />
      <Demo />
      <DemoForms />
      <HowItWorks />
      <Security />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  );
}
