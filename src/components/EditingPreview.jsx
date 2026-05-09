import { useState } from "react";
import { motion } from "framer-motion";

import beforeImage from "../assets/before.jpg";
import afterImage from "../assets/after.jpg";

function EditingPreview() {
  const [sliderValue, setSliderValue] = useState(50);

  return (
    <section className="editing-preview-section">
      <div className="section-inner editing-preview-grid">
        <motion.div
          className="editing-preview-content"
          initial={{ y: 55, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="section-label">Editing Style</p>
          <h2>Clean, Cinematic, and Timeless Color Grading.</h2>
          <p>
            Every photo is carefully edited to keep the emotion natural while
            improving tone, contrast, skin color, and overall cinematic mood.
          </p>

          <div className="editing-points">
            <span>Natural Skin Tone</span>
            <span>Cinematic Contrast</span>
            <span>Premium Color Mood</span>
          </div>
        </motion.div>

        <motion.div
          className="before-after-box"
          initial={{ y: 55, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, delay: 0.12, ease: "easeOut" }}
        >
          <div className="before-after-image">
            <img src={beforeImage} alt="Before editing" />

            <div
              className="after-image"
              style={{ width: `${sliderValue}%` }}
            >
              <img src={afterImage} alt="After editing" />
            </div>

            <div
              className="slider-line"
              style={{ left: `${sliderValue}%` }}
            >
              <span></span>
            </div>

            <div className="before-after-label before-label">Before</div>
            <div className="before-after-label after-label">After</div>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            value={sliderValue}
            onChange={(event) => setSliderValue(event.target.value)}
            className="before-after-range"
            aria-label="Before after slider"
          />
        </motion.div>
      </div>
    </section>
  );
}

export default EditingPreview;