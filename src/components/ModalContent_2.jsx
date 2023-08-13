import React from "react";
import "./Signup_1.css";
import "./ModalContent_2.css";
import { useState } from "react";

const ModalContent_2 = ({setPage}) => {
  const [checked, setChecked] = useState(true);

  return (
    <div className="modal_content modal_2">
      <h1>Customize your experience</h1>
      <h2>Track where you see X content across the web</h2>

      <div className="selector">
        <input
          checked={checked}
          id="bordered-checkbox-2"
          type="checkbox"
          value={checked}
          name="bordered-checkbox"
          onClick={(e) => setChecked(!checked)}
        />
        <label
          for="bordered-checkbox-2"
          class="w-full  text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          X uses this data to personalize your experience. This web browsing
          history will never be stored with your name, email, or phone number.
        </label>
      </div>
      <p>
        By signing up, you agree to our <a>Terms, Privacy Policy</a>, and{" "}
        <a>Cookie Use</a>. X may use your contact information, including your
        email address and phone number for purposes outlined in our Privacy
        Policy. <a>Learn more</a>
      </p>
      <button
        className={`next__button btnEnable`}
        onClick={() => setPage(old => old+1 )}
      >
        Next
      </button>
    </div>
  );
};

export default ModalContent_2;
