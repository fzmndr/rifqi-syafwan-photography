import { useEffect, useState, useMemo } from "react";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { heroSlides } from "../data/heroData";

function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto-play slider setiap 4.5 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((current) =>
        current === heroSlides.length - 1 ? 0 : current + 1
      );
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  // Ambil data slide aktif berdasarkan state
  const currentSlide = useMemo(() => {
    return heroSlides[activeSlide] || { image: "", label: "", title: "", description: "" };
  }, [activeSlide]);

  return (
    <section className="hero" id="home">
      {/* Background Image Slider dengan Efek Cross-Fade */}
      <AnimatePresence mode="wait">
        <motion.img
          key={currentSlide.image}
          src={currentSlide.image}
          alt={currentSlide.title || "Photographer Background"}
          className="hero-img"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
      </AnimatePresence>

      {/* Layer Gelap Sinematik */}
      <div className="hero-overlay"></div>

      {/* Konten Utama */}
      <div className="hero-content">
        {/* Sisi Kiri: Judul Utama Utama */}
        <motion.div
          className="hero-left"
          initial={{ y: 45, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 1.2, ease: "easeOut" }}
        >
          <p className="eyebrow">Hey, I'm a</p>
          <h1>Photographer</h1>
        </motion.div>

        {/* Sisi Kanan: Deskripsi Dinamis Mengikuti Gambar */}
        <div className="hero-right">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span className="hero-slide-label">
                {currentSlide.label || "Portrait Session"}
              </span>

              <h2>
                {currentSlide.title || "Documenting moments and creating visuals that tell stories."}
              </h2>

              <p>
                {currentSlide.description || "I create, explore, and turn ideas into visuals."}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Tombol CTA Melayang */}
      <motion.a
        href="#portfolio"
        className="floating-cta"
        initial={{ y: 25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5, ease: "easeOut" }}
      >
        View Portfolio
        <ArrowRight size={18} />
      </motion.a>

      {/* Bagian Indikator Kategori Bawah */}
      <motion.div
        className="hero-bottom"
        initial={{ y: 35, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 1.7, ease: "easeOut" }}
      >
        <div className={activeSlide === 0 ? "active" : ""}>
          <span>#01</span>
          <p>Event</p>
        </div>

        <div className={activeSlide === 1 ? "active" : ""}>
          <span>#02</span>
          <p>Portrait</p>
        </div>

        <div className={activeSlide === 2 ? "active" : ""}>
          <span>#03</span>
          <p>Brand</p>
        </div>

        <div className={activeSlide === 3 ? "active" : ""}>
          <span>#04</span>
          <p>Automotive</p>
        </div>
      </motion.div>

      {/* Navigasi Titik Kecil (Dots) */}
      <div className="hero-slider-dots">
        {heroSlides.map((slide, index) => (
          <button
            type="button"
            key={slide.id || index}
            className={activeSlide === index ? "active" : ""}
            onClick={() => setActiveSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default Hero;