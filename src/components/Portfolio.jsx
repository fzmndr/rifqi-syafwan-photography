import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { portfolioItems } from "../data/portfolioData";
import { createWhatsAppLink } from "../utils/whatsapp";

const portfolioCategories = ["All", "Portrait", "Brand", "Automotive"];

function normalizeCategory(category) {
  if (!category) return "Portrait";
  const value = category.toLowerCase();
  if (value.includes("wedding") || value.includes("portrait") || value.includes("event")) return "Portrait";
  if (value.includes("brand")) return "Brand";
  if (value.includes("product") || value.includes("automotive")) return "Automotive";
  return category;
}

// Fungsi pembantu agar gambar pasti terbaca di Vercel / Vite
const getImageUrl = (path) => {
  if (!path) return "";
  // Menghilangkan garis miring di awal (jika ada) lalu menggabungkan dengan BASE_URL
  const cleanPath = path.replace(/^\//, "");
  return `${import.meta.env.BASE_URL}${cleanPath}`;
};

function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);
  
  // State untuk menyimpan index slide aktif dari *setiap* project card
  const [feedSlides, setFeedSlides] = useState({});
  const [lightboxSlideIndex, setLightboxSlideIndex] = useState(0);

  // 1. DATA SUDAH RAPI DARI portfolioData.js, HANYA PERLU NORMALISASI KATEGORI
  const normalizedProjects = useMemo(() => {
    return portfolioItems.map((item) => ({
      ...item,
      category: normalizeCategory(item.category),
      title: item.title?.toUpperCase().includes("WEDDING") 
        ? item.title.replace(/WEDDING/gi, "Portrait") 
        : item.title,
      service: item.service?.toUpperCase().includes("WEDDING") 
        ? item.service.replace(/wedding/gi, "Portrait") 
        : item.service,
      // Memastikan images selalu array
      images: Array.isArray(item.images) ? item.images : []
    }));
  }, []);

  // 2. FILTER DATA berdasarkan kategori aktif
  const filteredProjects = useMemo(() => {
    return activeCategory === "All"
      ? normalizedProjects
      : normalizedProjects.filter((project) => project.category === activeCategory);
  }, [activeCategory, normalizedProjects]);

  const selectedProject = selectedProjectIndex !== null ? filteredProjects[selectedProjectIndex] : null;

  // Reset state saat kategori berubah
  useEffect(() => {
    setFeedSlides({});
    setSelectedProjectIndex(null);
  }, [activeCategory]);

  // Handle Scroll di Card
  const handleFeedScroll = (projectId, event) => {
    const { scrollLeft, clientWidth } = event.currentTarget;
    const currentSlide = Math.round(scrollLeft / clientWidth);
    setFeedSlides((prev) => ({ ...prev, [projectId]: currentSlide }));
  };

  const scrollFeedCard = (projectId, direction, totalImages, elementRef) => {
    if (!elementRef) return;
    const clientWidth = elementRef.clientWidth;
    const currentSlide = feedSlides[projectId] || 0;
    
    let targetSlide = direction === "next" ? currentSlide + 1 : currentSlide - 1;
    if (targetSlide < 0 || targetSlide >= totalImages) return;

    elementRef.scrollTo({ left: targetSlide * clientWidth, behavior: "smooth" });
  };

  // --- LIGHTBOX SYSTEM ---
  const closeLightbox = () => setSelectedProjectIndex(null);

  const openLightbox = (projectIndex) => {
    setSelectedProjectIndex(projectIndex);
    const currentProject = filteredProjects[projectIndex];
    setLightboxSlideIndex(feedSlides[currentProject.id] || 0);
  };

  const nextLightboxSlide = () => {
    if (!selectedProject) return;
    setLightboxSlideIndex((prev) => (prev === selectedProject.images.length - 1 ? 0 : prev + 1));
  };

  const prevLightboxSlide = () => {
    if (!selectedProject) return;
    setLightboxSlideIndex((prev) => (prev === 0 ? selectedProject.images.length - 1 : prev - 1));
  };

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedProjectIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevLightboxSlide();
      if (e.key === "ArrowRight") nextLightboxSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProjectIndex, selectedProject]);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", selectedProjectIndex !== null);
    return () => document.body.classList.remove("no-scroll");
  }, [selectedProjectIndex]);

  return (
    <section className="portfolio-section" id="portfolio">
      <div className="section-inner">
        
        <motion.div className="portfolio-header" initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }}>
          <div>
            <p className="section-label">Instagram Feed Style</p>
            <h2>Featured Portfolio</h2>
          </div>
          <div className="portfolio-filter">
            {portfolioCategories.map((category) => (
              <button
                type="button" key={category}
                onClick={() => setActiveCategory(category)}
                className={activeCategory === category ? "active" : ""}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="instagram-feed-grid">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, projectIdx) => {
              const currentActiveSlide = feedSlides[project.id] || 0;
              let trackRef = null; 

              return (
                <motion.article
                  layout
                  className="instagram-post-card"
                  key={project.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="post-header-info">
                    <div className="avatar-placeholder">RS</div>
                    <div>
                      <h4>{project.title}</h4>
                      <p>{project.location} • {project.year}</p>
                    </div>
                    <span className="post-category-tag">{project.category}</span>
                  </div>

                  <div className="post-media-container">
                    {currentActiveSlide > 0 && (
                      <button className="post-arrow arrow-left" onClick={() => scrollFeedCard(project.id, "prev", project.images.length, trackRef)}>
                        <ChevronLeft size={18} />
                      </button>
                    )}

                    <div className="post-media-track" ref={(el) => { trackRef = el; }} onScroll={(e) => handleFeedScroll(project.id, e)}>
                      {project.images.map((imgUrl, imgIdx) => (
                        <div className="post-media-slide" key={imgIdx} onClick={() => openLightbox(projectIdx)}>
                          {/* MENGGUNAKAN GET IMAGE URL AGAR TERBACA DI VERCEL */}
                          <img src={getImageUrl(imgUrl)} alt={`${project.title} slide ${imgIdx + 1}`} loading="lazy" />
                        </div>
                      ))}
                    </div>

                    {currentActiveSlide < project.images.length - 1 && (
                      <button className="post-arrow arrow-right" onClick={() => scrollFeedCard(project.id, "next", project.images.length, trackRef)}>
                        <ChevronRight size={18} />
                      </button>
                    )}

                    {project.images.length > 1 && (
                      <div className="post-counter-badge">
                        {currentActiveSlide + 1}/{project.images.length}
                      </div>
                    )}
                  </div>

                  {project.images.length > 1 && (
                    <div className="post-dots-pagination">
                      {project.images.map((_, dotIdx) => (
                        <span key={dotIdx} className={`feed-dot ${currentActiveSlide === dotIdx ? "active" : ""}`} />
                      ))}
                    </div>
                  )}

                  <div className="post-caption-area">
                    <p><strong>{project.title}</strong> {project.desc}</p>
                    <button className="view-details-btn" onClick={() => openLightbox(projectIdx)}>
                      View project details <ArrowUpRight size={14} />
                    </button>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeLightbox}>
            <button type="button" className="lightbox-close" onClick={closeLightbox}><X size={22} /></button>
            
            {selectedProject.images.length > 1 && (
              <>
                <button type="button" className="lightbox-nav lightbox-prev" onClick={(e) => { e.stopPropagation(); prevLightboxSlide(); }}>
                  <ChevronLeft size={26} />
                </button>
                <button type="button" className="lightbox-nav lightbox-next" onClick={(e) => { e.stopPropagation(); nextLightboxSlide(); }}>
                  <ChevronRight size={26} />
                </button>
              </>
            )}

            <motion.div className="lightbox-card" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }} onClick={(e) => e.stopPropagation()}>
              <div className="lightbox-image-wrap">
                {/* MENGGUNAKAN GET IMAGE URL UNTUK LIGHTBOX */}
                <img src={getImageUrl(selectedProject.images[lightboxSlideIndex])} alt={selectedProject.title} />
                {selectedProject.images.length > 1 && (
                  <div className="lightbox-counter">
                    {lightboxSlideIndex + 1} / {selectedProject.images.length}
                  </div>
                )}
              </div>

              <div className="lightbox-content">
                <span>{selectedProject.category}</span>
                <h3>{selectedProject.title}</h3>
                <p>{selectedProject.desc}</p>

                <div className="project-meta">
                  <div><small>Year</small><strong>{selectedProject.year}</strong></div>
                  <div><small>Location</small><strong>{selectedProject.location}</strong></div>
                  <div><small>Service</small><strong>{selectedProject.service}</strong></div>
                </div>

                <a href={createWhatsAppLink(`Halo Rifqi Syafwan, saya tertarik membuat sesi foto seperti project ${selectedProject.title}.`)} target="_blank" rel="noreferrer" className="lightbox-cta-btn">
                  Book Similar Session <ArrowUpRight size={17} />
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