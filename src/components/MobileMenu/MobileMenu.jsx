import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import clsx from "clsx";
import RegisterButton from "../RegisterBtn/RegisterBtn";
import LoginButton from "../LoginBtn/LoginBtn";
import LogoutButton from "../LogoutBtn/LogoutBtn";
import toast from "react-hot-toast";
import { logOut } from "../../redux/auth/operations";
import s from "./MobileMenu.module.css";

const MobileMenu = ({ isLoggedIn, onClose }) => {
  const navLinkClass = ({ isActive }) =>
    clsx(s.navLink, isActive && s.navLinkActive);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await dispatch(logOut()); 
    onClose();
    toast.success("See you soon!");
    navigate("/");
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div id="mobile-menu" className={s.overlay} onClick={handleOverlayClick}>
      <div className={s.menu}>
        <button className={s.menuClose} onClick={onClose} aria-label="Close menu">
          <svg className={s.menuCloseIcon}>
            <use href="/icons.svg#cross" />
          </svg>
        </button>

        <nav className={s.navMobile}>
          <NavLink to="/" end className={navLinkClass} onClick={onClose}>
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
            <LogoutButton onLogout={handleLogout} variant="green" />
          ) : (
            <>
              <RegisterButton variant="green" />
              <LoginButton variant="green" />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
