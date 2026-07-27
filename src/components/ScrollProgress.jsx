import { useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Lenis from "lenis";

function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  useEffect(() => {
  lenisInstance = new Lenis({
    duration: 1.2,
    smoothWheel: true,
    smoothTouch: false,
    wheelMultiplier: 1,
    touchMultiplier: 1.5,
  });

  function raf(time) {
    lenisInstance.raf(time);
    requestAnimationFrame(raf);
  }

  const animationFrame = requestAnimationFrame(raf);

  return () => {
    cancelAnimationFrame(animationFrame);
    lenisInstance.destroy();
    lenisInstance = null;
  };
}, []);

  return <motion.div className="scroll-progress" style={{ scaleX }} />;
}

export default ScrollProgress;