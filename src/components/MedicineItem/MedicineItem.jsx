import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import s from "./MedicineItem.module.css";

export default function MedicineItem({ item }) {
  const isAuth = useSelector((s) => s.auth.isLoggedIn);

  const handleAddToCart = () => {
    if (!isAuth) return toast.error("Please log in or register to add to cart");
    toast.success(`${item.name} added to cart!`);
  };

  return (
    <div className={s.card}>
      <img src={item.photo} alt={item.name} className={s.photo} />
      <div className={s.wrapper}>
        <div className={s.infoWrapper}>
            <div className={s.titleWrapper}>
                <h3 className={s.name}>{item.name}</h3>
                <p className={s.suppliers}>{item.suppliers}</p>
            </div>
            <p className={s.price}>₴{item.price}</p>
            </div>
        <div className={s.actions}>
            <button className={s.addBtn} onClick={handleAddToCart}>
                Add to cart
            </button>
            <button className={s.details}>Details</button>
        </div>
      </div>
    </div>
  );
}
