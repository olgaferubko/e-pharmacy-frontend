import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { loginSchema } from "../../validations/loginSchema";
import { logIn } from "../../redux/auth/operations";
import s from "./LoginPage.module.css";


export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await dispatch(logIn(values)).unwrap();
        toast.success("Login successful!");
        navigate("/");
      } catch (err) {
        toast.error(typeof err === "string" ? err : "Login failed");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <main className={s.page}>
      <header className={s.header}>
        <Link to="/" className={s.brand}>
          <svg className={s.logo} width="32" height="32">
            <use href="/logo-green.svg" />
          </svg>
          <span className={s.brandText}>E-Pharmacy</span>
        </Link>
      </header>

      <section className={s.hero}>
          <h1 className={s.title}>
            Your medication,
              <picture className={s.pill} aria-hidden="true">
                <source
                  media="(min-width: 1200px)"
                  srcSet="/images/pill-desktop.png 1x, /images/pill-desktop@2x.png 2x"
                />
                <source
                  media="(min-width: 768px)"
                  srcSet="/images/pill-tablet.png 1x, /images/pill-tablet@2x.png 2x"
                />
                <img
                  src="/images/pill-mobile.png"
                  srcSet="/images/pill-mobile.png 1x, /images/pill-mobile@2x.png 2x"
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className={s.inlinePill}
                />
              </picture>
                <br />
                delivered Say goodbye 
                <br />
                to all <span className={s.highlight}>your healthcare </span>
                <br />
                worries with us
          </h1>
        <form className={s.form} onSubmit={formik.handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formik.values.email}
            onChange={formik.handleChange}
            className={formik.errors.email && formik.touched.email ? s.inputError : s.input}
          />
          {formik.touched.email && formik.errors.email && <p className={s.err}>{formik.errors.email}</p>}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            className={formik.errors.password && formik.touched.password ? s.inputError : s.input}
          />
          {formik.touched.password && formik.errors.password && <p className={s.err}>{formik.errors.password}</p>}

          <div className={s.wrapper}>
            <button type="submit" className={s.btn} disabled={formik.isSubmitting}>
              {formik.isSubmitting ? "Logging in…" : "Log in"}
            </button>
            <Link className={s.meta} to="/register">Don't have an account?</Link>
          </div>
        </form>
      </section>
              <picture className={s.decor} aria-hidden="true">
                <source
                  media="(min-width: 768px)"
                  srcSet="/images/elements-desktop.png 1x, /images/elements-desktop@2x.png 2x"
                />
                <img
                  src="/images/elements-mobile.png"
                  srcSet="/images/elements-mobile.png 1x, /images/elements-mobile@2x.png 2x"
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </picture>
    </main>
  );
}
