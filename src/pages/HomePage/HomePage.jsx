import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/auth/operations";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import Header from "../../components/Header/Header"
import MainBanner from "../../components/MainBanner/MainBanner";
import PromoBanner from "../../components/PromoBanner/PromoBanner";
import NearestStores from "../../components/NearestStores/NearestStores";
import AddPharmacyPromo from "../../components/AddPharmacyPromo/AddPharmacyPromo";
import ReviewsSection from "../../components/Reviews/Reviews";
import Footer from "../../components/Footer/Footer";
import s from "./HomePage.module.css";

export default function HomePage() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const handleLogout = () => { dispatch(logOut()); };

  return (
    <section className={s.page}>
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <MainBanner />
      <PromoBanner />
      <NearestStores />
      <AddPharmacyPromo />
      <ReviewsSection />
      <Footer />
    </section>
  );
}
