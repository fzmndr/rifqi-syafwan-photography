import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { portfolioItems, portfolioCategories } from "../data/portfolioData";
import { createWhatsAppLink } from "../utils/whatsapp";

function normalizeCategory(category) {
  if (!category) return "Portrait";
  const value = category.toLowerCase();
  if (value.includes("wedding") || value.includes("portrait")) return "Portrait";
  if (value.includes("brand")) return "Brand";
  if (value.includes("product") || value.includes("automotive")) return "Automotive";
  return category;
}

function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);
  const [feedSlides, setFeedSlides] = useState({});
  const [lightboxSlideIndex, setLightboxSlideIndex] = useState(0);

  const filteredProjects = useMemo(() => {
    return activeCategory === "All"
      ? portfolioItems
      : portfolioItems.filter((p) => normalizeCategory(p.category) === activeCategory);
  }, [activeCategory]);

  const selectedProject = selectedProjectIndex !== null ? filteredProjects[selectedProjectIndex] : null;

  useEffect(() => {
    setFeedSlides({});
    setSelectedProjectIndex(null);
  }, [activeCategory]);

  const handleFeedScroll = (id, e) => {
    const slide = Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth);
    setFeedSlides((prev) => ({ ...prev, [id]: slide }));
  };

  return (
    <section className="portfolio-section" id="portfolio">
      <div className="section-inner">
        <div className="portfolio-header">
          <h2>Featured Portfolio</h2>
          <div className="portfolio-filter">
            {portfolioCategories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className={activeCategory === cat ? "active" : ""}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="instagram-feed-grid">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.article key={project.id} className="instagram-post-card" layout>
                <div className="post-media-container">
                  <div className="post-media-track" onScroll={(e) => handleFeedScroll(project.id, e)}>
                    {project.images.map((imgSrc, imgIdx) => (
                      <div key={imgIdx} className="post-media-slide" onClick={() => { setSelectedProjectIndex(idx); setLightboxSlideIndex(imgIdx); }}>
                        <img src={imgSrc} alt={project.title} loading="lazy" />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="post-caption-area">
                  <p><strong>{project.title}</strong> {project.desc}</p>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProjectIndex(null)}>
            <button className="lightbox-close" onClick={() => setSelectedProjectIndex(null)}><X /></button>
            <motion.div className="lightbox-card" onClick={(e) => e.stopPropagation()}>
              <img src={selectedProject.images[lightboxSlideIndex]} alt="Project Detail" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Portfolio;