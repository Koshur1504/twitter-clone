import * as React from "react";
import CloseIcon from "@mui/icons-material/Close";
import "./Signup_1.css";

import { useState } from "react";

import ModalContent_1 from "./ModalContent_1";
import ModalContent_2 from "./ModalContent_2";
import ModalContent_3 from "./ModalContent_3";
import ModalContent_4 from "./ModalContent_4";
import ModalContent_5 from "./ModalContent_5";

const Signup_1 = ({
  handleModal,
  page,
  setPage,
  mainUser,
  setMainUser,
  onSubmit,
  errormsg,
  setErrorMsg,
}) => {
  const [user, setUser] = useState({
    name: null,
    phone: null,
    email: null,
    dob: {
      month: null,
      day: null,
      year: null,
      dob: null,
    },
    pass: { pass: null, cpass: null },
  });
  const [phone, setPhone] = useState(false);
  const [error, setError] = useState({
    nameError: { empty: null },
    phoneError: { empty: null, valid: null },
    emailError: { empty: null, valid: null },
    dobError: { day: null, month: null, year: null },
    passError: { empty: null, valid: null, match: null },
  });
  const [anyError, setAnyError] = useState({
    p1: true,
    p4: true,
  });
  return (
    <div className="modal_">
      <div className="modal">
        <div className="modal_head">
          <button className="cross__button" onClick={handleModal}>
            <CloseIcon className="cross" />
          </button>
          <h3 className="modal_step">Step {page} of 5</h3>
        </div>
        {page === 1 && (
          <ModalContent_1
            user={user}
            setUser={setUser}
            error={error}
            setError={setError}
            page={page}
            setPage={setPage}
            phone={phone}
            setPhone={setPhone}
            anyError={anyError}
            setAnyError={setAnyError}
            errormsg={errormsg}
            setErrorMsg={setErrorMsg}
          />
        )}
        {page === 2 && <ModalContent_2 setPage={setPage} />}
        {page === 3 && (
          <ModalContent_3
            user={user}
            setUser={setUser}
            error={error}
            setError={setError}
            page={page}
            setPage={setPage}
            phone={phone}
          />
        )}
        {page === 4 && (
          <ModalContent_4
            user={user}
            setUser={setUser}
            error={error}
            setError={setError}
            page={page}
            setPage={setPage}
            phone={phone}
            anyError={anyError}
            setAnyError={setAnyError}
            mainUser={mainUser}
            setMainUser={setMainUser}
            onSubmit={onSubmit}
            errormsg={errormsg}
            setErrorMsg={setErrorMsg}
          />
        )}
        {page ===5 && <ModalContent_5  setPage={setPage} />}
      </div>
    </div>
  );
};

export default Signup_1;
