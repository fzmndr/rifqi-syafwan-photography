import { useEffect, useMemo, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { heroSlides } from "../data/heroData";

function Hero() {
  /* ==========================================================
      STATE
  ========================================================== */
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = heroSlides.length;

  /* ==========================================================
      PRELOAD IMAGES
  ========================================================== */
  useEffect(() => {
    heroSlides.forEach((slide) => {
      const image = new Image();
      image.src = slide.image;
    });
  }, []);

  /* ==========================================================
      NEXT SLIDE
  ========================================================== */
  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  }, [totalSlides]);

  /* ==========================================================
      GO TO SLIDE
  ========================================================== */
  const goToSlide = useCallback((index) => {
    setActiveSlide(index);
  }, []);

  /* ==========================================================
      AUTO PLAY
  ========================================================== */
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [nextSlide]);

  /* ==========================================================
      CURRENT SLIDE DATA
  ========================================================== */
  const currentSlide = useMemo(() => {
    return (
      heroSlides[activeSlide] || {
        image: "",
        label: "Photography",
        title: "Documenting moments and creating visuals that tell stories.",
        description: "I create, explore, and turn ideas into visuals.",
      }
    );
  }, [activeSlide]);

  /* ==========================================================
      RENDER
  ========================================================== */
  return (
    <section className="hero" id="home">
      {/* ==============================
          Background Image (Animated)
      ============================== */}
      <AnimatePresence mode="wait">
        <motion.img
          key={currentSlide.image}
          src={currentSlide.image}
          alt={currentSlide.title}
          className="hero-img"
          draggable={false}
          loading="eager"
          fetchPriority="high"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
        />
      </AnimatePresence>

      {/* ==============================
          Overlay
      ============================== */}
      <div className="hero-overlay" />

      {/* ==============================
          Content Wrapper
      ============================== */}
      <div className="hero-wrapper">
        {/* LEFT CONTENT */}
        <motion.div
          className="hero-left"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="eyebrow">Hey, I'm a</p>
          <h1 className="hero-title">Photographer</h1>

          <motion.a
            href="#portfolio"
            className="floating-cta"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
          >
            <span>View Portfolio</span>
            <ArrowRight size={18} />
          </motion.a>
        </motion.div>

        {/* RIGHT CARD */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            className="hero-card"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.45 }}
          >
            <span className="hero-slide-label">{currentSlide.label}</span>
            <h2 className="hero-card-title">{currentSlide.title}</h2>
            <p className="hero-card-description">{currentSlide.description}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* =====================================
          HERO NAVIGATION (Categories)
      ===================================== */}
      <div className="hero-navigation">
        {["Event", "Portrait", "Brand", "Automotive"].map((item, index) => (
          <button
            key={item}
            type="button"
            className={activeSlide === index ? "active" : ""}
            onClick={() => goToSlide(index)}
          >
            <span>#{String(index + 1).padStart(2, "0")}</span>
            <p>{item}</p>
          </button>
        ))}
      </div>

      {/* =====================================
          SLIDER DOTS
      ===================================== */}
      <div className="hero-dots">
        {heroSlides.map((slide, index) => (
          <button
            key={slide.id || index}
            type="button"
            aria-label={`Slide ${index + 1}`}
            className={activeSlide === index ? "active" : ""}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </section>
  );
}

export default Hero;