import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { heroSlides } from "../data/heroData";

function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((current) =>
        current === heroSlides.length - 1 ? 0 : current + 1
      );
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const currentSlide = heroSlides[activeSlide];

  return (
    <section className="hero" id="home">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentSlide.image}
          src={currentSlide.image}
          alt="Photographer"
          className="hero-img"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
      </AnimatePresence>

      <div className="hero-overlay"></div>

      <div className="hero-content">
        <motion.div
          className="hero-left"
          initial={{ y: 45, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 1.9, ease: "easeOut" }}
        >
          <p className="eyebrow">Hey, I'm a</p>

          <h1>
            Photographer
          </h1>
        </motion.div>

        <motion.div
          className="hero-right"
          initial={{ y: 45, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 2.1, ease: "easeOut" }}
        >
          <span className="hero-slide-label">Portrait Session</span>

          <h2>
            Documenting moments and creating visuals that tell stories.
          </h2>

          <p>
            I create, explore, and turn ideas into visuals.
          </p>
        </motion.div>
      </div>

      <motion.a
        href="#portfolio"
        className="floating-cta"
        initial={{ y: 25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.3, ease: "easeOut" }}
      >
        View Portfolio
        <ArrowRight size={18} />
      </motion.a>

      <motion.div
        className="hero-bottom"
        initial={{ y: 35, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 2.45, ease: "easeOut" }}
      >
        <div>
          <span>#01</span>
          <p>Event</p>
        </div>

        <div>
          <span>#02</span>
          <p>Portrait</p>
        </div>

        <div>
          <span>#03</span>
          <p>Brand</p>
        </div>

        <div>
          <span>#04</span>
          <p>Automotive</p>
        </div>
      </motion.div>

      <div className="hero-slider-dots">
        {heroSlides.map((slide, index) => (
          <button
            type="button"
            key={slide.label}
            className={activeSlide === index ? "active" : ""}
            onClick={() => setActiveSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default Hero;