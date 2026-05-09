import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    const handleMouseOver = (e) => {
      const target = e.target;

      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".portfolio-card") ||
        target.closest(".service-card") ||
        target.closest(".pricing-card")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className={`custom-cursor ${isHovering ? "cursor-hover" : ""}`}
      animate={{
        x: position.x - 10,
        y: position.y - 10,
        scale: isHovering ? 2.6 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 420,
        damping: 32,
        mass: 0.4,
      }}
    />
  );
}

export default CustomCursor;