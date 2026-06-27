import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import beforeImage from "../assets/before.jpeg";
import afterImage from "../assets/after.jpeg";

function EditingPreview() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [hasDragged, setHasDragged] = useState(false);
  const imageRef = useRef(null);
  const updateSliderPosition = (clientX) => {
    if (!imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();

    const x = clientX - rect.left;

    const percentage = (x / rect.width) * 100;

    setSliderPosition(
      Math.min(Math.max(percentage, 0), 100)
    );
  };

  const handlePointerDown = (event) => {
    event.preventDefault();
    if (!hasDragged) {
      setHasDragged(true);
    }
    updateSliderPosition(event.clientX);
    const handlePointerMove = (moveEvent) => {
      updateSliderPosition(moveEvent.clientX);
    };

    const handlePointerUp = () => {
      window.removeEventListener(
        "pointermove",
        handlePointerMove
      );

      window.removeEventListener(
        "pointerup",
        handlePointerUp
      );
    };

    window.addEventListener(
      "pointermove",
      handlePointerMove
    );

    window.addEventListener(
      "pointerup",
      handlePointerUp
    );
  };

  return (
    <section
      className="editing-preview-section"
      id="editing"
    >
      <div className="section-inner editing-preview-grid">

        <motion.div
          className="editing-preview-content"
          initial={{ opacity: 0, y: 55 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
        >
          <p className="section-label">
            Before / After
          </p>

          <h2>
            Clean Editing With Cinematic Detail
          </h2>

          <p>
            Compare the original photo and the final edited result.
            Drag the center handle to reveal the transformation.
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
          style={{
            "--slider-position": `${sliderPosition}%`,
          }}
          initial={{ opacity: 0, y: 55 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.8,
            delay: 0.12,
            ease: "easeOut",
          }}
        >
          <div
            ref={imageRef}
            className="before-after-image"
            data-cursor="DRAG"
          >
          <AnimatePresence>
            {!hasDragged && (
              <motion.div
                className="drag-hint"
                initial={{
                  opacity: 0,
                  y: 12,
                  scale: .9
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1
                }}
                exit={{
                  opacity: 0,
                  y: -12,
                  scale: .9
                }}
                transition={{
                  duration: .45
                }}
              >
                ↔ Drag
              </motion.div>
            )}
          </AnimatePresence>

            <img
              src={beforeImage}
              alt="Before editing"
              draggable={false}
            />

            <div className="after-image">
              <img
                src={afterImage}
                alt="After editing"
                draggable={false}
              />
            </div>

            <span className="before-after-label before-label">
              Before
            </span>

            <span className="before-after-label after-label">
              After
            </span>

            <div className="slider-line">
              <button
                type="button"
                className="slider-handle"
                aria-label="Drag before after slider"
                onPointerDown={handlePointerDown}
              >
                <span>↔</span>
              </button>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

export default EditingPreview;