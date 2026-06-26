import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { heroSlides } from "../data/heroData";

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) =>
        prev === heroSlides.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const currentSlide = useMemo(() => {
    return (
      heroSlides[activeSlide] || {
        image: "",
        label: "Photography",
        title: "Documenting moments beautifully.",
        description:
          "Capturing authentic moments through timeless visual storytelling.",
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
          initial={{
            opacity: 0,
            scale: 1.12,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            scale: 1.05,
          }}
          transition={{
            duration: 1.1,
          }}
        />

      </AnimatePresence>

      {/* Overlay */}

      <div className="hero-overlay" />

      {/* Gradient */}

      <div className="hero-gradient" />

      {/* Blur */}

      <div className="hero-blur-circle" />

      {/* Content */}

      <div className="hero-content">

        {/* LEFT */}

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
            duration: .8,
          }}
        >

          <span className="hero-small-title">
            VISUAL STORYTELLER
          </span>

          <p className="eyebrow">
            Hey, I'm
          </p>

          <h1>
            Rifqi
            <br />
            Syafwan
          </h1>

          <p className="hero-description">
            Professional photographer specializing in portrait,
            event, commercial branding and automotive photography.
            Creating visuals that connect people with stories.
          </p>

          <div className="hero-buttons">

            <motion.a
              href="#portfolio"
              className="hero-btn primary"
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: .95,
              }}
            >
              View Portfolio

              <ArrowRight
                size={18}
              />

            </motion.a>

            <a
              href="#contact"
              className="hero-btn secondary"
            >
              Contact Me
            </a>

          </div>

        </motion.div>

        {/* RIGHT */}

        <AnimatePresence mode="wait">

          <motion.div
            key={activeSlide}
            className="hero-right"
            initial={{
              opacity: 0,
              x: 40,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: -40,
            }}
            transition={{
              duration: .6,
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

      {/* Bottom */}

      <div className="hero-bottom">

        {[
          "Event",
          "Portrait",
          "Brand",
          "Automotive",
        ].map((item, index) => (

          <div
            key={item}
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

          </div>

        ))}

      </div>

      {/* Dots */}

      <div className="hero-slider-dots">

        {heroSlides.map((_, index) => (

          <button
            key={index}
            onClick={() => setActiveSlide(index)}
            className={
              activeSlide === index
                ? "active"
                : ""
            }
          />

        ))}

      </div>

      {/* Scroll */}

      <div className="scroll-indicator">

        <span />

      </div>

    </section>
  );
}