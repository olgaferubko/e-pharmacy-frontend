import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/auth/operations";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer";
import Stores from "../../components/Stores/Stores";
import s from "./StoresPage.module.css";

export default function StoresPage() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const handleLogout = () => { dispatch(logOut()); };
  return (
    <section className={s.page}>
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Stores />
        <Footer />
    </section>
  );
}
