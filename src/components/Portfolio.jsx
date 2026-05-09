import { useState } from "react";
import photo1 from "../assets/photo-1.jpg";
import photo2 from "../assets/photo-2.jpg";
import photo3 from "../assets/photo-3.jpg";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";

const portfolioItems = [
  {
    id: 1,
    image: photo1,
    title: "Elegant Wedding",
    category: "Wedding",
    desc: "A cinematic wedding story captured with warm tones, intimate details, and timeless emotion.",
  },
  {
    id: 2,
    image: photo2,
    title: "Creative Portrait",
    category: "Portrait",
    desc: "A clean portrait session focused on personality, mood, lighting, and visual confidence.",
  },
  {
    id: 3,
    image: photo3,
    title: "Brand Visual",
    category: "Brand",
    desc: "Premium brand photography crafted for campaigns, product identity, and digital presence.",
  },
];

const categories = ["All", "Wedding", "Portrait", "Brand"];

function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems =
    activeCategory === "All"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory);

  return (
    <section className="portfolio-section" id="portfolio">
      <div className="section-inner">
        <motion.div
          className="portfolio-header"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div>
            <p className="section-label">Selected Works</p>
            <h2>Featured Portfolio</h2>
          </div>

          <div className="portfolio-filter">
            {categories.map((category) => (
              <button
                type="button"
                key={category}
                onClick={() => setActiveCategory(category)}
                className={activeCategory === category ? "active" : ""}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div layout className="portfolio-grid">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.article
                layout
                className="portfolio-card"
                key={item.id}
                initial={{ y: 70, opacity: 0, scale: 0.96 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 30, opacity: 0, scale: 0.94 }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.08,
                  ease: "easeOut",
                }}
                onClick={() => setSelectedItem(item)}
              >
                <img src={item.image} alt={item.title} loading="lazy" />

                <div className="portfolio-info">
                  <span>{item.category}</span>
                  <h3>{item.title}</h3>
                </div>

                <button type="button" className="portfolio-open">
                  <ArrowUpRight size={18} />
                </button>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="portfolio-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              className="portfolio-modal-card"
              initial={{ y: 60, scale: 0.96, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 40, scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="modal-close"
                onClick={() => setSelectedItem(null)}
              >
                <X size={20} />
              </button>

              <img src={selectedItem.image} alt={selectedItem.title} />

              <div className="modal-content">
                <span>{selectedItem.category}</span>
                <h3>{selectedItem.title}</h3>
                <p>{selectedItem.desc}</p>

                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noreferrer"
                >
                  Book Similar Session
                  <ArrowUpRight size={17} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Portfolio;