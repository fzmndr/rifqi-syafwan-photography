import { useRef, useState } from "react";
import { motion } from "framer-motion";

import beforeImage from "../assets/before.jpeg";
import afterImage from "../assets/after.jpeg";

function EditingPreview() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const imageRef = useRef(null);

  const updateSliderPosition = (clientX) => {
    if (!imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    const clampedPercentage = Math.min(Math.max(percentage, 0), 100);

    setSliderPosition(clampedPercentage);
  };

  const handlePointerDown = (event) => {
    updateSliderPosition(event.clientX);

    const handlePointerMove = (moveEvent) => {
      updateSliderPosition(moveEvent.clientX);
    };

    const handlePointerUp = () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
  };

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
            center handle to see the transformation.
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
          <div
              className="before-after-image"
              data-cursor="DRAG"
            >
            <img src={beforeImage} alt="Before editing" />

            <div className="after-image">
              <img src={afterImage} alt="After editing" />
            </div>

            <span className="before-after-label before-label">Before</span>
            <span className="before-after-label after-label">After</span>

            <div className="slider-line">
              <button
                type="button"
                className="slider-handle"
                onPointerDown={(event) => {
                  event.stopPropagation();
                  handlePointerDown(event);
                }}
                aria-label="Drag before after slider"
              >
                <span></span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default EditingPreview;