import { Link } from "react-router-dom";
import s from "./LoginBtn.module.css";

const LoginButton = ({ variant = "white" }) => {
  const cls = `${s.btn} ${variant === "green" ? s.green : s.white}`;
  return (
    <Link to="/login" className={cls}>
      Login
    </Link>
  );
};

export default LoginButton;