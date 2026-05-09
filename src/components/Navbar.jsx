import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { navLinks, siteConfig } from "../data/siteData";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;

      navLinks.forEach((link) => {
        const section = document.getElementById(link.id);

        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;

          if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
          ) {
            setActiveSection(link.id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="navbar">
      <a href="#home" className="logo" onClick={closeMenu}>
        Rifqi<span>Syafwan</span>
      </a>

      <nav className={`nav-menu ${isOpen ? "active" : ""}`}>
        {navLinks.map((link) => (
          <a
            href={link.href}
            key={link.id}
            onClick={closeMenu}
            className={activeSection === link.id ? "nav-active" : ""}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <a href="#contact" className="nav-button desktop-button">
        Get in touch
        <span>
          <ArrowRight size={16} />
        </span>
      </a>

      <button
        className="menu-toggle"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>
    </header>
  );
}

export default Navbar;