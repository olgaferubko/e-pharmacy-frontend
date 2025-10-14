import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import s from "./MedicineItem.module.css";

export default function MedicineItem({ item }) {
  const isAuth = useSelector((s) => s.auth.isLoggedIn);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const handleAddToCart = () => {
    if (!isAuth) {
      setIsLoginOpen(true);
      return;
    }
    toast.success(`${item.name} added to cart!`);
  };

  return (
    <>
      <div className={s.card}>
        <img src={item.photo} alt={item.name} className={s.photo} />
        <div className={s.wrapper}>
          <div className={s.infoWrapper}>
            <div className={s.titleWrapper}>
              <h3 className={s.name}>{item.name}</h3>
              <p className={s.suppliers}>{item.suppliers}</p>
            </div>
            <p className={s.price}>${item.price}</p>
          </div>
          <div className={s.actions}>
            <button className={s.addBtn} onClick={handleAddToCart}>
              Add to cart
            </button>
            <Link to={`/product/${item.id}`} className={s.details}>
              Details
            </Link>
          </div>
        </div>
      </div>

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSwitchToSignUp={() => {
          setIsLoginOpen(false);
          setIsSignUpOpen(true);
        }}
      />

      <RegisterModal
        isOpen={isSignUpOpen}
        onClose={() => setIsSignUpOpen(false)}
        onSwitchToLogin={() => {
          setIsSignUpOpen(false);
          setIsLoginOpen(true);
        }}
      />
    </>
  );
}
