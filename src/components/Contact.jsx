import { Mail, Phone, MapPin, Send } from "lucide-react";
import { motion } from "framer-motion";

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
            <a href="mailto:hello@rifqisyafwan.com">
              <Mail size={18} />
              hello@rifqisyafwan.com
            </a>

            <a href="tel:+6281234567890">
              <Phone size={18} />
              +62 812 3456 7890
            </a>

            <span>
              <MapPin size={18} />
              Indonesia
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
            const url = `https://wa.me/6281234567890?text=${encodeURIComponent(text)}`;

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
              <option value="Brand/Product Photography">Brand/Product Photography</option>
            </select>
          </div>

          <div className="form-group">
            <label>Message</label>
            <textarea name="message" rows="5" placeholder="Tell me about your concept..." required></textarea>
          </div>

          <button type="submit">
            Send via WhatsApp
            <Send size={17} />
          </button>
        </motion.form>
      </div>
    </section>
  );
}

export default Contact;