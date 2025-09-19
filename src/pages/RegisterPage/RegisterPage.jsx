import { useDispatch } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { register as registerOp } from "../../redux/auth/operations";
import { useState } from "react";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(registerOp({ name, email, password }));
    if (res.meta.requestStatus === "fulfilled") {
      navigate(from, { replace: true });
    }
  };

  return (
    <section>
      <h1>Register</h1>
      <form onSubmit={onSubmit}>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" />
        <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" />
        <button type="submit">Create account</button>
      </form>
      <p>Already have an account? <Link to="/login" state={{ from: location }}>Login</Link></p>
    </section>
  );
}
