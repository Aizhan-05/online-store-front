import { FaYoutube } from "react-icons/fa6";
import { FaTelegram } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { Link } from "react-router";
import { useTheme } from "../providers/ThemeProvider";

export default function Footer() {
  const { isDark } = useTheme();
  const classNames = isDark ? "footer dark" : "footer";

  return (
    <footer className={classNames}>
      <div className="footer-container">
        <div className="footer-part">
          <Link to="/" className="logo-text">
            <strong>QAZ MARKET</strong>
          </Link>
          <p className="footer-text">Все права защищены</p>
        </div>
        <div className="footer-part">
          <a
            href="https://www.youtube.com/"
            target="_blank"
            className="footer-link"
            rel="noopener noreferrer"
          >
            <FaYoutube />
          </a>
          <a
            href="https://telegram.org/"
            target="_blank"
            className="footer-link"
            rel="noopener noreferrer"
          >
            <FaTelegram />
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            className="footer-link"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
}
