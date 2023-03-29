import React from "react";
import classNames from "classnames";

const Button = ({ children, models, converterActions, onClick }) => {
  const classes = classNames({
    "inline-block rounded-lg font-medium leading-none py-2 px-3 focus:outline-none text-gray-500 hover:text-blue-600 focus:text-blue-600":
      models,
    "flex justify-content:space-between items-center justify-center max-w-md my-2 px-4 py-2 font-medium text-gray-500 border border-transparent rounded-md hover:text-blue-600 focus:text-blue-600 bg-gray-50":
      converterActions,
  });
  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
