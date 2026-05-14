import { motion } from "framer-motion";
import { Heart, Camera, CalendarDays, Car } from "lucide-react";

const updatedServices = [
  {
    icon: Heart,
    title: "Wedding",
    desc: "Timeless wedding photography with cinematic emotion and natural storytelling.",
  },
  {
    icon: Camera,
    title: "Portrait",
    desc: "Clean and expressive portrait sessions for personal or professional needs.",
  },
  {
    icon: CalendarDays,
    title: "Event",
    desc: "Capturing important moments with detail, mood, and atmosphere.",
  },
  {
    icon: Car,
    title: "Automotive",
    desc: "Premium automotive photography for brands, catalogs, and campaigns.",
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
          {updatedServices.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div
                className="service-card"
                key={service.title}
                initial={{ y: 70, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
              >
                <div className="service-icon">
                  <Icon size={26} />
                </div>

                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Services;