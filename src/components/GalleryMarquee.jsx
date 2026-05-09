import { motion } from "framer-motion";

import gallery1 from "../assets/gallery-1.jpg";
import gallery2 from "../assets/gallery-2.jpg";
import gallery3 from "../assets/gallery-3.jpg";
import gallery4 from "../assets/gallery-4.jpg";
import gallery5 from "../assets/gallery-5.jpg";
import gallery6 from "../assets/gallery-6.jpg";

const galleryImages = [
  {
    image: gallery1,
    title: "Wedding Detail",
  },
  {
    image: gallery2,
    title: "Portrait Mood",
  },
  {
    image: gallery3,
    title: "Creative Light",
  },
  {
    image: gallery4,
    title: "Brand Story",
  },
  {
    image: gallery5,
    title: "Event Moment",
  },
  {
    image: gallery6,
    title: "Cinematic Frame",
  },
];

function GalleryMarquee() {
  const repeatedImages = [...galleryImages, ...galleryImages];

  return (
    <section className="gallery-marquee-section">
      <div className="section-inner">
        <motion.div
          className="gallery-marquee-header"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="section-label">Visual Gallery</p>
          <h2>Moments That Move With Emotion</h2>
        </motion.div>
      </div>

      <div className="marquee-wrapper">
        <div className="marquee-track">
          {repeatedImages.map((item, index) => (
            <article className="marquee-card" key={index}>
              <img src={item.image} alt={item.title} loading="lazy" />
              <div>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default GalleryMarquee;