import Footer from "../../components/Footer/Footer";
import Stores from "../../components/Stores/Stores";
import s from "./StoresPage.module.css";

export default function StoresPage() {
  return (
    <section className={s.page}>
        <Stores />
        <Footer />
    </section>
  );
}
