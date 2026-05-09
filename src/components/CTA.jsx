import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { createWhatsAppLink } from "../utils/whatsapp";

function CTA() {
  return (
    <section className="cta-section">
      <div className="section-inner">
        <motion.div
          className="cta-card"
          initial={{ y: 70, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <p className="section-label">Ready to Capture?</p>
          <h2>Let’s Create Timeless Visual Stories Together.</h2>
          <p>
            Book your photography session today and turn your meaningful moments
            into cinematic memories.
          </p>

          <a
            href={createWhatsAppLink(
              "Halo Rifqi Syafwan, saya ingin booking sesi photography."
            )}
            target="_blank"
            rel="noreferrer"
          >
            Book a Session
            <ArrowRight size={18} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default CTA;