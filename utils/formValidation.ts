import * as Yup from "yup";

export const emailValidation = Yup.string()
  .email(() => "Please enter a valid email address.")
  .min(3, () => "Email must be at least 3 characters long.")
  .max(50, () => "Email must be less than 50 characters long.")
  .required(() => "Email is required.");

export const passwordValidation = Yup.string()
  .min(8, () => "Password must be at least 8 characters long.")
  .max(100, () => "Password must be less than 100 characters long.")
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    () =>
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
  )
  .matches(/[0-9]/, () => "Password must contain at least one number.")
  .required(() => "Password is required.");

export const confirmPasswordValidation = Yup.string()
  .oneOf([Yup.ref("password")], "Passwords must match.")
  .required("Please confirm your password.");

export const nameValidation = Yup.string()
  .min(3, () => "Name must be at least 3 characters long.")
  .max(100, () => "Name must be less than 100 characters long.")
  .required(() => "Name is required.");

export const signinValidation = Yup.object().shape({
  name: nameValidation,
  email: emailValidation,
  password: passwordValidation,
});

export const signupValidation = Yup.object().shape({
  name: nameValidation,
  email: emailValidation,
  password: passwordValidation,
  confirmPassword: confirmPasswordValidation,
});