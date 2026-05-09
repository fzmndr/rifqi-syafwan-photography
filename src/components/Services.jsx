import { Camera, Heart, Sparkles, Aperture } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    icon: <Heart size={26} />,
    title: "Wedding",
    desc: "Timeless wedding photography with cinematic emotion and natural storytelling.",
  },
  {
    icon: <Camera size={26} />,
    title: "Portrait",
    desc: "Clean and expressive portrait sessions for personal or professional needs.",
  },
  {
    icon: <Aperture size={26} />,
    title: "Event",
    desc: "Capturing important moments with detail, mood, and atmosphere.",
  },
  {
    icon: <Sparkles size={26} />,
    title: "Product",
    desc: "Premium product photography for brands, catalogs, and campaigns.",
  },
];

function Services() {
  return (
    <section className="services-section" id="services">
      <div className="section-inner">
        <motion.div
          className="services-header"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="section-label">What I Do</p>
          <h2>Photography Services</h2>
        </motion.div>

        <div className="services-grid">
          {services.map((service, index) => (
            <motion.div
              className="service-card"
              key={index}
              initial={{ y: 70, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: "easeOut",
              }}
            >
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;