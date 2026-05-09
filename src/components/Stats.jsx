import { motion } from "framer-motion";

const stats = [
  {
    number: "120+",
    label: "Projects Completed",
  },
  {
    number: "80+",
    label: "Happy Clients",
  },
  {
    number: "6+",
    label: "Years Experience",
  },
  {
    number: "15K+",
    label: "Photos Delivered",
  },
];

function Stats() {
  return (
    <section className="stats-section">
      <div className="section-inner stats-grid">
        {stats.map((item, index) => (
          <motion.div
            className="stat-card"
            key={index}
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.7,
              delay: index * 0.1,
              ease: "easeOut",
            }}
          >
            <h3>{item.number}</h3>
            <p>{item.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Stats;