import { motion, AnimatePresence } from "framer-motion";

function LoadingScreen({ isLoading }) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.8, ease: "easeInOut" },
          }}
        >
          <motion.div
            className="loader-content"
            initial={{ y: 20, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: { duration: 0.8, ease: "easeOut" },
            }}
          >
            <motion.div
              className="loader-mark"
              animate={{
                scale: [1, 1.12, 1],
                rotate: [0, 4, -4, 0],
              }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              RS
            </motion.div>

            <div>
              <h1>Rifqi Syafwan</h1>
              <p>Photography Portfolio</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LoadingScreen;