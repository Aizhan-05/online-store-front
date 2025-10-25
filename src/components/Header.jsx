import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { LuMoon, LuSun } from "react-icons/lu";
import { useTheme } from "../providers/ThemeProvider";

export default function Header() {
  const { isDark, toggleTheme } = useTheme();
  const [formIsOpen, setFormIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  function toggleForm() {
    setFormIsOpen(!formIsOpen);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (searchInput) {
      navigate(`/search?query=${searchInput}`);
      setFormIsOpen(false);
      setSearchInput("");
    }
  }

  const classNames = isDark ? "header dark" : "header";

  return (
    <header className={classNames}>
      <div className="container">
        <nav className="nav">
          <div className="nav-part">
            <Link to="/" className="logo-text">
              <strong>Online-store</strong>
            </Link>

            <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
              <li>
                <Link to="/device" className="nav-link" onClick={() => setMenuOpen(false)}>
                  Товары
                </Link>
              </li>
              <li>
                <Link to="#" className="nav-link" onClick={() => setMenuOpen(false)}>
                  Служба поддержки
                </Link>
              </li>
              <li>
                <Link to="#" className="nav-link" onClick={() => setMenuOpen(false)}>
                  Контакты
                </Link>
              </li>
            </ul>
          </div>

          <div className="nav-part nav-flex">
            <button className="nav-btn" onClick={toggleTheme}>
              {isDark ? <LuSun /> : <LuMoon />}
            </button>

            <button type="login" className="login-btn" onClick={() => navigate("/user/login")}>
              Войти
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
