import { useState } from "react";
import ThemeSwitcher from "./ThemeSwitcher";

function Navbar({ clientName, themeKey, onThemeChange }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar__logo">{clientName}</div>

      <button
        className="navbar__toggle"
        aria-label="Toggle menu"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        ☰
      </button>

      <div className={`navbar__menu ${isOpen ? "navbar__menu--open" : ""}`}>
        <ThemeSwitcher value={themeKey} onChange={onThemeChange} />
      </div>
    </nav>
  );
}

export default Navbar;