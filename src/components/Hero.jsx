import "./Hero.css";

import { useCallback, useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { heroSlides } from "../data/heroData";

function Hero() {

  /* ==========================================================
      STATE
  ========================================================== */

  const [activeSlide, setActiveSlide] = useState(0);

  const [isPaused, setIsPaused] = useState(false);

  const totalSlides = heroSlides?.length ?? 0;

  /* ==========================================================
      PRELOAD IMAGES
  ========================================================== */

  useEffect(() => {

    heroSlides.forEach(({ image }) => {

      const img = new Image();

      img.src = image;

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

  useEffect(() => {

    if(isPaused) return;

    const interval = setInterval(nextSlide,5000);

    return () => clearInterval(interval);

},[nextSlide,isPaused]);

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

  const currentSlide =
    heroSlides[activeSlide] ??
    heroSlides[0] ??
    {};

  /* ==========================================================
      RENDER
  ========================================================== */

  const { scrollY } = useScroll();
  const overlayOpacity = useTransform(
    scrollY,
    [0, 500],
    [1, 0.75]
  );

const isMobile = window.innerWidth <= 768;

const imageY = useTransform(
    scrollY,
    [0,800],
    [0,isMobile ? 0 : 120]
);

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
      src={currentSlide.image || ""}
      alt={currentSlide.label || ""}
      className="hero-img"
      draggable={false}
      loading="eager"
      fetchPriority="high"
      style={{
          y: imageY
      }}
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
      decoding="async"
      
    />
  </AnimatePresence>

  {/* ======================================
      DARK OVERLAY
  ====================================== */}

  <motion.div
    className="hero-overlay"
    style={{
        opacity: overlayOpacity
    }}
  />

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
        Selected Visual Storyteller
      </p>

      <h1 className="hero-title">
        Crafting Visuals
        <br />
        That Feel Alive
      </h1>
      <p className="hero-description">
        I'm a photographer focused on creating clean, emotional, and story-driven imagery that people truly connect with.
      </p>

      <motion.a
        href="#portfolio"
        className="hero-button"
        data-cursor="OPEN"

        whileHover={{
          scale: 1.05,
        }}
        whileTap={{
          scale: 0.96,
        }}
        whileFocus={{
            scale:1.03
        }}
      >
        <span>
          Get in Touch
        </span>

        <ArrowRight size={18} />
      </motion.a>

    </motion.div>

    
  </div>      {/* ======================================
          HERO NAVIGATION
      ====================================== */}

      <nav
            className="hero-navigation"
            aria-label="Hero Navigation"
        >

        {heroSlides.map((slide, index) => (

          <button
            key={`${slide.label}-${index}`}
            type="button"
            className={activeSlide === index ? "active" : ""}
            onClick={() => goToSlide(index)}
          >

            <span className="hero-nav-number">
              #{String(index + 1).padStart(2, "0")}
            </span>

            <span className="hero-nav-title">
              {slide.label}
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
            key={`${slide.label}-${index}`}
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