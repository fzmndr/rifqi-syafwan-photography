import heroImage from "../assets/hero.jpg";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

function Hero() {
  return (
    <section className="hero" id="home">
      <motion.img
        src={heroImage}
        alt="Rifqi Syafwan Photography"
        className="hero-img"
        initial={{ scale: 1.12, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
      />

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
            Visual <br />
            Storyteller
          </h1>
        </motion.div>

        <motion.div
          className="hero-right"
          initial={{ y: 45, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 2.1, ease: "easeOut" }}
        >
          <h2>Great photography should feel unforgettable.</h2>
          <p>
            From wedding to brand visuals, I capture honest moments with
            cinematic light, emotion, and timeless composition.
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
          <p>Wedding Photography</p>
        </div>

        <div>
          <span>#02</span>
          <p>Portrait Session</p>
        </div>

        <div>
          <span>#03</span>
          <p>Brand Visual</p>
        </div>

        <div>
          <span>#04</span>
          <p>Creative Direction</p>
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;