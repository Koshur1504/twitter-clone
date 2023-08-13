import React, { useEffect, useState } from "react";
import "./FloatingDropdown.css";
import DownArrow from "../assets/DownArrow.svg";
import moment from "moment/moment";

const Month = ({ user, setUser, error, setError, handleFocus,page }) => {
  const [months, setMonths] = useState(moment.months());

  const monthHandler = (e) => {
    setUser((old) => ({
      ...old,
      dob: { ...old.dob, month: parseInt(e.target.value) },
    }));
  };

  // useEffect(() => {
  //   monthErrorHandler();
  // }, [user.dob.month]);

  // const monthErrorHandler = () => {
  //   if (user.dob.month) {
  //     console.log(user.dob.month);
  //     setError((old) => ({
  //       ...old,
  //       dobError: { ...old.dobError, month: false },
  //     }));
  //     setUser((old) => ({
  //       ...old,
  //       dob: { ...old.dob, dob: old.dob.day + old.dob.month + old.dob.year },
  //     }));
  //   }
  // };

  return (
    <div class="relative FloatinDropdown">
      <select
        type="dropdown"
        id="default_outlined1"
        class={` default_outlined block px-2.5 pb-2.5 pt-4 w-10 text-lg text-gray-900 border-solid bg-transparent rounded-lg border-1 border-gray-100 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer
        ${page===3 && 'p3'}`}
        onChange={(e) => monthHandler(e)}
        onFocus={handleFocus}
        value={user.dob.month}
      >
        <option id="option" value="" disabled selected></option>

        {months.map((month, index) => (
          <option key={month} className="option" value={index + 1}>
            {month}
          </option>
        ))}
      </select>
      <img src={DownArrow} alt="" id="downArrow" />
      <label
        id="label__1"
        for="default_outlined1"
        class="___label py-5 absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-transparent px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
      >
        Month
      </label>
    </div>
  );
};

const Day = ({ user, setUser, error, setError, handleFocus,page }) => {
  const [days, setDays] = useState(
    new Date(user.dob.year, user.dob.month, 0).getDate()
  );
  useEffect(() => {
    setDays(new Date(user.dob.year, user.dob.month, 0).getDate());
  }, [user.dob]);

  const dayHandler = (e) => {
    setUser((old) => ({
      ...old,
      dob: { ...old.dob, day: e.target.value },
    }));
  };

  // useEffect(() => {
  //   dayErrorHandler();
  // }, [user.dob.day]);

  // const dayErrorHandler = () => {
  //   if (user.dob.day) {
  //     setError((old) => ({
  //       ...old,
  //       dobError: { ...old.dobError, day: false },
  //     }));
  //     setUser((old) => ({
  //       ...old,
  //       dob: { ...old.dob, dob: old.dob.day + old.dob.month + old.dob.year },
  //     }));
  //   }
  // };
  return (
    <div class="relative day">
      <select
        type="dropdown"
        id="default_outlined1"
        class={` default_outlined block px-2.5 pb-2.5 pt-4 w-10 text-lg text-gray-900 border-solid bg-transparent rounded-lg border-1 border-gray-100 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer
        ${page===3 && 'p3'}`}
        onChange={(e) => dayHandler(e)}
        onFocus={handleFocus}
        value={user.dob.day}
      >
        <option id="optionDay" value="" selected></option>

        {new Array(days).fill("a").map((i, idx) => (
          <option className="optionDay" key={idx} value={idx + 1}>
            {idx + 1}
          </option>
        ))}
      </select>
      <img src={DownArrow} alt="" id="downArrow" />
      <label
        id="label__1"
        for="default_outlined1"
        class="___label py-5 absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-transparent px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
      >
        Day
      </label>
    </div>
  );
};

const Year = ({ user, setUser, error, setError, handleFocus,page }) => {
  const yearHandler = (e) => {
    setUser((old) => ({ ...old, dob: { ...old.dob, year: e.target.value } }));
  };

  const yearErrorHandler = () => {
    if (user.dob.year && user.dob.month && user.dob.day) {
      setError((old) => ({
        ...old,
        dobError: { ...old.dobError, year: false, month: false, day: false },
      }));
      setUser((old) => ({
        ...old,
        dob: { ...old.dob, dob: `${old.dob.day + '-' + moment.months(old.dob.month) +'-'+ old.dob.year}` },
      }));
    }
  };
  useEffect(() => {
    yearErrorHandler();
  }, [user.dob.year, user.dob.month, user.dob.day]);
  return (
    <div class="relative year">
      <select
        type="dropdown"
        id="default_outlined1"
        class={` default_outlined block px-2.5 pb-2.5 pt-4 w-10 text-lg text-gray-900 border-solid bg-transparent rounded-lg border-1 border-gray-100 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer
        ${page===3 && 'p3'}`}
        onChange={(e) => yearHandler(e)}
        onFocus={handleFocus}
        value={user.dob.year}
      >
        <option id="p3dob" value="" selected></option>
        {new Array(120).fill("a").map((i, idx) => (
          <option className="optionDay" key={idx} value={new Date().getFullYear() - (idx + 15)}>
            {new Date().getFullYear() - (idx + 15)}
          </option>
        ))}
      </select>
      <img src={DownArrow} alt="" id="downArrow" />
      <label
        id="label__1"
        for="default_outlined1"
        class="___label py-5 absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-transparent px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
      >
        Year
      </label>
    </div>
  );
};

export { Month, Day, Year };
