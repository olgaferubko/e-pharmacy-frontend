import { useState } from "react";
import clsx from "clsx";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartCount } from "../../redux/cart/selectors";
import RegisterButton from "../RegisterBtn/RegisterBtn";
import LoginButton from "../LoginBtn/LoginBtn";
import LogoutButton from "../LogoutBtn/LogoutBtn";
import MobileMenu from "../MobileMenu/MobileMenu";
import s from "./Header.module.css";

const Header = ({ isLoggedIn = false, onLogout = () => {} }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const user = useSelector((s) => s.auth.user);
  const cartCount = useSelector(selectCartCount);
  const initial = user?.name ? user.name[0].toUpperCase() : null;

  const isHome = pathname === "/";
  const bgClass = isHome ? s.headerHome : s.headerDefault;
  const logoSrc = isHome ? "/logo.svg" : "/logo-green.svg";
  const logoTextClass = isHome ? s.logoTextHome : s.logoTextDefault;
  const variant = isHome ? "green" : "white";
  const toggleMenu = () => setIsMenuOpen(v => !v);
  const navLinkClass = ({ isActive }) =>
  clsx(s.navLink, isActive && s.navLinkActive);

  return (
    <header className={`${s.header} ${bgClass}`}>
      <div className={s.headerContainer}>
        <Link to="/" className={s.logo}>
          <img
            src={logoSrc}
            alt="E-Pharmacy"
            className={s.logoIcon}
          />
          <span className={`${s.logoText} ${logoTextClass}`}>E-Pharmacy</span>
        </Link>

        <nav className={s.nav}>
          <NavLink to="/" end className={navLinkClass}>Home</NavLink>
          <NavLink to="/store" className={navLinkClass}>Medicine store</NavLink>
          <NavLink to="/medicine" className={navLinkClass}>Medicine</NavLink>
        </nav>

        <div className={s.rightSection}>

          <Link to="/cart" className={s.cartBtn}>
            <svg className={s.cartIcon} width="16" height="16">
              <use href="/icons.svg#cart" />
            </svg>
            <span className={s.badge}>{cartCount}</span>
          </Link>
          {isLoggedIn && (
            <div className={s.userCircle}>{initial}</div>
          )}

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