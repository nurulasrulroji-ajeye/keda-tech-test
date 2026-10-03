import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiActivity, FiMenu, FiX } from "react-icons/fi";
import "./Navbar.scss";
import { useActiveSection } from "../../hooks/useActiveSection";

const links = [
  { label: "ABOUT", href: "#about" },
  { label: "PRICING", href: "#pricing" },
  { label: "CONTACT", href: "#contact" },
] as const;

const sectionIds = ["home", "about", "pricing", "contact"] as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(sectionIds);
  const close = () => setOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`navbar${scrolled ? " is-scrolled" : ""}`}>
      <a href="#home" className="navbar__brand" onClick={close}>
        <span className="navbar__logo">
          <FiActivity />
        </span>
        HOME
      </a>

      <button
        type="button"
        className="navbar__toggle"
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {open ? <FiX /> : <FiMenu />}
      </button>

      <nav className={`navbar__menu${open ? " is-open" : ""}`}>
        <ul>
          {links.map(({ label, href }) => {
            const isActive = active === href.slice(1);
            return (
              <li key={href}>
                <a
                  href={href}
                  className={`navbar__link${isActive ? " is-active" : ""}`}
                  aria-current={isActive ? "true" : undefined}
                  onClick={close}
                >
                  {label}
                </a>
              </li>
            );
          })}
        </ul>
        <Link to="/login" className="navbar__login" onClick={close}>
          LOGIN
        </Link>
      </nav>
    </header>
  );
}
