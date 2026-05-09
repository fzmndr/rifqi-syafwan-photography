import { useEffect, useState } from "react";

import LoadingScreen from "./components/LoadingScreen";
import ScrollProgress from "./components/ScrollProgress";
import CustomCursor from "./components/CustomCursor";
import ThemeToggle from "./components/ThemeToggle";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Trusted from "./components/Trusted";
import About from "./components/About";
import Stats from "./components/Stats";
import SectionDivider from "./components/SectionDivider";
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
import EditingPreview from "./components/EditingPreview";
import PackageComparison from "./components/PackageComparison";
import InstagramShowcase from "./components/InstagramShowcase";

import NotFound from "./components/NotFound";
import EditGuide from "./components/EditGuide";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState(() => {
  return localStorage.getItem("rifqi-theme") || "dark";
    });

  const pathname = window.location.pathname;

  const isEditGuide = pathname === "/edit-guide";
  const isNotFound = pathname !== "/" && pathname !== "/edit-guide";

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  if (isEditGuide) {
    return (
      <>
        <LoadingScreen isLoading={isLoading} />
        <ScrollProgress />
        <CustomCursor />

        <div className={`theme-${theme}`}>
          <EditGuide />
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </div>
      </>
    );
  }

  if (isNotFound) {
    return (
      <>
        <LoadingScreen isLoading={isLoading} />
        <ScrollProgress />
        <CustomCursor />

        <div className={`theme-${theme}`}>
          <NotFound />
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </div>
      </>
    );
  }

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      <ScrollProgress />
      <CustomCursor />

      <main className={`site-wrapper theme-${theme}`}>
        <div className="background-glow background-glow-one"></div>
        <div className="background-glow background-glow-two"></div>

        <section className="main-container">
          <Navbar />
          <Hero />
          <Trusted />
        </section>

        <About />
        <Stats />

        <SectionDivider />

        <Portfolio />
        <GalleryMarquee />
        <EditingPreview />
        <Services />
        <Process />
        <Pricing />
        <PackageComparison />
        <Testimonials />
        <InstagramShowcase />
        <FAQ />

        <SectionDivider text="Book Your Session Today" />

        <CTA />
        <Contact />
        <Footer />

        <FloatingButtons />
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </main>
    </>
  );
}

export default App;