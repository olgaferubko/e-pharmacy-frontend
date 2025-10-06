import { useState, useRef, useEffect } from "react";
import s from "./FilterPanel.module.css";

export default function FilterPanel({
  categories,
  query,
  category,
  onQueryChange,
  onCategoryChange,
  onFilter,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className={s.panel}>
      <div
        className={`${s.dropdown} ${isOpen ? s.open : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
        ref={dropdownRef}
      >
        <span className={s.dropdownLabel}>
          {category || "Product category"}
        </span>
        <svg className={s.chevron} id="chevron-down">
          <use href="icons.svg#chevron-down" />
        </svg>

        {isOpen && (
          <ul className={s.dropdownList}>
            {categories.map((c) => (
              <li
                key={c}
                className={`${s.dropdownItem} ${
                  category === c ? s.active : ""
                }`}
                onClick={() => {
                  onCategoryChange(c);
                  setIsOpen(false);
                }}
              >
                {c}
              </li>
            ))}
          </ul>
        )}
      </div>

    <div className={s.searchWrapper}>
    <svg className={s.searchIcon} id="search">
        <use href="icons.svg#search" />
    </svg>

    <input
        type="text"
        placeholder="Search medicine"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        className={s.input}
    />
    </div>

    <button className={s.btn} onClick={onFilter}>
        <svg className={s.filterIcon} id="filter">
            <use href="icons.svg#filter" />
        </svg>
        Filter
    </button>
    </div>
  );
}
