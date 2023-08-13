import React from "react";
import {
  FloatingEmailLabelInput,
  FloatingNameLabelInput,
  FloatingPhoneLabelInput,
} from "./FloatingLabelInput";
import { Day, Month, Year } from "./FloatingDropdown";
import { useState } from "react";
import { useEffect } from "react";
import "./Signup_1.css";

const ModalContent_1 = ({ ...props }) => {
  
  
  const { setErrorMsg,errormsg,user, setUser, error, setError, setPage, page ,phone,setPhone,anyError,setAnyError} = props;
  console.log(errormsg)
  useEffect(() => {
    finalCheck();
  }, [user, error]);

  const finalCheck = () => {
    setAnyError((old)=> ({...old,p1:true}))
    if (
      error?.nameError?.empty === false &&
      ((error.phoneError.empty === false && error.phoneError.valid === true) ||
        (error.emailError.empty === false &&
          error.emailError.valid === true)) &&
      error.dobError.day === false &&
      error.dobError.month === false &&
      error.dobError.year === false
    ) {
      setAnyError(old => ({...old,p1:false}));
    }
  };

  const buttonHandler = () => {
    if (!error.anyError) {
      setPage((p) => p + 1);
    }
  };
  return (
    <>
      <div className="modal_content">
        <h1>Create your account</h1>

        <FloatingNameLabelInput
          className="floatinginput"
          user={user}
          setUser={setUser}
          error={error}
          setError={setError}
          autoFocus
          page={page}
        />

        <p className="nameerror">
          {error?.nameError?.empty === true && "What's your name?"}
        </p>

        {phone ? (
          <FloatingPhoneLabelInput
            className="floatinginput1"
            user={user}
            setUser={setUser}
            error={error}
            setError={setError}
            page={page}
            setErrorMsg={setErrorMsg}
          />
        ) : (
          <FloatingEmailLabelInput
            className="floatinginput1"
            user={user}
            setUser={setUser}
            error={error}
            setError={setError}
            page={page}
            setErrorMsg={setErrorMsg}
          />
        )}

        {phone ? (
          <>
            {error.phoneError.empty && (
              <p className="phoneerror"> Enter a phone number!</p>
            )}
            {error.phoneError.valid === false && (
              <p className="phoneerror">Enter a valid phone number! </p>
            )}
            {errormsg && (
              <p className="phoneerror">{errormsg} </p>
              
            )}
          </>
        ) : (
          <>
            {error?.emailError?.empty && (
              <p className="phoneerror"> Enter an email Id!</p>
            )}
            {error?.emailError?.valid === false && (
              <p className="phoneerror">Enter a valid email Id! </p>
            )}
            {errormsg && (
              <p className="phoneerror">{errormsg} </p>
            )}
          </>
        )}

        <a
          onClick={() => {
            setPhone(!phone);
            setError((old) => ({
              ...old,
              emailError: { ...old.emailError, empty: null, valid: null },
              phoneError: { ...old.phoneError, empty: null, valid: null },
            }));
            setUser((old) => ({ ...old, phone: null, email: null }));
          }}
        >
          {phone ? "Use Email instead" : "Use Phone instead"}
        </a>

        <h4>Date of birth</h4>
        <p className="dob_consent">
          This will not be shown publicly. Confirm your own age, even if this
          account is for a business, a pet, or something else.
        </p>
        <div className="birth">
          <Month
            user={user}
            setUser={setUser}
            error={error}
            setError={setError}
            page={page}
          />
          <Day
            user={user}
            setUser={setUser}
            error={error}
            setError={setError}
            page={page}
          />
          <Year
            user={user}
            setUser={setUser}
            error={error}
            setError={setError}
            page={page}
          />
        </div>
      </div>
      <button
        className={`next__button ${!anyError.p1 && "btnEnable"}`}
        onClick={buttonHandler}
      >
        Next
      </button>
    </>
  );
};

export default ModalContent_1;
