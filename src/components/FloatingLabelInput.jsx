import React from "react";
import "./Floatinglabel.css";

const FloatingNameLabelInput = ({ ...props }) => {
  const { user, setUser, error, setError, handleFocus, autoFocus, page } =
    props;

  const nameHandler = (e) => {
    setUser((old) => ({ ...old, name: e.target.value }));
    setError((old) => ({
      ...old,
      nameError: { ...old.nameError, empty: false },
    }));
  };
  const nameErrorHandler = () => {
    if (!user.name) {
      setError((old) => {
        return { ...old, nameError: { ...old.nameError, empty: true } };
      });
    }
    if (user.name) {
      setError((old) => {
        return { ...old, nameError: { ...old.nameError, empty: false } };
      });
    }
  };
  return (
    <div class="relative">
      <input
        data-title="name"
        type="text"
        id="default_outlined"
        className={`default_outlined block px-2.5 pb-2.5 pt-4 w-full text-lg text-gray-900 border-solid bg-transparent rounded-lg border-1 border-gray-100 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer 
        ${error?.nameError?.empty === true && "errorborder"}
        ${error?.nameError?.valid === false && "errorborder"}
        ${page === 3 && "p3"}
        `}
        placeholder=" "
        onChange={(e) => nameHandler(e)}
        value={user.name}
        onBlur={nameErrorHandler}
        onFocus={handleFocus}
        autoFocus={autoFocus}
      />
      <label
        id="label__"
        for="default_outlined"
        class="py-5 absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-transparent px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
      >
        Name
      </label>
    </div>
  );
};

const FloatingPhoneLabelInput = ({
  user,
  setUser,
  error,
  setError,
  handleFocus,
  page,
  setErrorMsg,
}) => {
  const phoneHandler = (e) => {
    setUser((old) => ({ ...old, phone: e.target.value }));
    setErrorMsg("");
  };

  // useEffect(()=>{
  //   phoneErrorHandler()
  // },
  // [user.phone])

  const phoneErrorHandler = () => {
    if (!user.phone) {
      setError((old) => {
        return {
          ...old,
          phoneError: { ...old.phoneError, empty: true, valid: null },
        };
      });
    }
    if (user.phone) {
      setError((old) => {
        return {
          ...old,
          phoneError: { ...old.phoneError, empty: false, valid: false },
        };
      });
      if (user.phone.length === 10 && /^\d+$/.test(user.phone)) {
        setError((old) => {
          return { ...old, phoneError: { ...old.phoneError, valid: true } };
        });
      }
    }
  };

  return (
    <div class="relative">
      <input
        type="text"
        id="default_outlined"
        className={` default_outlined block px-2.5 pb-2.5 pt-4 w-full text-lg text-gray-900 border-solid bg-transparent rounded-lg border-1 border-gray-100 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer 
        ${error.phoneError.empty === true && "errorborder"}
        ${error.phoneError.valid === false && "errorborder"}
        ${page === 3 && "p3"}
        `}
        placeholder=" "
        onChange={(e) => phoneHandler(e)}
        value={user.phone}
        onBlur={phoneErrorHandler}
        onFocus={handleFocus}
      />
      <label
        id="label__"
        for="default_outlined"
        class="py-5 absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-transparent px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
      >
        Phone
      </label>
    </div>
  );
};
const FloatingEmailLabelInput = ({
  user,
  setUser,
  error,
  setError,
  handleFocus,
  page,
  setErrorMsg,
}) => {
  const emailHandler = (e) => {
    setUser((old) => ({ ...old, email: e.target.value }));
    setErrorMsg("");
  };

  // useEffect(()=>{
  //   emailErrorHandler()
  // },
  // [user.email])
  const emailErrorHandler = () => {
    if (!user.email) {
      setError((old) => {
        return {
          ...old,
          emailError: { ...old.emailError, empty: true, valid: null },
        };
      });
    }
    if (user.email) {
      setError((old) => {
        return {
          ...old,
          emailError: { ...old.emailError, empty: false, valid: null },
        };
      });
      if (
        user.email.indexOf("@") === -1 ||
        user.email.indexOf("@") >= user.email.length - 4
      ) {
        setError((old) => {
          return { ...old, emailError: { ...old.emailError, valid: false } };
        });
      }
      if (
        user.email.indexOf("@") !== -1 &&
        user.email.indexOf("@") < user.email.length - 4
      ) {
        setError((old) => {
          return { ...old, emailError: { ...old.emailError, valid: true } };
        });
      }
    }
  };

  return (
    <div class="relative">
      <input
        type="text"
        id="default_outlined"
        className={` default_outlined block px-2.5 pb-2.5 pt-4 w-full text-lg text-gray-900 border-solid bg-transparent rounded-lg border-1 border-gray-100 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer 
        ${error.emailError.empty === true && "errorborder"} 
        ${error.emailError.valid === false && "errorborder"}
        ${page === 3 && "p3"}
        `}
        placeholder=" "
        onChange={(e) => emailHandler(e)}
        value={user.email}
        onBlur={emailErrorHandler}
        onFocus={handleFocus}
      />
      <label
        id="label__"
        for="default_outlined"
        class="py-5 absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-transparent px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
      >
        Email
      </label>
    </div>
  );
};
const FloatingBirthLabelInput = ({
  user,
  setUser,
  error,
  setError,
  handleFocus,
  page,
}) => {
  return (
    <div class="relative p3dobb">
      <input
        type="text"
        id="default_outlined4"
        className={`default_outlined block px-2.5 pb-2.5 pt-4 w-full text-lg text-gray-900 border-solid bg-transparent rounded-lg border-1 border-gray-100 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer 
        ${error.emailError.empty === true && "errorborder"} 
        ${error.emailError.valid === false && "errorborder"}
        ${page === 3 && "p3"} p3bd
        `}
        placeholder=" "
        handleFocus={handleFocus}
        value={user.dob.dob}
        onFocus={handleFocus}
      />
      <label
        id="label__"
        for="default_outlined"
        class="py-5 absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-transparent px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
      >
        Dob
      </label>
    </div>
  );
};

const FloatingAnyLabelInput = ({
  type,
  label,
  user,
  setUser,
  error,
  setError,
  handleFocusOut,
  page,
  handleChange,
  name,
  value,
}) => {
  return (
    <div class="relative p3dobb">
      <input
        name={name}
        type={type}
        id="default_outlined"
        className={`default_outlined block px-2.5 pb-2.5 pt-4 w-full text-lg text-gray-900 border-solid bg-transparent rounded-lg border-1 border-gray-100 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer 
       `}
        placeholder=" "
        onBlur={handleFocusOut}
        onChange={(e) => handleChange(e)}
        value={value}
      />
      <label
        id="label__"
        for="default_outlined"
        class="py-5 absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-transparent px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
      >
        {label}
      </label>
    </div>
  );
};

export {
  FloatingNameLabelInput,
  FloatingEmailLabelInput,
  FloatingPhoneLabelInput,
  FloatingBirthLabelInput,
  FloatingAnyLabelInput,
};
