import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

function About() {
  return (
    <section className="about-section" id="about">
      <div className="section-inner about-grid">
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="section-label">Behind the Lens</p>
          <h2>Shaping Moments That Make Life Timeless</h2>
        </motion.div>

        <motion.div
          className="about-text"
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
        >
          <p>
            I'm a photographer focused on creating clean, cinematic, and
            emotional visuals that help people remember their most meaningful
            moments.
          </p>

          <span>Let's Build Something Meaningful Together</span>

          <a href="#contact" className="small-button">
            Get in touch
            <ArrowRight size={15} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default About;