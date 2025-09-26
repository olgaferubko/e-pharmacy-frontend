import MainBanner from "../../components/MainBanner/MainBanner";
import PromoBanner from "../../components/PromoBanner/PromoBanner";
import NearestStores from "../../components/NearestStores/NearestStores";
import AddPharmacyPromo from "../../components/AddPharmacyPromo/AddPharmacyPromo";
import s from "./HomePage.module.css";

export default function HomePage() {
  return (
    <section className={s.page}>
      <MainBanner />
      <PromoBanner />
      <NearestStores />
      <AddPharmacyPromo />
    </section>
  );
}
