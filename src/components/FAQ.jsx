import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "How long does photo editing take?",
    answer: "Usually around 3–7 working days depending on the package and number of selected photos.",
  },
  {
    question: "Can I choose the location?",
    answer: "Yes. You can choose your own location, or we can recommend a suitable spot based on your concept.",
  },
  {
    question: "Do you provide wedding packages?",
    answer: "Yes. Wedding packages include full-day coverage, edited photos, and online gallery delivery.",
  },
  {
    question: "How do I book a session?",
    answer: "You can contact directly through WhatsApp, Instagram, or the contact form on this website.",
  },
];

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="faq-section">
      <div className="section-inner faq-grid">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="section-label">Questions</p>
          <h2>Frequently Asked Questions</h2>
        </motion.div>

        <div className="faq-list">
          {faqs.map((item, index) => (
            <motion.div
              className={`faq-item ${activeIndex === index ? "active" : ""}`}
              key={index}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.65, delay: index * 0.08, ease: "easeOut" }}
            >
              <button type="button" onClick={() => setActiveIndex(activeIndex === index ? null : index)}>
                <span>{item.question}</span>
                {activeIndex === index ? <Minus size={18} /> : <Plus size={18} />}
              </button>

              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;