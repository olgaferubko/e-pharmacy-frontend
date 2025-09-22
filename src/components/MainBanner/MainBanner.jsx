import s from "./MainBanner.module.css";

export default function MainBanner() {
  return (
    <section className={s.hero} aria-labelledby="hero-title">

      <picture className={s.picture}>
        <source media="(min-width: 1280px)"
                srcSet="/images/main-desktop.png 1x, /images/main-desktop@2x.png 2x" />
        <source media="(min-width: 768px)"
                srcSet="/images/main-tablet.png 1x, /images/main-tablet@2x.png 2x" />
        <img
          className={s.media}
          src="/main-mobile.png"
          srcSet="/images/main-mobile.png 1x, /images/main-mobile@2x.png 2x"
          alt="Green capsules on a green background"
          fetchPriority="high"
        />
      </picture>

      <div className={s.content}>
        <h1 id="hero-title" className={s.title}>
          Your medication delivered
        </h1>
        <p className={s.subtitle}>
          Say goodbye to all your healthcare worries with us
        </p>
      </div>
    </section>
  );
}
