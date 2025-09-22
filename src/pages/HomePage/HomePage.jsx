import MainBanner from "../../components/MainBanner/MainBanner";
import s from "./HomePage.module.css";

export default function HomePage() {
  return (
    <section className={s.page}>
      <MainBanner />
    </section>
  );
}
