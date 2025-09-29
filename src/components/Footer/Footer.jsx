import { Link, NavLink } from "react-router-dom";
import s from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={s.footer} aria-labelledby="footer-brand">
      <div className={s.top}>
        <div className={s.brand}>
          <Link to="/" className={s.logo} id="footer-brand" aria-label="E-Pharmacy — go to Home">
            <svg className={s.logoIcon} width="32" height="32" aria-hidden="true">
              <use href="/logo.svg" />
            </svg>
            <span className={s.logoText}>E-Pharmacy</span>
          </Link>

          <p className={s.tagline}>
            Get the medicine to help you feel better, get back to your active life,
            and enjoy every moment.
          </p>
        </div>

        <div className={s.wrapper}>
            <nav className={s.nav} aria-label="Footer navigation">
            <ul className={s.navList}>
                <li><NavLink to="/" end className={s.navLink}>Home</NavLink></li>
                <li><NavLink to="/store" className={s.navLink}>Medicine store</NavLink></li>
                <li><NavLink to="/medicine" className={s.navLink}>Medicine</NavLink></li>
            </ul>
            </nav>

            <ul className={s.socials} aria-label="Social media">
            <li>
                <a
                className={s.socialLink}
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                >
                <svg width="28" height="28" aria-hidden="true" className={s.socialIcon}>
                    <use href="/icons.svg#facebook" />
                </svg>
                </a>
            </li>
            <li>
                <a
                className={s.socialLink}
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                >
                <svg width="28" height="28" aria-hidden="true" className={s.socialIcon}>
                    <use href="/icons.svg#instagram" />
                </svg>
                </a>
            </li>
            <li>
                <a
                className={s.socialLink}
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                >
                <svg width="28" height="28" aria-hidden="true" className={s.socialIcon}>
                    <use href="/icons.svg#youtube" />
                </svg>
                </a>
            </li>
            </ul>
        </div>
      </div>

      <div className={s.hr} aria-hidden="true" />

        <ul className={s.legal}>
            <li className={s.copy}>© E-Pharmacy {year}. All Rights Reserved</li>
            <li className={s.legalLink}>Privacy Policy</li>
            <li className={s.legalLink}>Terms &amp; Conditions</li>
        </ul>
    </footer>
  );
}
