import React, { useEffect, useState } from "react";
import Custom_Input from "../utils/Custom_Input";
import CustomButton from "../utils/CustomButton";
import { useFormik } from "formik";
import { resetPasswordSchema } from "../schemas";
import { useFirebase } from "../context/Firebase";

const ForgotPassword = () => {
  const creds = {
    email: "",
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: creds,
    validationSchema: resetPasswordSchema,
    onSubmit: async (values, action) => {
      await resetPassword({ values });
      action.resetForm();
    },
  });

  const [disable, setDisable] = useState(true);

  const stDisable = () => {
    if (!Boolean(touched.email)) {
      setDisable((old) => true);
    }
    if (Boolean(touched.email)) {
      if (Boolean(errors.email)) {
        setDisable((old) => true);
      }
      if (!Boolean(errors.email)) {
        setDisable((old) => false);
      }
    }
  };

  useEffect(() => {
    setFirebaseError((old) => "");
    setTimeout(() => {
      setFirebaseRes((old) => "");
    }, 4000);

    stDisable();
  }, [errors, touched, values]);

  const [firebaseError, setFirebaseError] = useState("");
  const [firebaseRes, setFirebaseRes] = useState("");

  const firebase = useFirebase();

  const resetPassword = async ({ values }) => {
    try {
      await firebase.resetPassword({ values }).then(() => {
        setFirebaseRes(
          (old) => (old = `Password reset link sent to ${values.email}`)
        );
      });
    } catch (error) {
      setFirebaseError((old) => error);
    }
  };

  return (
    <form className="!mt-16" onSubmit={handleSubmit}>
      <h1 className="">Recover Password.</h1>
      <h2 className="text-white mt-10 text-xl font-bold ">
        Send recovery email.
      </h2>
      <p className="text-[red] py-0 ">
        {errors.email ? errors.email : <html>&nbsp;</html>}
      </p>
      <Custom_Input
        containerStyles={"w-full mt-2 "}
        placeHolder={"Enter Email"}
        name="email"
        type="email"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.email}
      />

      <CustomButton
        type="submit"
        text="Send Email"
        containerStyles={"bg-white mt-4 mb-auto"}
        disabled={isSubmitting}
        loader
      />
      {firebaseError && (
        <p className="text-[red] pt-5 text-xl text-center">
          {firebaseError.code
            .substring(
              firebaseError.code.indexOf("/") + 1,
              firebaseError.code.length
            )
            .replaceAll("-", " ")
            .toUpperCase()}
        </p>
      )}
      {firebaseRes && (
        <p className="text-[green] pt-5 text-center text-l font-semibold">
          {firebaseRes}
        </p>
      )}
    </form>
  );
};

export default ForgotPassword;
