import "./Hero.css";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { heroSlides } from "../data/heroData";

function Hero() {

  /* ==========================================================
      STATE
  ========================================================== */

  const [activeSlide, setActiveSlide] = useState(0);

  const [isPaused, setIsPaused] = useState(false);

  const totalSlides = heroSlides.length;

  const intervalRef = useRef(null);

  /* ==========================================================
      PRELOAD IMAGES
  ========================================================== */

  useEffect(() => {

    heroSlides.forEach((slide) => {

      const img = new Image();

      img.src = slide.image;

    });

  }, []);

  /* ==========================================================
      SLIDER FUNCTIONS
  ========================================================== */

  const nextSlide = useCallback(() => {

    setActiveSlide((prev) =>

      prev === totalSlides - 1
        ? 0
        : prev + 1

    );

  }, [totalSlides]);

  const prevSlide = useCallback(() => {

    setActiveSlide((prev) =>

      prev === 0
        ? totalSlides - 1
        : prev - 1

    );

  }, [totalSlides]);

  const goToSlide = useCallback((index) => {

    setActiveSlide(index);

  }, []);

  /* ==========================================================
      AUTO PLAY
  ========================================================== */

  useEffect(() => {

    if (isPaused) return;

    intervalRef.current = setInterval(() => {

      nextSlide();

    }, 5000);

    return () => clearInterval(intervalRef.current);

  }, [nextSlide, isPaused]);

  /* ==========================================================
      KEYBOARD SUPPORT
  ========================================================== */

  useEffect(() => {

    const handleKey = (e) => {

      if (e.key === "ArrowRight") {

        nextSlide();

      }

      if (e.key === "ArrowLeft") {

        prevSlide();

      }

    };

    window.addEventListener("keydown", handleKey);

    return () => {

      window.removeEventListener("keydown", handleKey);

    };

  }, [nextSlide, prevSlide]);

  /* ==========================================================
      CURRENT SLIDE
  ========================================================== */

  const currentSlide = heroSlides[activeSlide];

  /* ==========================================================
      RENDER
  ========================================================== */

  return (
    <section
  className="hero"
  id="home"
  onMouseEnter={() => setIsPaused(true)}
  onMouseLeave={() => setIsPaused(false)}
>
  {/* ======================================
      BACKGROUND IMAGE
  ====================================== */}

  <AnimatePresence mode="wait">
    <motion.img
      key={currentSlide.image}
      src={currentSlide.image}
      alt={currentSlide.label}
      className="hero-img"
      draggable={false}
      loading="eager"
      fetchPriority="high"
      initial={{
        opacity: 0,
        scale: 1.08,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        scale: 1.04,
      }}
      transition={{
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      }}
    />
  </AnimatePresence>

  {/* ======================================
      DARK OVERLAY
  ====================================== */}

  <div className="hero-overlay" />

  {/* ======================================
      HERO CONTENT
  ====================================== */}

  <div className="hero-container">

    {/* ============================
        LEFT
    ============================ */}

    <motion.div
      className="hero-left"
      initial={{
        opacity: 0,
        y: 40,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.8,
      }}
    >

      <p className="hero-eyebrow">
        Hey, I'm a
      </p>

      <h1 className="hero-title">
          Photo
          <span>grapher</span>
      </h1>

      <motion.a
        href="#portfolio"
        className="hero-button"
        whileHover={{
          scale: 1.05,
        }}
        whileTap={{
          scale: 0.96,
        }}
      >
        <span>
          View Portfolio
        </span>

        <ArrowRight size={18} />
      </motion.a>

    </motion.div>

    {/* ============================
        RIGHT CARD
    ============================ */}

    <AnimatePresence mode="wait">

      <motion.div
        key={activeSlide}
        className="hero-card"
        initial={{
          opacity: 0,
          x: 35,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        exit={{
          opacity: 0,
          x: -35,
        }}
        transition={{
          duration: 0.45,
        }}
      >

        <span className="hero-card-label">
          {currentSlide.label}
        </span>

        <h2 className="hero-card-title">
          {currentSlide.title}
        </h2>

        <p className="hero-card-description">
          {currentSlide.description}
        </p>

      </motion.div>

    </AnimatePresence>

  </div>      {/* ======================================
          HERO NAVIGATION
      ====================================== */}

      <nav className="hero-navigation">

        {[
          "Event",
          "Portrait",
          "Brand",
          "Automotive",
        ].map((item, index) => (

          <button
            key={item}
            type="button"
            className={
              activeSlide === index
                ? "active"
                : ""
            }
            onClick={() => goToSlide(index)}
          >

            <span className="hero-nav-number">
              #{String(index + 1).padStart(2, "0")}
            </span>

            <span className="hero-nav-title">
              {item}
            </span>

          </button>

        ))}

      </nav>

      {/* ======================================
          PROGRESS BAR
      ====================================== */}

      <div className="hero-progress"
      aria-label="Hero slide navigation"
      >

        {heroSlides.map((slide, index) => (

          <button
            key={slide.id}
            type="button"
            aria-label={`Slide ${index + 1}`}
            className={
              activeSlide === index
                ? "active"
                : ""
            }
            onClick={() => goToSlide(index)}
          />

        ))}

      </div>

    </section>

  );

}

export default Hero;