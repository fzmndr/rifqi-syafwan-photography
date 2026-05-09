import { motion } from "framer-motion";

const processItems = [
  {
    number: "01",
    title: "Consultation",
    desc: "We discuss your concept, mood, location, and visual direction before the shoot.",
  },
  {
    number: "02",
    title: "Photo Session",
    desc: "A comfortable shooting experience with guided poses, lighting, and composition.",
  },
  {
    number: "03",
    title: "Editing",
    desc: "Every selected photo is carefully edited with cinematic tones and clean detail.",
  },
  {
    number: "04",
    title: "Delivery",
    desc: "Final high-resolution photos are delivered digitally and ready to use.",
  },
];

function Process() {
  return (
    <section className="process-section">
      <div className="section-inner">
        <motion.div
          className="services-header"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="section-label">How It Works</p>
          <h2>Creative Process</h2>
        </motion.div>

        <div className="process-list">
          {processItems.map((item, index) => (
            <motion.div
              className="process-item"
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.75,
                delay: index * 0.08,
                ease: "easeOut",
              }}
            >
              <span>{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Process;