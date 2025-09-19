import { useState } from "react";
import clsx from "clsx";
import { Link, NavLink, useLocation } from "react-router-dom";
import RegisterButton from "../RegisterBtn/RegisterBtn";
import LoginButton from "../LoginBtn/LoginBtn";
import LogoutButton from "../LogoutBtn/LogoutBtn";
import MobileMenu from "../MobileMenu/MobileMenu";
import s from "./Header.module.css";

const Header = ({ isLoggedIn = false, onLogout = () => {} }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const isHome = pathname === "/";
  const bgClass = isHome ? s.headerHome : s.headerDefault;
  const logoClass = isHome ? s.logoHome : s.logoDefault;
  const logoTextClass = isHome ? s.logoTextHome : s.logoTextDefault;
  const variant = isHome ? "green" : "white";
  const toggleMenu = () => setIsMenuOpen(v => !v);
  const navLinkClass = ({ isActive }) =>
  clsx(s.navLink, isActive && s.navLinkActive);

  return (
    <header className={`${s.header} ${bgClass}`}>
      <div className={s.headerContainer}>
        <Link to="/" className={s.logo}>
          <svg className={`${s.logoIcon} ${logoClass}`}>
            <use href="/icons.svg#logo" />
          </svg>
          <span className={`${s.logoText} ${logoTextClass}`}>E-Pharmacy</span>
        </Link>

        <nav className={s.nav}>
          <NavLink to="/" end className={navLinkClass}>Home</NavLink>
          <NavLink to="/store" className={navLinkClass}>Medicine store</NavLink>
          <NavLink to="/medicine" className={navLinkClass}>Medicine</NavLink>
        </nav>

        <div className={s.auth}>
          {isLoggedIn ? (
            <LogoutButton onLogout={onLogout} variant={variant} />
          ) : (
            <>
              <RegisterButton variant={variant} />
              <LoginButton variant={variant} />
            </>
          )}
        </div>

        <button
          className={s.burger}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          <svg className={`${s.burgerIcon} ${isHome ? s.burgerIconLight : s.burgerIconDark}`}>
            <use href="/icons.svg#menu" />
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <MobileMenu
          isLoggedIn={isLoggedIn}
          onClose={toggleMenu}
          navLinkClass={navLinkClass}
          onLogout={onLogout}
        />
      )}
    </header>
  );
};

export default Header;