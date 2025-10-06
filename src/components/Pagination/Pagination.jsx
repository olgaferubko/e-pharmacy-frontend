import { useState, useEffect } from "react";
import s from "./Pagination.module.css";

export default function Pagination({ current, total, onChange }) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (total <= 1) return null;

  const DOTS = "...";
  const count = isMobile ? 2 : 3;

  const range = (start, end) =>
    end < start ? [] : Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const end = Math.min(current + count - 1, total);
  const start = Math.max(current, 1);
  const pages = range(start, end);
  if (end < total) pages.push(DOTS);

  const handleClick = (page) => {
    if (page >= 1 && page <= total && page !== current) {
      onChange(page);
    }
  };

  return (
    <nav className={s.pagination}>
      <div className={s.btnWrapper}>
        <button
          className={s.arrowBtn}
          onClick={() => handleClick(1)}
          disabled={current === 1}
        >
          <svg
            className={`${s.iconArrow} ${current === 1 ? s.disabledIcon : ""}`}
            width={25}
            height={25}
          >
            <use href="/icons.svg#icon-arrows" />
          </svg>
        </button>

        <button
          className={s.arrowBtn}
          onClick={() => handleClick(current - 1)}
          disabled={current === 1}
        >
          <svg
            className={`${s.iconArrow} ${current === 1 ? s.disabledIcon : ""}`}
            width={20}
            height={20}
          >
            <use href="/icons.svg#icon-arrow" />
          </svg>
        </button>
      </div>

      <div className={s.pagesWrapper}>
        {pages.map((p, idx) =>
          p === DOTS ? (
            <span key={idx} className={s.dots}>{DOTS}</span>
          ) : (
            <button
              key={idx}
              className={`${s.pageBtn} ${p === current ? s.active : ""}`}
              onClick={() => handleClick(p)}
            >
              {p}
            </button>
          )
        )}
      </div>

      <div className={s.btnWrapper}>
        <button
          className={s.arrowBtn}
          onClick={() => handleClick(current + 1)}
          disabled={current === total}
        >
          <svg
            className={`${s.iconArrowRight} ${current === total ? s.disabledIcon : ""}`}
            width={20}
            height={20}
          >
            <use href="/icons.svg#icon-arrow" />
          </svg>
        </button>

        <button
          className={s.arrowBtn}
          onClick={() => handleClick(total)}
          disabled={current === total}
        >
          <svg
            className={`${s.iconArrowRight} ${current === total ? s.disabledIcon : ""}`}
            width={25}
            height={25}
          >
            <use href="/icons.svg#icon-arrows" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
