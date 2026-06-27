import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [cursorSize, setCursorSize] = useState(20);

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest("[data-cursor]");

      if (target) {
        setCursorText(target.dataset.cursor || "");
        setCursorSize(80);
        setIsHovering(true);
      } else {
        setCursorText("");
        setCursorSize(20);
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
        x: position.x - cursorSize / 2,
        y: position.y - cursorSize / 2,
        width: cursorSize,
        height: cursorSize,
        scale: isHovering ? 1 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 420,
        damping: 32,
        mass: 0.4,
      }}
    >
      <span>{cursorText}</span>
    </motion.div>
  );
}

export default CustomCursor;