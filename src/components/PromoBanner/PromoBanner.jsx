import { HashLink } from "react-router-hash-link";
import s from "./PromoBanner.module.css";

export default function PromoBanner() {
  const items = [
    { step: 1, title: "Fast delivery",   value: "95%",  cta: "Shop now",  to: "/medicine" },
    { step: 2, title: "Quality control", value: "100%", cta: "Shop now", to: "/medicine" },
    { step: 3, title: "Satisfaction",    value: "97%",  cta: "Reviews",   to: "/#reviews" },
  ];

  return (
    <section className={s.wrapper}>
        <div className={s.wrap} aria-label="Promotions">
            {items.map(({ step, title, value, cta, to }) => (
                <article key={step} className={s.card}>
                    <div className={s.titleContainer}>
                        <p className={s.badge}>{step}</p>
                        <h3 className={s.title}>{title}</h3>
                    </div>
                    <div className={s.valueConatiner}>
                        <p className={s.value}>{value}</p>
                        <HashLink smooth to={to} className={s.cta}>{cta}</HashLink>
                    </div>
                </article>
            ))}
        </div>
    </section>
  );
}