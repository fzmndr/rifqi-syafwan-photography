import { Mail, Phone, MapPin, Send } from "lucide-react";
import { motion } from "framer-motion";
import { siteConfig } from "../data/siteData";
import { createWhatsAppLink } from "../utils/whatsapp";

function Contact() {
  return (
    <section className="contact-section" id="contact">
      <div className="section-inner contact-grid">
        <motion.div
          className="contact-info"
          initial={{ y: 55, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="section-label">Contact</p>

          <h2>Let’s Talk About Your Next Session</h2>

          <p>
            Tell me about your concept, date, location, and photography needs.
            I’ll help you create a clean and cinematic visual direction.
          </p>

          <div className="contact-details">
            <a href={`mailto:${siteConfig.email}`}>
              <Mail size={18} />
              {siteConfig.email}
            </a>

            <a href={`tel:${siteConfig.phoneRaw}`}>
              <Phone size={18} />
              {siteConfig.phone}
            </a>

            <span>
              <MapPin size={18} />
              {siteConfig.location}
            </span>
          </div>
        </motion.div>

        <motion.form
          className="contact-form"
          initial={{ y: 55, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.12, ease: "easeOut" }}
          onSubmit={(e) => {
            e.preventDefault();

            const form = e.currentTarget;
            const name = form.name.value;
            const service = form.service.value;
            const message = form.message.value;

            const text = `Halo Rifqi Syafwan, saya ${name}. Saya tertarik untuk booking ${service}. ${message}`;
            const url = createWhatsAppLink(text);

            window.open(url, "_blank");
          }}
        >
          <div className="form-group">
            <label>Your Name</label>
            <input type="text" name="name" placeholder="Your name" required />
          </div>

          <div className="form-group">
            <label>Service</label>

            <select name="service" required>
              <option value="Wedding Photography">Wedding Photography</option>
              <option value="Portrait Session">Portrait Session</option>
              <option value="Event Documentation">Event Documentation</option>
              <option value="Automotive Photography">
                Automotive Photography
              </option>
              <option value="Brand Photography">Brand Photography</option>
            </select>
          </div>

          <div className="form-group">
            <label>Message</label>

            <textarea
              name="message"
              rows="5"
              placeholder="Tell me about your concept..."
              required
            ></textarea>
          </div>

          <button data-cursor="SEND">
            Send via WhatsApp
            <Send size={17} />
          </button>
        </motion.form>
      </div>
    </section>
  );
}

export default Contact;