import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Alya & Raka",
    role: "Wedding Client",
    text: "The photos feel elegant, warm, and very emotional. Every moment was captured beautifully.",
  },
  {
    name: "Nadira Studio",
    role: "Brand Client",
    text: "Rifqi understood the visual direction perfectly. The final images made our brand look premium.",
  },
  {
    name: "Fajar Mahendra",
    role: "Portrait Client",
    text: "The session was relaxed and professional. The result exceeded my expectations.",
  },
];

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
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
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