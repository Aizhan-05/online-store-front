import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { GoSearch } from "react-icons/go";
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
      <nav className="nav">
        <div className="nav-part">
          <Link to="/" className="logo-text">
            <strong>QAZ MARKET</strong>
          </Link>

          {/* Бургер-кнопка */}
          <button
            className={`burger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label="Открыть меню"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Меню */}
          <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
            <li>
              <Link to="/products" className="nav-link" onClick={() => setMenuOpen(false)}>
                Товары
              </Link>
            </li>
            <li>
              <Link to="/reviews" className="nav-link" onClick={() => setMenuOpen(false)}>
                Отзывы
              </Link>
            </li>
            <li>
              <Link to="/support" className="nav-link" onClick={() => setMenuOpen(false)}>
                Служба поддержки
              </Link>
            </li>
            <li>
              <Link to="/contact" className="nav-link" onClick={() => setMenuOpen(false)}>
                Контакты
              </Link>
            </li>
          </ul>
        </div>

        <div className="nav-part nav-flex">
          {formIsOpen && (
            <form className="nav-form" onSubmit={handleSubmit}>
              <input
                type="text"
                className="nav-input"
                placeholder="Поиск..."
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
              />
              <button type="submit" className="nav-submit">
                Отправить
              </button>
            </form>
          )}
          <button className="nav-btn" onClick={toggleForm}>
            <GoSearch />
          </button>
          <button className="nav-btn" onClick={toggleTheme}>
            {isDark ? <LuSun /> : <LuMoon />}
          </button>
        </div>
      </nav>
    </header>
  );
}
