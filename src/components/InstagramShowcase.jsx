import { Instagram, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { instagramPosts } from "../data/instagramData";
import { siteConfig } from "../data/siteData";

function InstagramShowcase() {
  return (
    <section className="instagram-section">
      <div className="section-inner">
        <motion.div
          className="instagram-header"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div>
            <p className="section-label">Instagram</p>
            <h2>Follow The Latest Visual Stories</h2>
          </div>

          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="instagram-button"
          >
            <Instagram size={18} />
            Follow Instagram
            <ArrowUpRight size={17} />
          </a>
        </motion.div>

        <div className="instagram-grid">
          {instagramPosts.map((post, index) => (
            <motion.a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="instagram-card"
              key={index}
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.75,
                delay: index * 0.07,
                ease: "easeOut",
              }}
            >
              <img src={post.image} alt={post.caption} loading="lazy" />

              <div className="instagram-overlay">
                <Instagram size={24} />
                <span>{post.caption}</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default InstagramShowcase;