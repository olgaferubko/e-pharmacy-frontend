import MedicineItem from "../MedicineItem/MedicineItem";
import s from "./MedicineList.module.css";

export default function MedicineList({ items }) {
  return (
    <div className={s.list}>
      {items.map((item) => (
        <MedicineItem key={item.id} item={item} />
      ))}
    </div>
  );
}
