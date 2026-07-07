import { useEffect, useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { portfolioItems, portfolioCategories } from "../data/portfolioData";
import { createWhatsAppLink } from "../utils/whatsapp";

function normalizeCategory(category) {
  if (!category) return "Portrait";
  const value = category.toLowerCase();
  if (value.includes("wedding") || value.includes("portrait") || value.includes("event")) return "Portrait";
  if (value.includes("brand")) return "Brand";
  if (value.includes("product") || value.includes("automotive")) return "Automotive";
  return category;
}

// ==========================================
// SUB-COMPONENT: Kartu Postingan Individual
// ==========================================
const PostCard = ({ item, onClickViewDetails }) => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const trackRef = useRef(null);

  const handleScroll = () => {
    if (!trackRef.current) return;
    const { scrollLeft, clientWidth } = trackRef.current;
    const index = Math.round(scrollLeft / clientWidth);
    setCurrentImgIndex(index);
  };

  const scrollTrack = (direction, e) => {
    e.stopPropagation(); // Mencegah klik tembus ke detail project
    if (!trackRef.current) return;
    const { clientWidth } = trackRef.current;
    const targetScroll = direction === "next"
      ? trackRef.current.scrollLeft + clientWidth
      : trackRef.current.scrollLeft - clientWidth;

    trackRef.current.scrollTo({ left: targetScroll, behavior: "smooth" });
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      className="instagram-post-card"
    >
      {/* 1. HEADER POST */}
      <div className="post-header-info">
        <div className="avatar-placeholder">RS</div>
        <div>
          <h4>Rifqi Syafwan</h4>
          <p>{item.location}</p>
        </div>
        <div className="post-category-tag">{item.category}</div>
      </div>

      {/* 2. MEDIA CONTAINER (GAMBAR & CAROUSEL) */}
      <div className="post-media-container">
        {/* Badge Hitungan Frame (Kaca) */}
        {item.images.length > 1 && (
          <div className="post-counter-badge">
            {currentImgIndex + 1} / {item.images.length}
          </div>
        )}

        {/* Panah Kiri Kanan (Glassmorphism) */}
        {currentImgIndex > 0 && (
          <button type="button" className="post-arrow arrow-left" onClick={(e) => scrollTrack("prev", e)}>
            <ChevronLeft size={24} />
          </button>
        )}
        
        {currentImgIndex < item.images.length - 1 && (
          <button type="button" className="post-arrow arrow-right" onClick={(e) => scrollTrack("next", e)}>
            <ChevronRight size={24} />
          </button>
        )}

        {/* Track Area */}
        <div className="post-media-track" ref={trackRef} onScroll={handleScroll}>
          {item.images.map((img, idx) => (
            <div className="post-media-slide" key={idx} onClick={onClickViewDetails}>
              <img src={img} alt={`${item.title} - Frame ${idx + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
      </div>

      {/* 3. DOTS PAGINATION (Expanding Style) */}
      {item.images.length > 1 && (
        <div className="post-dots-pagination">
          {item.images.map((_, idx) => (
            <div key={idx} className={`feed-dot ${idx === currentImgIndex ? "active" : ""}`} />
          ))}
        </div>
      )}

      {/* 4. CAPTION & ACTION */}
      <div className="post-caption-area">
        <strong>{item.title}</strong>
        {item.desc}
        <br />
        <button type="button" className="view-details-btn" onClick={onClickViewDetails}>
          VIEW GALLERY <ArrowRight size={16} />
        </button>
      </div>
    </motion.article>
  );
};


// ==========================================
// MAIN COMPONENT: PORTFOLIO
// ==========================================
function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Normalisasi data
  const updatedItems = useMemo(() => {
    return portfolioItems.map((item) => ({
      ...item,
      category: normalizeCategory(item.category),
      title: item.title?.toLowerCase().includes("wedding")
        ? item.title.replace(/wedding/gi, "Portrait")
        : item.title,
      service: item.service?.toLowerCase().includes("wedding")
        ? item.service.replace(/wedding/gi, "Portrait")
        : item.service,
    }));
  }, []);

  // Filter items berdasarkan kategori
  const filteredItems = useMemo(() => {
    return activeCategory === "All"
      ? updatedItems
      : updatedItems.filter((item) => item.category === activeCategory);
  }, [activeCategory, updatedItems]);

  const selectedItem = selectedIndex !== null ? filteredItems[selectedIndex] : null;

  // Navigasi Lightbox
  const closeLightbox = () => setSelectedIndex(null);
  const showPrevious = () => setSelectedIndex((c) => (c === 0 ? filteredItems.length - 1 : c - 1));
  const showNext = () => setSelectedIndex((c) => (c === filteredItems.length - 1 ? 0 : c + 1));

  // Keyboard Event untuk Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrevious();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, filteredItems]);

  // Prevent scroll saat lightbox terbuka
  useEffect(() => {
    document.body.classList.toggle("no-scroll", selectedIndex !== null);
    return () => document.body.classList.remove("no-scroll");
  }, [selectedIndex]);

  return (
    <section className="portfolio-section" id="portfolio">
      <div className="section-inner">
        
        {/* HEADER & FILTER */}
        <motion.div
          className="portfolio-header"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div>
            <p className="section-label" style={{ color: "var(--orange)", fontWeight: 700, letterSpacing: "2px", marginBottom: "8px" }}>
              SELECTED WORKS
            </p>
            <h2 style={{ fontSize: "2.5rem", color: "#fff", margin: 0 }}>My Portfolio Feed</h2>
          </div>

          <div className="portfolio-filter">
            {portfolioCategories.map((category) => (
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

        {/* FEED GRID LAYOUT */}
        <div className="instagram-feed-grid">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <PostCard 
                key={item.id} 
                item={item} 
                onClickViewDetails={() => setSelectedIndex(index)} 
              />
            ))}
          </AnimatePresence>
        </div>

      </div>

      {/* LIGHTBOX MODAL (Tetap dipertahankan untuk melihat full gallery) */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <button type="button" className="lightbox-close" onClick={closeLightbox}>
              <X size={24} />
            </button>

            <button type="button" className="lightbox-nav lightbox-prev" onClick={(e) => { e.stopPropagation(); showPrevious(); }}>
              <ChevronLeft size={32} />
            </button>

            <button type="button" className="lightbox-nav lightbox-next" onClick={(e) => { e.stopPropagation(); showNext(); }}>
              <ChevronRight size={32} />
            </button>

            <motion.div
              className="lightbox-card scrollable-lightbox"
              initial={{ y: 50, scale: 0.96, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 40, scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="lightbox-gallery">
                {selectedItem.images.map((img, idx) => (
                  <img key={idx} src={img} alt={`${selectedItem.title} - ${idx + 1}`} loading="lazy" />
                ))}
              </div>

              <div className="lightbox-sidebar">
                <div className="post-header-info" style={{ padding: 0, border: 'none', marginBottom: '24px' }}>
                   <div className="avatar-placeholder">RS</div>
                   <div>
                      <h4 style={{ color: "#111" }}>Rifqi Syafwan</h4>
                      <p style={{ color: "#666" }}>{selectedItem.location}</p>
                   </div>
                </div>
                
                <h3 style={{ color: "#111" }}>{selectedItem.title}</h3>
                <p className="lightbox-desc">{selectedItem.desc}</p>

                <div className="project-meta">
                  <div><small>Category</small><strong>{selectedItem.category}</strong></div>
                  <div><small>Year</small><strong>{selectedItem.year}</strong></div>
                  <div><small>Service</small><strong>{selectedItem.service}</strong></div>
                  <div><small>Total Photos</small><strong>{selectedItem.images.length} Frames</strong></div>
                </div>

                <a
                  href={createWhatsAppLink(`Halo Rifqi, saya tertarik membuat sesi foto seperti project ${selectedItem.title}.`)}
                  target="_blank"
                  rel="noreferrer"
                  className="lightbox-cta-btn"
                >
                  Book This Session <ArrowUpRight size={17} />
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