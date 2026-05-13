import { ArrowRight, Mail, Phone } from "lucide-react";
import { siteConfig } from "../data/siteData";
import { createWhatsAppLink } from "../utils/whatsapp";

function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="section-inner footer-grid">
        <div>
          <h2>{siteConfig.brandName}</h2>
          <p>{siteConfig.description}</p>
        </div>

        <div className="footer-contact">
          <a href={`mailto:${siteConfig.email}`}>
            <Mail size={18} />
            {siteConfig.email}
          </a>

          <a href={`tel:${siteConfig.phoneRaw}`}>
            <Phone size={18} />
            {siteConfig.phone}
          </a>

          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noreferrer"
          >
            <span className="ig-text">IG</span>
            Instagram
          </a>
        </div>

        <a
          href={createWhatsAppLink("Hello Rifqi Syafwan, I want to book a photo session.")}
          target="_blank"
          rel="noreferrer"
          className="footer-button"
        >
          Book a Session
          <ArrowRight size={17} />
        </a>
      </div>

      <p className="copyright">{siteConfig.copyright}</p>
    </footer>
  );
}

export default Footer;