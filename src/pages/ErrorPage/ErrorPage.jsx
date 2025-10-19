import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/auth/operations";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import Header from "../../components/Header/Header";
import s from "./ErrorPage.module.css";

export default function ErrorPage() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const handleLogout = () => { dispatch(logOut()); };
  
  return (
    <section className={s.page}>
      <div className={s.container}>
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
          <h2 className={s.notFound}>Page not found!</h2>
          <p className={s.return}>Please return to the home page</p>
      </div>
    </section>
  );
}
