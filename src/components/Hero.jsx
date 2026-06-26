import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { heroSlides } from "../data/heroData";

function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  /* ==============================
     PRELOAD IMAGE
  ============================== */

  useEffect(() => {
    heroSlides.forEach((slide) => {
      const image = new Image();
      image.src = slide.image;
    });
  }, []);

  /* ==============================
     AUTO SLIDER
  ============================== */

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) =>
        prev === heroSlides.length - 1 ? 0 : prev + 1
      );
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  /* ==============================
     CURRENT SLIDE
  ============================== */

  const currentSlide = useMemo(() => {
    return (
      heroSlides[activeSlide] || {
        image: "",
        label: "Photography",
        title:
          "Documenting moments and creating visuals that tell stories.",
        description:
          "I create, explore, and turn ideas into visuals.",
      }
    );
  }, [activeSlide]);

  return (
    <section className="hero" id="home">

      {/* Background */}

      <AnimatePresence mode="wait">

        <motion.img
          key={currentSlide.image}
          src={currentSlide.image}
          alt={currentSlide.title}
          className="hero-img"
          loading="eager"
          fetchPriority="high"
          draggable={false}
          initial={{
            opacity: 0,
            scale: 1.05,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            scale: 1.03,
          }}
          transition={{
            duration: 0.8,
          }}
        />

      </AnimatePresence>

      {/* Overlay */}

      <div className="hero-overlay"></div>

      {/* Content */}

      <div className="hero-content">

        {/* LEFT */}

        <motion.div
          className="hero-left"
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: .8,
          }}
        >

          <p className="eyebrow">
            Hey, I'm a
          </p>

          <h1>
            Photographer
          </h1>

          <motion.a
            href="#portfolio"
            className="floating-cta"
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: .95,
            }}
          >
            View Portfolio

            <ArrowRight size={18} />

          </motion.a>

        </motion.div>

        {/* RIGHT */}

        <AnimatePresence mode="wait">

          <motion.div
            key={activeSlide}
            className="hero-right"
            initial={{
              opacity: 0,
              x: 30,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: -30,
            }}
            transition={{
              duration: .45,
            }}
          >

            <span className="hero-slide-label">
              {currentSlide.label}
            </span>

            <h2>
              {currentSlide.title}
            </h2>

            <p>
              {currentSlide.description}
            </p>

          </motion.div>

        </AnimatePresence>

      </div>

      {/* Bottom Navigation */}

      <motion.div
        className="hero-bottom"
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: .3,
        }}
      >

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
            onClick={() => setActiveSlide(index)}
          >

            <span>
              #{String(index + 1).padStart(2, "0")}
            </span>

            <p>
              {item}
            </p>

          </button>

        ))}

      </motion.div>

      {/* Dots */}

      <div className="hero-slider-dots">

        {heroSlides.map((slide, index) => (

          <button
            key={slide.id || index}
            type="button"
            className={
              activeSlide === index
                ? "active"
                : ""
            }
            onClick={() => setActiveSlide(index)}
          />

        ))}

      </div>

    </section>
  );
}

export default Hero;