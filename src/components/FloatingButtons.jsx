import { ArrowUp, MessageCircle } from "lucide-react";

function FloatingButtons() {
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="floating-buttons">
      <a
        href="https://wa.me/6281234567890"
        target="_blank"
        rel="noreferrer"
        className="float-whatsapp"
        aria-label="WhatsApp"
      >
        <MessageCircle size={20} />
      </a>

      <button type="button" onClick={scrollTop} className="float-top" aria-label="Back to top">
        <ArrowUp size={20} />
      </button>
    </div>
  );
}

export default FloatingButtons;