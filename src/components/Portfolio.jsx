import { useEffect, useState, useMemo } from "react";
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

  // OPTIMASI: Menggunakan useMemo agar pembersihan data hanya diproses sekali di awal,
  // tidak dijalankan ulang setiap kali user membuka/menutup lightbox.
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

  // Filter data berdasarkan kategori yang aktif
  const filteredItems = useMemo(() => {
    return activeCategory === "All"
      ? updatedItems
      : updatedItems.filter((item) => item.category === activeCategory);
  }, [activeCategory, updatedItems]);

  const selectedItem = selectedIndex !== null ? filteredItems[selectedIndex] : null;

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const showPrevious = () => {
    setSelectedIndex((current) => {
      if (current === null) return null;
      return current === 0 ? filteredItems.length - 1 : current - 1;
    });
  };

  const showNext = () => {
    setSelectedIndex((current) => {
      if (current === null) return null;
      return current === filteredItems.length - 1 ? 0 : current + 1;
    });
  };

  // Handle navigasi via Keyboard
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (selectedIndex === null) return;

      if (event.key === "Escape") {
        closeLightbox();
      }
      if (event.key === "ArrowLeft") {
        showPrevious();
      }
      if (event.key === "ArrowRight") {
        showNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, filteredItems]); // Memasukkan filteredItems ke dependency agar indeks navigasi selalu akurat

  // Mencegah background scrolling saat Lightbox terbuka
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => document.body.classList.remove("no-scroll");
  }, [selectedIndex]);

  // Reset indeks seleksi gambar ketika user berpindah kategori filter
  useEffect(() => {
    setSelectedIndex(null);
  }, [activeCategory]);

  return (
    <section className="portfolio-section" id="portfolio">
      <div className="section-inner">
        
        {/* Header & Filter Kategori */}
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

        {/* Portfolio Grid Masonry */}
        <motion.div layout className="portfolio-grid portfolio-masonry">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.article
                layout
                className={`portfolio-card portfolio-${item.size || "normal"}`}
                key={item.id}
                initial={{ y: 70, opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ y: 30, opacity: 0, scale: 0.94 }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.05, // Sedikit dipercepat per-itemnya agar transisi terasa lebih responsif
                  ease: "easeOut",
                }}
                onClick={() => setSelectedIndex(index)}
              >
                <img src={item.image} alt={item.title} loading="lazy" />

                <div className="portfolio-info">
                  <span>{item.category}</span>
                  <h3>{item.title}</h3>
                </div>

                <button type="button" className="portfolio-open" aria-label="Open project details">
                  <ArrowUpRight size={18} />
                </button>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
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
            {/* Tombol Close */}
            <button
              type="button"
              className="lightbox-close"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              <X size={22} />
            </button>

            {/* Navigasi Kiri */}
            <button
              type="button"
              className="lightbox-nav lightbox-prev"
              onClick={(event) => {
                event.stopPropagation();
                showPrevious();
              }}
              aria-label="Previous project"
            >
              <ChevronLeft size={26} />
            </button>

            {/* Navigasi Kanan */}
            <button
              type="button"
              className="lightbox-nav lightbox-next"
              onClick={(event) => {
                event.stopPropagation();
                showNext();
              }}
              aria-label="Next project"
            >
              <ChevronRight size={26} />
            </button>

            {/* Card Detail di dalam Lightbox */}
            <motion.div
              className="lightbox-card"
              initial={{ y: 50, scale: 0.96, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 40, scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="lightbox-image-wrap">
                <img src={selectedItem.image} alt={selectedItem.title} />

                <div className="lightbox-counter">
                  {String(selectedIndex + 1).padStart(2, "0")} /{" "}
                  {String(filteredItems.length).padStart(2, "0")}
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
                  href={createWhatsAppLink(
                    `Halo Rifqi Syafwan, saya tertarik membuat sesi foto seperti project ${selectedItem.title}.`
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="lightbox-cta-btn" // Ditambahkan class khusus jika ingin di-styling berbeda
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