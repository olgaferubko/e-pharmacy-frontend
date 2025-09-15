import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "../../validation/signupSchema";
import s from "./LoginModal.module.css"; 

export default function SignUpModal({ isOpen, onClose, onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ mode: "onTouched", resolver: yupResolver(signupSchema) });

  const modalRef = useRef(null);

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

  if (!isOpen) return null;

  const submit = async (data) => {
    await Promise.resolve(onSubmit?.(data));
  };

  return (
    <div className={s.backdrop} onMouseDown={onBackdrop} role="dialog" aria-modal="true">
      <div className={s.modal} ref={modalRef} onMouseDown={(e) => e.stopPropagation()}>
        <button className={s.closeBtn} type="button" onClick={onClose} aria-label="Close">
          <svg className={s.closeIcon} aria-hidden="true">
            <use href="/icons.svg#icon-cross" />
          </svg>
        </button>

        <h2 className={s.title}>Sign Up</h2>
        <p className={s.subtitle}>Before proceeding, please register on our site.</p>

        <form className={s.form} onSubmit={handleSubmit(submit)} noValidate>
          <div className={s.field}>
            <input
              type="text"
              placeholder="User Name"
              autoComplete="name"
              className={`${s.input} ${errors.name ? s.inputError : ""}`}
              {...register("name")}
            />
            {errors.name && <p className={s.error}>{errors.name.message}</p>}
          </div>

          <div className={s.field}>
            <input
              type="email"
              placeholder="Email address"
              autoComplete="email"
              className={`${s.input} ${errors.email ? s.inputError : ""}`}
              {...register("email")}
            />
            {errors.email && <p className={s.error}>{errors.email.message}</p>}
          </div>

          <div className={s.field}>
            <input
              type="tel"
              placeholder="Phone number"
              autoComplete="tel"
              className={`${s.input} ${errors.phone ? s.inputError : ""}`}
              {...register("phone")}
            />
            {errors.phone && <p className={s.error}>{errors.phone.message}</p>}
          </div>

          <div className={s.field}>
            <input
              type="password"
              placeholder="Password"
              autoComplete="new-password"
              className={`${s.input} ${errors.password ? s.inputError : ""}`}
              {...register("password")}
            />
            {errors.password && <p className={s.error}>{errors.password.message}</p>}
          </div>

          <button type="submit" disabled={isSubmitting} className={s.submit}>
            {isSubmitting ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <div className={s.footerText}>Already have an account?</div>
      </div>
    </div>
  );
}