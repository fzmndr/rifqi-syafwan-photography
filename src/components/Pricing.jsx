import { Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { createWhatsAppLink } from "../utils/whatsapp";

const packages = [
  {
    name: "Portrait",
    price: "Rp750K",
    desc: "Perfect for personal profile, graduation, or creative portrait session.",
    features: ["1 Hour Session", "15 Edited Photos", "Online Gallery", "1 Location"],
  },
  {
    name: "Wedding",
    price: "Rp3.5JT",
    desc: "Elegant wedding coverage for timeless and emotional memories.",
    features: ["Full Day Coverage", "150+ Edited Photos", "Online Gallery", "Highlight Moments"],
    popular: true,
  },
  {
    name: "Brand",
    price: "Rp1.5JT",
    desc: "Premium visuals for product, business, campaign, and personal brand.",
    features: ["2 Hours Session", "30 Edited Photos", "Creative Direction", "Commercial Use"],
  },
];

function Pricing() {
  return (
    <section className="pricing-section" id="pricing">
      <div className="section-inner">
        <motion.div
          className="services-header"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="section-label">Packages</p>
          <h2>Photography Pricing</h2>
        </motion.div>

        <div className="pricing-grid">
          {packages.map((item, index) => (
            <motion.article
              className={`pricing-card ${item.popular ? "popular" : ""}`}
              key={index}
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.75, delay: index * 0.1, ease: "easeOut" }}
            >
              {item.popular && <span className="popular-badge">Most Popular</span>}

              <h3>{item.name}</h3>
              <h4>{item.price}</h4>
              <p>{item.desc}</p>

              <ul>
                {item.features.map((feature, i) => (
                  <li key={i}>
                    <Check size={17} />
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href={createWhatsAppLink(
                `Halo Rifqi Syafwan, saya tertarik dengan paket ${item.name} seharga ${item.price}.`
                )}
                target="_blank"
                rel="noreferrer"
              >
                Choose Package
                <ArrowRight size={17} />
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Pricing;