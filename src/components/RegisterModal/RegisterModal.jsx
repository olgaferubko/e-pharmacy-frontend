import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { registerSchema } from "../../validations/registerSchema";
import { register as registerUser } from "../../redux/auth/operations";
import s from "../LoginModal/LoginModal.module.css";

export default function SignUpModal({ isOpen, onClose, onSwitchToLogin }) {
  const dispatch = useDispatch();
  const modalRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ mode: "onTouched", resolver: yupResolver(registerSchema) });

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.querySelector("input")?.focus();
    } else {
      reset();
    }
  }, [isOpen, reset]);

  const onBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const submit = async (values) => {
    try {
      await dispatch(registerUser(values)).unwrap();
      toast.success("Registration successful!");
      onClose();
    } catch (err) {
      toast.error(typeof err === "string" ? err : "Registration failed");
    }
  };

  if (!isOpen) return null;

  return (
    <div className={s.backdrop} onMouseDown={onBackdrop} role="dialog" aria-modal="true">
      <div className={s.modal} ref={modalRef} onMouseDown={(e) => e.stopPropagation()}>
        <button className={s.closeBtn} type="button" onClick={onClose} aria-label="Close">
          <svg className={s.closeIcon} aria-hidden="true">
            <use href="/icons.svg#cross" />
          </svg>
        </button>

        <h2 className={s.title}>Sign Up</h2>
        <p className={s.subtitle}>Before proceeding, please register on our site.</p>

        <form className={s.form} onSubmit={handleSubmit(submit)} noValidate>
          <input
            type="text"
            placeholder="User Name"
            autoComplete="name"
            className={`${s.input} ${errors.name ? s.inputError : ""}`}
            {...register("name")}
          />
          {errors.name && <p className={s.err}>{errors.name.message}</p>}

          <input
            type="email"
            placeholder="Email address"
            autoComplete="email"
            className={`${s.input} ${errors.email ? s.inputError : ""}`}
            {...register("email")}
          />
          {errors.email && <p className={s.err}>{errors.email.message}</p>}

          <input
            type="tel"
            placeholder="Phone number"
            autoComplete="tel"
            className={`${s.input} ${errors.phone ? s.inputError : ""}`}
            {...register("phone")}
          />
          {errors.phone && <p className={s.err}>{errors.phone.message}</p>}

          <input
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            className={`${s.input} ${errors.password ? s.inputError : ""}`}
            {...register("password")}
          />
          {errors.password && <p className={s.err}>{errors.password.message}</p>}

          <div className={s.wrapper}>
            <button type="submit" disabled={isSubmitting} className={s.submit}>
              {isSubmitting ? "Signing up..." : "Sign Up"}
            </button>
            <button
              type="button"
              className={s.link}
              onClick={() => {
                onClose();
                onSwitchToLogin?.();
              }}
            >
              Already have an account?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
