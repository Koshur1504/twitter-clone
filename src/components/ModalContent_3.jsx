import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
  FloatingBirthLabelInput,
  FloatingEmailLabelInput,
  FloatingNameLabelInput,
  FloatingPhoneLabelInput,
} from "./FloatingLabelInput";
import { Day, Month, Year } from "./FloatingDropdown";
import "./Signup_1.css";

const ModalContent_3 = ({ ...props }) => {
  const { user, setUser, error, setError, setPage, page,phone } = props;

  const handleFocus = () => {
    setTimeout(() => setPage(1), 400);
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
          handleFocus={handleFocus}
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
            handleFocus={handleFocus}
            page={page}
          />
        ) : (
          <FloatingEmailLabelInput
            className="floatinginput1"
            user={user}
            setUser={setUser}
            error={error}
            setError={setError}
            handleFocus={handleFocus}
            page={page}
          />
        )}

        

        <div className="birth">
          <FloatingBirthLabelInput
            user={user}
            setUser={setUser}
            error={error}
            setError={setError}
            handleFocus={handleFocus}
            page={page}
          />
        </div>
        <p className="p3p">
          By signing up, you agree to the <a>Terms of Service</a>and {""}
          <a>Privacy Policy</a>, including <a href="">Cookie Use.</a>Twitter may
          use your contact information, including your email address and phone
          number for purposes outlined in our Privacy Policy, like keeping your
          account secure and personalizing our services, including ads.{" "}
          <a href="">Learn more.</a>
          Others will be able to find you by email or phone number, when
          provided, unless you choose otherwise <a href="">here.</a>
        </p>
      </div>
      <button
        className={`next__button  ${
          page === 3 && "btnEnable" 
        }`}
        onClick={buttonHandler}
      >
        Next
      </button>
    </>
  );
};

export default ModalContent_3;
