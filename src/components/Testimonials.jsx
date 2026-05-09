import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { testimonials } from "../data/testimonialsData";

function Testimonials() {
  return (
    <section className="testimonials-section">
      <div className="section-inner">
        <motion.div
          className="services-header"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="section-label">Client Words</p>
          <h2>What They Say</h2>
        </motion.div>

        <div className="testimonial-grid">
          {testimonials.map((item, index) => (
            <motion.article
              className="testimonial-card"
              key={index}
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.75,
                delay: index * 0.1,
                ease: "easeOut",
              }}
            >
              <div className="stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>

              <p>"{item.text}"</p>

              <div>
                <h3>{item.name}</h3>
                <span>{item.role}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;