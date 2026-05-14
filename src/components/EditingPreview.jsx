import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import beforeImage from "../assets/before.jpeg";
import afterImage from "../assets/after.jpeg";

function EditingPreview() {
  const [sliderPosition, setSliderPosition] = useState(50);

  const moveLeft = () => {
    setSliderPosition((prev) => Math.max(prev - 5, 0));
  };

  const moveRight = () => {
    setSliderPosition((prev) => Math.min(prev + 5, 100));
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        moveLeft();
      }

      if (event.key === "ArrowRight") {
        moveRight();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section className="editing-preview-section" id="editing">
      <div className="section-inner editing-preview-grid">
        <motion.div
          className="editing-preview-content"
          initial={{ y: 55, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="section-label">Before / After</p>

          <h2>Clean Editing With Cinematic Detail</h2>

          <p>
            Compare the original photo and the final edited result. Drag the
            slider or use the arrow buttons to see the transformation.
          </p>

          <div className="editing-points">
            <span>Color Grading</span>
            <span>Skin Retouch</span>
            <span>Lighting Balance</span>
            <span>Final Detail</span>
          </div>
        </motion.div>

        <motion.div
          className="before-after-box"
          style={{ "--slider-position": `${sliderPosition}%` }}
          initial={{ y: 55, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.12, ease: "easeOut" }}
        >
          <div className="before-after-image">
            <img src={beforeImage} alt="Before editing" />

            <div className="after-image">
              <img src={afterImage} alt="After editing" />
            </div>

            <span className="before-after-label before-label">Before</span>
            <span className="before-after-label after-label">After</span>

            <div className="slider-line">
              <span></span>
            </div>

            <button
              type="button"
              className="before-after-arrow before-after-left"
              onClick={moveLeft}
              aria-label="Move before after slider left"
            >
              <ChevronLeft size={22} />
            </button>

            <button
              type="button"
              className="before-after-arrow before-after-right"
              onClick={moveRight}
              aria-label="Move before after slider right"
            >
              <ChevronRight size={22} />
            </button>

            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              className="before-after-range"
              onChange={(e) => setSliderPosition(Number(e.target.value))}
              aria-label="Before after slider"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default EditingPreview;