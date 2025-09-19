import { useDispatch } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { logIn } from "../../redux/auth/operations";
import { useState } from "react";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(logIn({ email, password }));
    if (res.meta.requestStatus === "fulfilled") {
      navigate(from, { replace: true });
    }
  };

  return (
    <section>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" />
        <button type="submit">Sign in</button>
      </form>
      <p>No account? <Link to="/register" state={{ from: location }}>Register</Link></p>
    </section>
  );
}
