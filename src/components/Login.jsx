import React, { useEffect, useState } from "react";
import "./Login.css";
import { useFirebase, database } from "../context/Firebase";
import { Navigate, useNavigate } from "react-router-dom";
import Custom_Input from "../utils/Custom_Input";
import CloseIcon from "@mui/icons-material/Close";
import x from "../assets/x.svg";
import google from "../assets/google.svg";
import CustomButton from "../utils/CustomButton";
import { useFormik } from "formik";
import { signInSchema } from "../schemas";
import ForgotPassword from "./ForgotPassword";

const Login = ({ handleX, page, setPage, openSignUp }) => {
  const initialValues = {
    email: "",
    password: "",
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
    initialValues: initialValues,
    validationSchema: signInSchema,
    onSubmit: async (values, action) => {
      await handleSignIn({ values });
    },
  });

  const [firebaseError, setFireBaseError] = useState("");

  const navigate = useNavigate();

  const firebase = useFirebase();

  useEffect(() => {
    setPage(1);
    setFireBaseError("");
    if (page === 1 && firebase.isLoggedIn) {
      navigate("/home");
    }
  }, [firebase, navigate, values]);

  const handleSignIn = async ({ values }) => {
    try {
      await firebase.handleSignIn({ values });
    } catch (error) {
      setFireBaseError(error);
    }
  };

  const handleGoogle = async () => {
    try {
      await firebase.signInWithGoogle();
    } catch (error) {
      setFireBaseError(error);
    }
  };
  const handleModal = () => {
    handleX();
  };

  // Forgot password section
  // create modal state and function to toggle it
  const [forgotPassword, setForgotPassword] = useState(false);
  const handleForgotPassword = () => {
    setForgotPassword((old) => !old);
  };

  const signupButton = () => {
    handleX();
    openSignUp();
  };

  return (
    <div className={`loginPage`}>
      <div className="Modal">
        <button className="cross__button" onClick={handleModal}>
          <CloseIcon className="cross hover:!bg-[rgba(255,255,255,0.1)] border-1 rounded-full !p-2 !box-content hover:bg-[rgb(255, 255, 255, 0.2)] !mb-[-4px]" />
        </button>
        <div className="login">
          <img className="X_image" src={x} alt="" />
          {!forgotPassword ? (
            <>
              <h1>Sign in to X</h1>
              <CustomButton
                text="Sign in with Google"
                containerStyles={"bg-white mt-4 mb-4 responsive"}
                icon={google}
                onClick={handleGoogle}
                loader="true"
              />
              <div className="separator mb-6">
                <div className="line"></div>
                <p>or</p>
                <div className="line"></div>
              </div>

              <form onSubmit={handleSubmit}>
                <Custom_Input
                  containerStyles={"w-full mb-4"}
                  placeHolder="Email"
                  name="email"
                  type="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                {errors.email && touched.email && (
                  <p className="Error_login">{errors.email}</p>
                )}
                <Custom_Input
                  containerStyles={"w-full mb-4"}
                  placeHolder={"Password"}
                  name="password"
                  type="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                {errors.password && touched.password && (
                  <p className="Error_login">{errors.password}</p>
                )}
                {firebaseError && (
                  <p className="Error_login">
                    {firebaseError.code
                      .substring(
                        firebaseError.code.indexOf("/") + 1,
                        firebaseError.code.length
                      )
                      .replaceAll("-", " ")
                      .toUpperCase()}
                  </p>
                )}
                <CustomButton
                  type="submit"
                  text="Sign in"
                  containerStyles={"bg-white mb-4 responsive"}
                  loader="true"
                  disabled={isSubmitting}
                />
              </form>
              <CustomButton
                text="Forgot Password?"
                textColor="text-white"
                containerStyles="border responsive"
                loader="true"
                onClick={handleForgotPassword}
              />
            </>
          ) : (
            <>
              <ForgotPassword />
            </>
          )}
          {forgotPassword && (
            <p className="para mt-auto ">
              Back to{" "}
              <a
                className="hover:cursor-pointer"
                onClick={() => setForgotPassword((old) => false)}
              >
                Login
              </a>
            </p>
          )}
          <p className={`para mb-16 ${!forgotPassword && "mt-auto"}`}>
            Don't have an account?&nbsp;
            <a className="hover:cursor-pointer" onClick={signupButton}>
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
