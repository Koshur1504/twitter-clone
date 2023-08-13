import React from "react";

const Custom_Input = ({
  containerStyles,
  placeHolder = "Place Holder",
  onChange,
  value,
  type = "text",
  name = "name",
  onBlur,
}) => {
  return (
    <div
      className={`customInput relative w-full p-0 r h-14 autofill:bg-yellow-200${containerStyles}`}
    >
      <input
        name={name}
        type={type}
        className=" pl-3 no-underline box-border bg-black pt-4 border-[1px] text-l act block h-full w-full  text-gray-900 bg-transparent rounded-lg  border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=""
        onChange={onChange}
        value={value}
        onBlur={onBlur}
      />
      <label
        htmlFor="default_outlined"
        className="bg-transparent absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0]  px-2 peer-focus:px-2  peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-1 left-1"
      >
        {placeHolder}
      </label>
    </div>
  );
};

export default Custom_Input;
