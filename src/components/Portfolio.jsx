import { useEffect, useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { portfolioItems } from "../data/portfolioData";
import { createWhatsAppLink } from "../utils/whatsapp";

const portfolioCategories = ["All", "Portrait", "Brand", "Automotive"];

function normalizeCategory(category) {
  if (!category) return "Portrait";
  const value = category.toLowerCase();
  if (value.includes("wedding")) return "Portrait";
  if (value.includes("portrait")) return "Portrait";
  if (value.includes("brand")) return "Brand";
  if (value.includes("product")) return "Automotive";
  if (value.includes("automotive")) return "Automotive";
  if (value.includes("event")) return "Portrait";
  return category;
}

function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef(null);

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

  // Filter items
  const filteredItems = useMemo(() => {
    return activeCategory === "All"
      ? updatedItems
      : updatedItems.filter((item) => item.category === activeCategory);
  }, [activeCategory, updatedItems]);

  const selectedItem = selectedIndex !== null ? filteredItems[selectedIndex] : null;

  // Reset slide index ketika kategori berubah
  useEffect(() => {
    setCurrentSlide(0);
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = 0;
    }
    setSelectedIndex(null);
  }, [activeCategory]);

  // Handle Deteksi Slide Aktif saat di-scroll/swipe (Fungsi mirip IG)
  const handleScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, clientWidth } = carouselRef.current;
    const index = Math.round(scrollLeft / clientWidth);
    setCurrentSlide(index);
  };

  // Navigasi Tombol Carousel (Kanan/Kiri)
  const scrollCarousel = (direction) => {
    if (!carouselRef.current) return;
    const { clientWidth } = carouselRef.current;
    const targetScroll =
      direction === "next"
        ? carouselRef.current.scrollLeft + clientWidth
        : carouselRef.current.scrollLeft - clientWidth;

    carouselRef.current.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  };

  // Lightbox Navigation
  const closeLightbox = () => setSelectedIndex(null);
  const showPrevious = () => {
    setSelectedIndex((current) => (current === 0 ? filteredItems.length - 1 : current - 1));
  };
  const showNext = () => {
    setSelectedIndex((current) => (current === filteredItems.length - 1 ? 0 : current + 1));
  };

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (selectedIndex === null) return;
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, filteredItems]);

  // Prevent background scroll
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => document.body.classList.remove("no-scroll");
  }, [selectedIndex]);

  return (
    <section className="portfolio-section" id="portfolio">
      <div className="section-inner">
        
        {/* Header & Filter */}
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

        {/* CAROUSEL WRAPPER (Gaya Instagram) */}
        <div className="instagram-carousel-container">
          
          {/* Tombol Navigasi Kiri (Sembunyi jika di slide pertama) */}
          {currentSlide > 0 && (
            <button 
              className="carousel-arrow arrow-left" 
              onClick={() => scrollCarousel("prev")}
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {/* Track Slides */}
          <div 
            className="instagram-carousel-track" 
            ref={carouselRef}
            onScroll={handleScroll}
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => (
                <div className="instagram-slide-item" key={item.id}>
                  <motion.article
                    layout
                    className="portfolio-card"
                    data-cursor="VIEW"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => setSelectedIndex(index)}
                  >
                    <div className="image-container">
                      <img src={item.image} alt={item.title} loading="lazy" />
                      {/* Counter Angka di pojok kanan atas ala IG */}
                      <div className="ig-badge">
                        {index + 1}/{filteredItems.length}
                      </div>
                    </div>

                    <div className="portfolio-info">
                      <span>{item.category}</span>
                      <h3>{item.title}</h3>
                    </div>

                    <button type="button" className="portfolio-open" aria-label="Open project details">
                      <ArrowUpRight size={18} />
                    </button>
                  </motion.article>
                </div>
              ))}
            </AnimatePresence>
          </div>

          {/* Tombol Navigasi Kanan (Sembunyi jika di slide terakhir) */}
          {currentSlide < filteredItems.length - 1 && (
            <button 
              className="carousel-arrow arrow-right" 
              onClick={() => scrollCarousel("next")}
              aria-label="Next slide"
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>

        {/* INSTAGRAM DOTS PAGINATION */}
        <div className="instagram-dots">
          {filteredItems.map((_, index) => (
            <span 
              key={index} 
              className={`dot ${currentSlide === index ? "active" : ""}`}
              onClick={() => {
                if (carouselRef.current) {
                  carouselRef.current.scrollTo({
                    left: index * carouselRef.current.clientWidth,
                    behavior: "smooth"
                  });
                }
              }}
            />
          ))}
        </div>

      </div>

      {/* Lightbox / Detail Project Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <button type="button" className="lightbox-close" onClick={closeLightbox} aria-label="Close lightbox">
              <X size={22} />
            </button>

            <button
              type="button"
              className="lightbox-nav lightbox-prev"
              onClick={(e) => { e.stopPropagation(); showPrevious(); }}
              aria-label="Previous project"
            >
              <ChevronLeft size={26} />
            </button>

            <button
              type="button"
              className="lightbox-nav lightbox-next"
              onClick={(e) => { e.stopPropagation(); showNext(); }}
              aria-label="Next project"
            >
              <ChevronRight size={26} />
            </button>

            <motion.div
              className="lightbox-card"
              initial={{ y: 50, scale: 0.96, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 40, scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="lightbox-image-wrap">
                <img src={selectedItem.image} alt={selectedItem.title} />
                <div className="lightbox-counter">
                  {String(selectedIndex + 1).padStart(2, "0")} / {String(filteredItems.length).padStart(2, "0")}
                </div>
              </div>

              <div className="lightbox-content">
                <span>{selectedItem.category}</span>
                <h3>{selectedItem.title}</h3>
                <p>{selectedItem.desc}</p>

                <div className="project-meta">
                  <div>
                    <small>Year</small>
                    <strong>{selectedItem.year}</strong>
                  </div>
                  <div>
                    <small>Location</small>
                    <strong>{selectedItem.location}</strong>
                  </div>
                  <div>
                    <small>Service</small>
                    <strong>{selectedItem.service}</strong>
                  </div>
                </div>

                <a
                  href={createWhatsAppLink(`Halo Rifqi Syafwan, saya tertarik membuat sesi foto seperti project ${selectedItem.title}.`)}
                  target="_blank"
                  rel="noreferrer"
                  className="lightbox-cta-btn"
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