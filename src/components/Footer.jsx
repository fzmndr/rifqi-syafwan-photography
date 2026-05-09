import { ArrowRight, Mail, Phone } from "lucide-react";

function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="section-inner footer-grid">
        <div>
          <h2>Rifqi Syafwan</h2>
          <p>
            Premium photography portfolio for wedding, portrait, event, and brand
            storytelling.
          </p>
        </div>

        <div className="footer-contact">
          <a href="mailto:hello@rifqisyafwan.com">
            <Mail size={18} />
            hello@rifqisyafwan.com
          </a>

          <a href="tel:+6281234567890">
            <Phone size={18} />
            +62 812 3456 7890
          </a>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
          >
            <span className="ig-text">IG</span>
            Instagram
          </a>
        </div>

        <a
          href="https://wa.me/6281234567890"
          target="_blank"
          rel="noreferrer"
          className="footer-button"
        >
          Book a Session
          <ArrowRight size={17} />
        </a>
      </div>

      <p className="copyright">
        © 2026 Rifqi Syafwan Photography. All Rights Reserved.
      </p>
    </footer>
  );
}

export default Footer;