import * as Yup from "yup";

export const signInSchema = Yup.object({
  email: Yup.string().email()
  // .required("Please enter you Email!")
  ,
  password: Yup.string()
    .min(6, "Password not valid!")
    // .required("Please enter your Password!"),
});

export const resetPasswordSchema = Yup.object({
  email: Yup.string().email().required("Please enter you Email!"),
});
