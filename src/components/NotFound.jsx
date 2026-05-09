import { ArrowLeft, Home } from "lucide-react";
import { motion } from "framer-motion";

function NotFound() {
  return (
    <main className="not-found-page">
      <div className="background-glow background-glow-one"></div>
      <div className="background-glow background-glow-two"></div>

      <motion.section
        className="not-found-card"
        initial={{ y: 60, opacity: 0, scale: 0.96 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <span>404</span>
        <h1>Page Not Found</h1>
        <p>
          The page you’re looking for doesn’t exist or may have been moved.
          Let’s bring you back to the homepage.
        </p>

        <div className="not-found-actions">
          <a href="/">
            <Home size={18} />
            Back to Home
          </a>

          <button type="button" onClick={() => window.history.back()}>
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>
      </motion.section>
    </main>
  );
}

export default NotFound;