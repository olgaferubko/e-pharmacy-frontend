import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { loginSchema } from "../../validations/loginSchema";
import { logIn } from "../../redux/auth/operations";
import s from "./LoginModal.module.css";

export default function LoginModal({ isOpen, onClose, onSwitchToSignUp }) {
  const dispatch = useDispatch();
  const modalRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ mode: "onTouched", resolver: yupResolver(loginSchema) });

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
      await dispatch(logIn(values)).unwrap();
      toast.success("Login successful!");
      onClose();
    } catch (err) {
      toast.error(typeof err === "string" ? err : "Login failed");
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

        <h2 className={s.title}>Log in to your account</h2>
        <p className={s.subtitle}>Please login to your account before continuing.</p>

        <form className={s.form} onSubmit={handleSubmit(submit)} noValidate>
          <input
            type="email"
            placeholder="Email address"
            autoComplete="email"
            className={`${s.input} ${errors.email ? s.inputError : ""}`}
            {...register("email")}
          />
          {errors.email && <p className={s.err}>{errors.email.message}</p>}

          <input
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            className={`${s.input} ${errors.password ? s.inputError : ""}`}
            {...register("password")}
          />
          {errors.password && <p className={s.err}>{errors.password.message}</p>}

          <div className={s.wrapper}>
            <button type="submit" disabled={isSubmitting} className={s.submit}>
              {isSubmitting ? "Logging in..." : "Log in"}
            </button>
            <button
              type="button"
              className={s.link}
              onClick={() => {
                onClose();
                onSwitchToSignUp?.();
              }}
            >
              Don't have an account?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
