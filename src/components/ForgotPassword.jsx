import React, { useEffect, useState } from "react";
import Custom_Input from "../utils/Custom_Input";
import CustomButton from "../utils/CustomButton";
import { useFormik } from "formik";
import { resetPasswordSchema } from "../schemas";

const ForgotPassword = () => {
  const [creds, setCreds] = useState({
    email: "",
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: creds,
      validationSchema: resetPasswordSchema,
      onSubmit: (values, action) => {},
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
    stDisable();
  }, [errors, touched]);

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
        value={values.password}
      />

      <CustomButton
        type="submit"
        text="Send Email"
        containerStyles={"bg-white mt-4 mb-auto"}
        onClick={handleSubmit}
        disabled={disable}
      />
    </form>
  );
};

export default ForgotPassword;
