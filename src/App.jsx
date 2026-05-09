import { useEffect, useState } from "react";
import LoadingScreen from "./components/LoadingScreen";
import ScrollProgress from "./components/ScrollProgress";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Trusted from "./components/Trusted";
import About from "./components/About";
import Stats from "./components/Stats";
import Portfolio from "./components/Portfolio";
import GalleryMarquee from "./components/GalleryMarquee";
import Services from "./components/Services";
import Process from "./components/Process";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import CTA from "./components/CTA";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import FloatingButtons from "./components/FloatingButtons";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      <ScrollProgress />

      <main className="site-wrapper">
        <div className="background-glow background-glow-one"></div>
        <div className="background-glow background-glow-two"></div>

        <section className="main-container">
          <Navbar />
          <Hero />
          <Trusted />
        </section>

        <About />
        <Stats />
        <Portfolio />
        <GalleryMarquee />
        <Services />
        <Process />
        <Pricing />
        <Testimonials />
        <FAQ />
        <CTA />
        <Contact />
        <Footer />
        <FloatingButtons />
      </main>
    </>
  );
}

export default App;