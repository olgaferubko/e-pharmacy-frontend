import { useEffect, useState } from "react";
import axios from "axios";
import s from "./NearestStores.module.css";

import mob1x from "/images/elements-mobile.png";
import mob2x from "/images/elements-mobile@2x.png";
import desk1x from "/images/elements-desktop.png";
import desk2x from "/images/elements-desktop@2x.png";

const api = axios.create({
  baseURL: "https://e-pharmacy-backend-bad9.onrender.com/api",
  headers: { Accept: "application/json" },
  withCredentials: false,
});

export default function NearestStores() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        setError("");
        const { data } = await api.get("/stores/nearest");

        const list = data?.data || [];
        if (alive) setStores(list.slice(0, 6));
      } catch (e) {
        if (alive)
          setError(e?.response?.data?.message || e.message || "Request failed");
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  return (
    <section className={s.section} aria-labelledby="stores-title">
      <div className={s.header}>
        <h2 id="stores-title" className={s.title}>Your Nearest Medicine Store</h2>
        <p className={s.subtitle}>Search for Medicine, Filter by your location</p>
      </div>

      {loading && <div className={s.loader}>Loading…</div>}
      {!loading && error && <div className={s.error}>ERROR: {error}</div>}

      {!loading && !error && (
        <ul className={s.list}>
          {stores.map(({ _id, name, address, city, phone, rating, isOpen }) => (
            <li key={_id} className={s.card}>
              <picture aria-hidden="true" className={s.decor}>
                <source media="(min-width: 768px)" srcSet={`${desk1x} 1x, ${desk2x} 2x`} />
                <img src={mob1x} srcSet={`${mob1x} 1x, ${mob2x} 2x`} alt="" />
              </picture>

              <div className={s.rowTop}>
                <h3 className={s.name}>{name}</h3>
                <div className={s.metaRight}>
                  <span className={s.rating}>
                    <svg className={s.star} aria-hidden="true">
                      <use href="/icons.svg#star" />
                    </svg>
                    {rating}
                  </span>
                  <span className={`${s.badge} ${isOpen ? s.badgeOpen : s.badgeClose}`}>
                    {isOpen ? "OPEN" : "CLOSE"}
                  </span>
                </div>
              </div>

              <div className={s.info}>
                <div className={s.line}>
                  <svg className={s.map} aria-hidden="true">
                    <use href="/icons.svg#map" />
                  </svg>
                  <div className={s.addr}>
                    <span>{address}</span>
                    <span>{city}</span>
                  </div>
                </div>

                <div className={s.line}>
                  <svg className={s.phone} aria-hidden="true">
                    <use href="/icons.svg#phone" />
                  </svg>
                  <span>{phone}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
