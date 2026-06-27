import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { navLinks } from "../data/siteData";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  /* ======================================================
      ACTIVE SECTION
  ====================================================== */

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

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* ======================================================
      NAVBAR SCROLL EFFECT
  ====================================================== */

  useEffect(() => {
    const handleNavbarScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleNavbarScroll);

    handleNavbarScroll();

    return () => {
      window.removeEventListener("scroll", handleNavbarScroll);
    };
  }, []);

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <a href="#home" className="logo" onClick={closeMenu}>
        Rifqi<span>Syafwan</span>
      </a>

      <nav className={`nav-menu ${isOpen ? "active" : ""}`}>
        {navLinks.map((link) => (
          <a
            key={link.id}
            href={link.href}
            onClick={closeMenu}
            className={activeSection === link.id ? "nav-active" : ""}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <a href="#contact" className="nav-button desktop-button">
        Get in Touch
        <span>
          <ArrowRight size={16} />
        </span>
      </a>

      <button
        className="menu-toggle"
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>
    </header>
  );
}

export default Navbar;