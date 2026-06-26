import { useEffect, useState, useMemo } from "react";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { heroSlides } from "../data/heroData";

function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto-play slider berganti setiap 4.5 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((current) =>
        current === heroSlides.length - 1 ? 0 : current + 1
      );
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  // Memastikan data slide yang aktif selalu aman diakses memakai useMemo
  const currentSlide = useMemo(() => {
    return heroSlides[activeSlide] || { image: "", label: "", title: "", description: "" };
  }, [activeSlide]);

  return (
    <section className="hero" id="home">
      {/* Background Gambar dengan Transisi Cross-Fade & Efek Zooming Lambat */}
      <AnimatePresence mode="wait">
        <motion.img
          key={currentSlide.image}
          src={currentSlide.image}
          alt={currentSlide.title || "Photographer Portfolio Background"}
          className="hero-img"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
      </AnimatePresence>

      {/* Layer Gelap Gradasi Sinematik */}
      <div className="hero-overlay"></div>

      {/* Konten Utama */}
      <div className="hero-content">
        {/* Sisi Kiri: Teks Utama (Statis/Intro) */}
        <motion.div
          className="hero-left"
          initial={{ y: 35, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <p className="eyebrow">Hey, I'm a</p>
          <h1>Photographer</h1>
        </motion.div>

        {/* Sisi Kanan: Detail Informasi Dinamis & Tombol CTA */}
        <div className="hero-right">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -15, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="hero-text-wrapper"
            >
              <span className="hero-slide-label">
                {currentSlide.label || "Photography Session"}
              </span>

              <h2>
                {currentSlide.title || "Documenting moments and creating visuals that tell stories."}
              </h2>

              <p>
                {currentSlide.description || "I create, explore, and turn ideas into visuals."}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Tombol CTA ditempatkan di sini agar posisinya otomatis berada di bawah teks saat di HP */}
          <motion.a
            href="#portfolio"
            className="floating-cta"
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            View Portfolio
            <ArrowRight size={16} />
          </motion.a>
        </div>
      </div>

      {/* Bagian Grid Menu Kategori Bawah (Otomatis disembunyikan via CSS di HP) */}
      <motion.div
        className="hero-bottom"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
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

      {/* Navigasi Titik Kecil (Slider Dots) */}
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