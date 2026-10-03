import { FiActivity } from "react-icons/fi";
import "./Footer.scss";

const links = [
  { label: "About", href: "#about" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
] as const;

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <a href="#home" className="footer__brand">
          <FiActivity aria-hidden="true" />
          HOME
        </a>

        <nav aria-label="Footer">
          <ul>
            {links.map(({ label, href }) => (
              <li key={href}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <p className="footer__copy">© {new Date().getFullYear()} Semua hak dilindungi.</p>
      </div>
    </footer>
  );
}
