import React from "react";
import "./ModalContent_5.css";

const ModalContent_5 = ({ setPage }) => {
  const clickHandler = () => {
    setPage(1);
  };
  return (
    <div className="modal_content" id="modalContent_5">
      <h1>Signed up sucessufully.</h1>

      <button className={`next__button  btnEnable`} onClick={clickHandler}>
        Go to Home
      </button>
    </div>
  );
};

export default ModalContent_5;
