import { Link } from "react-router-dom";
import s from "./AddPharmacyPromo.module.css";

export default function AddPharmacyPromo() {
  const features = [
    "Place orders online",
    "Verified stores nearby",
    "Secure checkout",
    "Ratings & reviews",
    "Wide medicines catalog",
  ];

  const row = [...features, ...features];

  return (
    <section className={s.section} aria-labelledby="addpromo-title">
      <div className={s.card}>
        <div className={s.content}>
          <h2 id="addpromo-title" className={s.title}>
            Add the medicines you need online now
          </h2>

          <p className={s.text}>
            Enjoy the convenience of having your prescriptions filled from home by
            connecting with your community pharmacy through our online platform.
          </p>

          <Link to="/medicine" className={s.link} aria-label="Buy medicine">
            Buy medicine
          </Link>
        </div>

        <picture className={s.media} aria-hidden="true">
          <source
            media="(min-width: 1280px)"
            srcSet="/images/add-desktop.png 1x, /images/add-desktop@2x.png 2x"
          />
          <source
            media="(min-width: 768px)"
            srcSet="/images/add-tablet.png 1x, /images/add-tablet@2x.png 2x"
          />
          <img
            className={s.img}
            src="/images/add-mobile.png"
            srcSet="/images/add-mobile.png 1x, /images/add-mobile@2x.png 2x"
            alt=""
            loading="lazy"
            decoding="async"
          />
        </picture>
      </div>

      <div className={s.featuresWrap} aria-label="Platform capabilities for pharmacies">
        <ul className={s.featuresTrack}>
          {row.map((item, i) => (
            <li key={`${item}-${i}`} className={s.featureItem}>
              <svg width="20" height="20" className={s.flash} aria-hidden="true">
                <use href="/icons.svg#lightning" />
              </svg>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
