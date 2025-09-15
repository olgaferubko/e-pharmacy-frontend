import * as yup from "yup";

const phoneReg = /^(\+)?([0-9\s\-()]){10,15}$/;

export const signupSchema = yup.object({
  name: yup
    .string()
    .trim()
    .min(2, "At least 2 characters")
    .max(50, "Name is too long")
    .required("Name is required"),
  email: yup
    .string()
    .trim()
    .email("Enter a valid email")
    .required("Email is required"),
  phone: yup
    .string()
    .trim()
    .optional()
    .test("phone", "Invalid phone number", (v) => !v || phoneReg.test(v)),
  password: yup
    .string()
    .min(6, "At least 6 characters")
    .matches(/[A-Za-z]/, "Password must contain letters")
    .matches(/\d/, "Password must contain numbers")
    .required("Password is required"),
});
