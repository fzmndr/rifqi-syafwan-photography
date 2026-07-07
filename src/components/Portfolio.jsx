import { useEffect, useState, useMemo, useRef } from "react";
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

function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);
  
  // State untuk menyimpan index slide aktif dari *setiap* project card di feed [{projectId: currentSlideIndex}]
  const [feedSlides, setFeedSlides] = useState({});
  // State untuk melacak slide aktif di dalam Lightbox modal
  const [lightboxSlideIndex, setLightboxSlideIndex] = useState(0);

  // 1. GROUPING DATA: Menggabungkan item berdasarkan judul (Title) menjadi format Postingan Instagram Mulitiple-Images
  const groupedProjects = useMemo(() => {
    const projectsMap = {};

    portfolioItems.forEach((item) => {
      const normalizedTitle = item.title?.toUpperCase() || "UNTITLED";
      
      if (!projectsMap[normalizedTitle]) {
        projectsMap[normalizedTitle] = {
          id: item.id, // Ambil id pertama sebagai key
          title: normalizedTitle.includes("WEDDING") ? normalizedTitle.replace(/WEDDING/gi, "Portrait") : normalizedTitle,
          category: normalizeCategory(item.category),
          year: item.year || "2025",
          service: item.service?.toUpperCase().includes("WEDDING") ? item.service.replace(/wedding/gi, "Portrait") : item.service,
          location: item.location || "Jakarta, Indonesia",
          desc: item.desc,
          images: [item.image] // Tampung semua gambar di sini
        };
      } else {
        // Jika project sudah terdaftar, masukkan gambarnya ke dalam array images
        projectsMap[normalizedTitle].images.push(item.image);
      }
    });

    return Object.values(projectsMap);
  }, []);

  // 2. FILTER DATA berdasarkan kategori aktif
  const filteredProjects = useMemo(() => {
    return activeCategory === "All"
      ? groupedProjects
      : groupedProjects.filter((project) => project.category === activeCategory);
  }, [activeCategory, groupedProjects]);

  const selectedProject = selectedProjectIndex !== null ? filteredProjects[selectedProjectIndex] : null;

  // Reset keadaan slide feed ketika kategori berubah
  useEffect(() => {
    setFeedSlides({});
    setSelectedProjectIndex(null);
  }, [activeCategory]);

  // Handle Deteksi Scroll horizontal pada card feed individual
  const handleFeedScroll = (projectId, event) => {
    const { scrollLeft, clientWidth } = event.currentTarget;
    const currentSlide = Math.round(scrollLeft / clientWidth);
    setFeedSlides((prev) => ({ ...prev, [projectId]: currentSlide }));
  };

  // Navigasi Tombol Card Feed (Kanan/Kiri)
  const scrollFeedCard = (projectId, direction, totalImages, elementRef) => {
    if (!elementRef) return;
    const clientWidth = elementRef.clientWidth;
    const currentSlide = feedSlides[projectId] || 0;
    
    let targetSlide = direction === "next" ? currentSlide + 1 : currentSlide - 1;
    if (targetSlide < 0 || targetSlide >= totalImages) return;

    elementRef.scrollTo({
      left: targetSlide * clientWidth,
      behavior: "smooth",
    });
  };

  // --- LIGHTBOX CAROUSEL SYSTEM ---
  const closeLightbox = () => setSelectedProjectIndex(null);

  const openLightbox = (projectIndex) => {
    setSelectedProjectIndex(projectIndex);
    // Sinkronisasikan slide awal modal sesuai dengan slide terakhir yang dilihat user di feed card
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

  // Navigasi Keyboard untuk Lightbox
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

  // Prevent Body Scroll
  useEffect(() => {
    document.body.classList.toggle("no-scroll", selectedProjectIndex !== null);
    return () => document.body.classList.remove("no-scroll");
  }, [selectedProjectIndex]);

  return (
    <section className="portfolio-section" id="portfolio">
      <div className="section-inner">
        
        {/* Header & Filter */}
        <motion.div className="portfolio-header" initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }}>
          <div>
            <p className="section-label">Instagram Feed Style</p>
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

        {/* FEED GRID (Menampilkan Project Tunggal Berisi Multi-Images) */}
        <div className="instagram-feed-grid">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, projectIdx) => {
              const currentActiveSlide = feedSlides[project.id] || 0;
              let trackRef = null; // Menyimpan referensi element DOM secara inline

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
                  {/* Post Card Header */}
                  <div className="post-header-info">
                    <div className="avatar-placeholder">RS</div>
                    <div>
                      <h4>{project.title}</h4>
                      <p>{project.location} • {project.year}</p>
                    </div>
                    <span className="post-category-tag">{project.category}</span>
                  </div>

                  {/* Post Image Slider Container */}
                  <div className="post-media-container">
                    
                    {/* Tombol Panah Kiri di Media Card */}
                    {currentActiveSlide > 0 && (
                      <button 
                        className="post-arrow arrow-left" 
                        onClick={() => scrollFeedCard(project.id, "prev", project.images.length, trackRef)}
                      >
                        <ChevronLeft size={18} />
                      </button>
                    )}

                    {/* Image Track */}
                    <div 
                      className="post-media-track" 
                      ref={(el) => { trackRef = el; }}
                      onScroll={(e) => handleFeedScroll(project.id, e)}
                    >
                      {project.images.map((imgUrl, imgIdx) => (
                        <div className="post-media-slide" key={imgIdx} onClick={() => openLightbox(projectIdx)}>
                          <img src={imgUrl} alt={`${project.title} slide ${imgIdx + 1}`} loading="lazy" />
                        </div>
                      ))}
                    </div>

                    {/* Tombol Panah Kanan di Media Card */}
                    {currentActiveSlide < project.images.length - 1 && (
                      <button 
                        className="post-arrow arrow-right" 
                        onClick={() => scrollFeedCard(project.id, "next", project.images.length, trackRef)}
                      >
                        <ChevronRight size={18} />
                      </button>
                    )}

                    {/* Badge Angka Kanan Atas ala IG asli */}
                    {project.images.length > 1 && (
                      <div className="post-counter-badge">
                        {currentActiveSlide + 1}/{project.images.length}
                      </div>
                    )}
                  </div>

                  {/* Post Footer Dots Pagination */}
                  {project.images.length > 1 && (
                    <div className="post-dots-pagination">
                      {project.images.map((_, dotIdx) => (
                        <span key={dotIdx} className={`feed-dot ${currentActiveSlide === dotIdx ? "active" : ""}`} />
                      ))}
                    </div>
                  )}

                  {/* Post Caption / Description */}
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

      {/* LIGHTBOX MODAL CAROUSEL */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeLightbox}>
            <button type="button" className="lightbox-close" onClick={closeLightbox}><X size={22} /></button>

            {/* Navigasi Slide Project Sebelum/Sesudah di Lightbox */}
            <button type="button" className="lightbox-nav lightbox-prev" onClick={(e) => { e.stopPropagation(); prevLightboxSlide(); }}>
              <ChevronLeft size={26} />
            </button>
            <button type="button" className="lightbox-nav lightbox-next" onClick={(e) => { e.stopPropagation(); nextLightboxSlide(); }}>
              <ChevronRight size={26} />
            </button>

            <motion.div 
              className="lightbox-card" 
              initial={{ y: 30, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              exit={{ y: 30, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="lightbox-image-wrap">
                {/* Menampilkan Gambar Berdasarkan Index Slide Aktif pada Lightbox */}
                <img src={selectedProject.images[lightboxSlideIndex]} alt={selectedProject.title} />
                <div className="lightbox-counter">
                  {lightboxSlideIndex + 1} / {selectedProject.images.length}
                </div>
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

                <a
                  href={createWhatsAppLink(`Halo Rifqi Syafwan, saya tertarik membuat sesi foto seperti project ${selectedProject.title}.`)}
                  target="_blank" rel="noreferrer" className="lightbox-cta-btn"
                >
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