import s from "./LogoutBtn.module.css";

const LogoutButton = ({ onLogout, variant = "white" }) => {
  const cls = `${s.btn} ${variant === "green" ? s.green : s.white}`;
  return (
    <button type="button" onClick={onLogout} className={cls}>
      Log out
    </button>
  );
};

export default LogoutButton;
