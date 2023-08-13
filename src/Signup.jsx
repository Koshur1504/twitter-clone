import React, { useEffect, useState } from "react";
import { useFirebase } from "./context/Firebase";
import { useNavigate } from "react-router-dom";
import x from "./assets/x.svg";
import google from "./assets/google.svg";
import AppleIcon from "@mui/icons-material/Apple";
import "./Signup.css";
import Signup_1 from "./components/Signup_1";
import Login from "./components/Login";

const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    displayName: "",
    birth: undefined,
    userName: "",
    email: "",
    password: "",
  });

  const [errormsg, setErrorMsg] = useState("");
  const [page, setPage] = useState(1);

  const firebase = useFirebase();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await firebase.signupUserWithEmailAndPassword({ user });
      setErrorMsg("");
    } catch (error) {
      setErrorMsg(
        error.code?.substring(error.code.indexOf("/") + 1, error.code.length)
      );
    }
  };

  useEffect(() => {
    if (page === 1 && firebase.isLoggedIn) {
      {
        navigate("/home");
      }
    }
  }, [firebase, navigate, page]);

  const handleGoogle = async () => {
    try {
      await firebase.signInWithGoogle();
    } catch (error) {
      setErrorMsg(
        error.code?.substring(error.code.indexOf("/") + 1, error.code.length)
      );
    }
  };
  const handleApple = async () => {
    try {
      firebase.signInWithApple();
    } catch (error) {
      console.log(error);
    }
  };

  const [open, setOpen] = useState(false);
  const handleModal = () => {
    setOpen(!open);
    setLogin(false);
  };
  const [login, setLogin] = useState(false);
  const handleSignin = () => {
    setLogin(!login);
    setOpen(false);
  };
  const footerLinks = [
    "About",
    "Help Center",
    "Terms of Service",
    "Privacy Policy",
    "Cookie Policy",
    "Accessibility",
    "Ads",
    "info",
    "Blog",
    "Status",
    "Careers",
    "Brand Resources",
    "Advertising",
    "Marketing",
    "Twitter for Business",
    "Developers",
    "Directory",
    "Settings",
    "© 2023 X Corp.",
  ];
  return (
    <div id="MainSignup" className={`Signup_page ${open && "hiddenscroll"}`}>
      <div className="Signup">
        <div className="image">
          <img src={x} alt="" />
        </div>
        <div className="Signup_section">
          <img src={x} alt="" />
          <h1>Happening now</h1>
          <h3>Join Twitter today.</h3>
          <div className="section">
            <button className="google_button" onClick={handleGoogle}>
              <img src={google} alt="" />
              <p>&nbsp; Sign up with Google</p>
            </button>
            <button className="apple_button" onClick={handleApple}>
              <AppleIcon className="Apple_icon" />
              <p>&nbsp;Sign up with Apple</p>
            </button>

            <div className="separator">
              <div className="line"></div>
              <p>or</p>
              <div className="line"></div>
            </div>

            <button className="create_account" onClick={handleModal}>
              <p>&nbsp; &nbsp;Create account</p>
            </button>
            <p className="terms">
              By signing up, you agree to the <a href="">Terms of Service</a>{" "}
              and <a href="">Privacy Policy</a>, including{" "}
              <a href="">Cookie Use.</a>
            </p>
            <h4>Already have an acount?</h4>
            <button className="another_button" onClick={handleSignin}>
              <p>Sign in</p>
            </button>
          </div>
        </div>
      </div>
      <footer>
        <ul>
          {footerLinks.map((item) => (
            <li key={item} className="footer_item">
              <a>{item}</a>
            </li>
          ))}
        </ul>
      </footer>
      {open && (
        <Signup_1
          handleModal={handleModal}
          page={page}
          setPage={setPage}
          setMainUser={setUser}
          mainUser={user}
          onSubmit={onSubmit}
          errormsg={errormsg}
          setErrorMsg={setErrorMsg}
        />
      )}
      {login && (
        <Login
          handleX={handleSignin}
          page={page}
          setPage={setPage}
          openSignUp={handleModal}
        />
      )}
    </div>
  );
};

export default Signup;
