import React, { useEffect, useState } from "react";
import { FloatingAnyLabelInput } from "./FloatingLabelInput";
import "./ModalContent_4.css";
import { useNavigate } from "react-router-dom";

const ModalContent_4 = ({
  user,
  setUser,
  error,
  setError,
  handleFocus,
  page,
  anyError,
  setAnyError,
  setPage,
  mainUser,
  setMainUser,
  onSubmit,
  errormsg,
  setErrorMsg,
}) => {
  const navigate = useNavigate();
  const handleChange = (e) => {
    setUser((old) => ({
      ...old,
      pass: { ...user.pass, [e.target.name]: e.target.value },
    }));
  };

  const handleFocusOut = () => {
    if (!user.pass.pass || !user.cpass) {
      setError((old) => ({
        ...old,
        passError: { ...old.passError, empty: true, match: null, valid: null },
      }));
    }
    if (user.pass.pass && user.pass.cpass) {
      setError((old) => ({
        ...old,
        passError: {
          ...old.passError,
          empty: false,
          match: false,
          valid: false,
        },
      }));

      if (user.pass.pass === user.pass.cpass) {
        setError((old) => ({
          ...old,
          passError: { ...old.passError, match: true },
        }));
      }
      if (user.pass.pass.length >= 8) {
        setError((old) => ({
          ...old,
          passError: { ...old.passError, valid: true },
        }));
      }
    }
  };

  useEffect(() => {
    setAnyError((old) => ({ ...old, p4: true }));
    if (
      error.passError.empty === false &&
      error.passError.valid === true &&
      error.passError.match === true
    ) {
      setAnyError((old) => ({ ...old, p4: false }));
      setMainUser((old) => ({
        ...old,
        displayName: user.name,
        birth: user.dob.dob,
        userName: user.email.substring(0, user.email.indexOf("@")),
        email: user.email,
        password: user.pass.pass,
      }));
    }
  }, [user.pass, error.passError]);

  const [pressed, setPressed] = useState(false);
  useEffect(() => {
    if (pressed) {
        console.log('1',errormsg)
      if (!anyError.p4) {
        console.log("2",errormsg)
        if (page === 4 && errormsg) {
          setPage(1);
          console.log('3',errormsg)
        }
        if (page === 4 && !errormsg) {
          setPage(5);
          console.log('4',errormsg)
        }
      }
    }
    setPressed(false);
  }, [pressed,errormsg]);

  const buttonHandler = async (e) => {
    if (!anyError.p4) {
      await onSubmit(e);
      setPressed(true);
    }
  };

  return (
    <div className="modal_content" id="modal_content4">
      <h2>Create a password</h2>
      <FloatingAnyLabelInput
        type="text"
        label="Enter a password"
        name="pass"
        user={user}
        setUser={setUser}
        error={error}
        setError={setError}
        handleFocus={handleFocus}
        page={page}
        handleChange={handleChange}
        handleFocusOut={handleFocusOut}
        value={user.pass.pass}
      />
      <h2> Confirm your password</h2>
      <FloatingAnyLabelInput
        type="text"
        label="Confirm password"
        name="cpass"
        user={user}
        setUser={setUser}
        error={error}
        setError={setError}
        handleFocusOut={handleFocusOut}
        page={page}
        handleChange={handleChange}
        value={user.pass.cpass}
      />
      {error.passError.valid === false && <p>Password is not strong.</p>}
      {error.passError.match === false && <p>Password does not match.</p>}
      <button 
        className={`next__button  disabled:cursor-not-allowed ${anyError.p4 === false && "btnEnable"}`}
        onClick={(e) => buttonHandler(e)}
      >
        Next
      </button>
    </div>
  );
};

export default ModalContent_4;
