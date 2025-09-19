import { Link } from "react-router-dom";
import s from "./RegisterBtn.module.css";

const RegisterButton = ({ variant = "white" }) => {
  const cls = `${s.btn} ${variant === "green" ? s.green : s.white}`;
  return (
    <Link to="/register" className={cls}>
      Register
    </Link>
  );
};

export default RegisterButton;