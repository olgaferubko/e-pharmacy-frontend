import { useEffect, useState } from "react";
import axios from "axios";
import s from "./Reviews.module.css";

const api = axios.create({
  baseURL: "https://e-pharmacy-backend.onrender.com/api",
  headers: { Accept: "application/json" },
  withCredentials: false,
});

export default function ReviewsSection() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        setError("");

        const { data } = await api.get("/customer-reviews");
        const list =
          Array.isArray(data) ? data :
          Array.isArray(data?.data) ? data.data :
          Array.isArray(data?.data?.data) ? data.data.data :
          [];

        if (alive) setItems(list);
      } catch (e) {
        if (alive) setError(e?.response?.data?.message || e.message || "Request failed");
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => { alive = false; };
  }, []);

  return (
    <section className={s.section} aria-labelledby="reviews-title">
      <div className={s.header}>
        <h2 id="reviews-title" className={s.title}>Reviews</h2>
        <p className={s.desc}>Search for Medicine, Filter by your location</p>
      </div>

      {loading && <div className={s.loader}>Loading…</div>}
      {!loading && error && <div className={s.error}>Error: {error}</div>}

      {!loading && !error && items.length === 0 && (
        <div className={s.empty}>There are no reviews yet.</div>
      )}

      {!loading && !error && items.length > 0 && (
        <ul className={s.list}>
          {items.map(({ _id, name, testimonial }) => (
            <li key={_id} className={s.card}>
              <div className={s.top}>
                <div className={s.avatar} aria-hidden="true">
                  <svg className={s.avatarIcon} width="32" height="32">
                    <use href="/icons.svg#user" />
                  </svg>
                </div>
                <div className={s.meta}>
                    <h3 className={s.name}>{name}</h3>
                    <p className={s.text}>{testimonial}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
