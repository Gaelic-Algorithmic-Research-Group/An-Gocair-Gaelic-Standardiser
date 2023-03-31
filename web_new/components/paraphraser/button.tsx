// This is an attempt to create a button component that can be used for different purposes
import React from "react";
import classNames from "classnames";

const Button = ({
  children,
  models,
  paraphraseMode,
  actions,
  convert,
  clear,
  copy,
  onClick,
  disabled = false,
}) => {
  // note that here we are using the classNames library to create a dynamic class name
  // this is because we want to use the same button component for different purposes
  // and we want to be able to pass in different props to change the style of the button
  const classes = classNames({
    "flex justify-content:space-between items-center justify-center max-w-md my-2 px-4 py-2 font-medium text-gray-500 border border-transparent rounded-md hover:text-blue-600 focus:text-blue-600 bg-gray-50":
      actions,
    "inline-block rounded-lg font-medium leading-none py-2 px-3 focus:outline-none hover:text-blue-700 focus:text-blue-600 bg-blue-50 text-blue-500":
      models && paraphraseMode === "dev",
    "inline-block rounded-lg font-medium leading-none py-2 px-3 focus:outline-none hover:text-green-700 focus:text-green-600 bg-green-50 text-green-500":
      models && paraphraseMode === "stable",
    "inline-block rounded-lg font-medium leading-none py-2 px-3 focus:outline-none hover:text-yellow-700 focus:text-yellow-600 bg-yellow-50 text-yellow-500":
      models && paraphraseMode === "local",
    "flex items-center justify-center max-w-md my-2 py-2 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md disabled:opacity-60 mx-2 px-7 hover:bg-blue-700 md:py-3 md:text-lg md:px-10":
      convert,
    "flex items-center justify-center max-w-md px-4 py-2 mx-2 font-medium text-red-500 border border-transparent rounded-md hover:text-red-600 focus:text-red-600 bg-red-50":
      clear,
    "flex items-center justify-center max-w-md px-4 py-2 font-medium text-gray-500 border border-transparent rounded-md hover:text-blue-600 focus:text-blue-600 bg-gray-50":
      copy,
  });
  return (
    <button className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
