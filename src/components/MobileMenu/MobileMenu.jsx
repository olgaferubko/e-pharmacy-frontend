import { NavLink } from "react-router-dom";
import clsx from "clsx";
import RegisterButton from "../RegisterBtn/RegisterBtn";
import LoginButton from "../LoginBtn/LoginBtn";
import LogoutButton from "../LogoutBtn/LogoutBtn";
import s from "./MobileMenu.module.css";

const MobileMenu = ({ isLoggedIn, onClose, onLogout }) => {
const navLinkClass = ({ isActive }) =>
  clsx(s.navLink, isActive && s.navLinkActive);
  return (
    <div id="mobile-menu" className={s.menu}>
      <button className={s.menuClose} onClick={onClose} aria-label="Close menu">
        <svg className={s.menuCloseIcon}>
          <use href="/icons.svg#cross" />
        </svg>
      </button>

      <nav className={s.navMobile}>
        <NavLink  to="/" end className={navLinkClass} onClick={onClose}>
          Home
        </NavLink>
        <NavLink to="/store" className={navLinkClass} onClick={onClose}>
          Medicine store
        </NavLink>
        <NavLink to="/medicine" className={navLinkClass} onClick={onClose}>
          Medicine
        </NavLink>
      </nav>

      <div className={s.authMobile}>
        {isLoggedIn ? (
          <LogoutButton onLogout={onLogout} variant="green" />
        ) : (
          <>
            <RegisterButton variant="green" />
            <LoginButton variant="green" />
          </>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
