import React from "react";

const InputSearch = ({
  children: icon,
  type,
  buttonText,
  placeholder,
  className,
  variant,
  onChange,
  defaultValue,
  value,
  min,
  max,
  maxLength
}) => {
  const addClassName = className ? `${className}` : "";
  const variants = {
    "left-input": "rounded-l-lg border border-gray-300",
    "right-input": "border border-gray-300 rounded-r-lg",
    "center-input": "border border-gray-300",
    "rounded-input": "border border-gray-300 rounded-lg",
  };

  const pickVariant = variants[variant];

  return (
    <div
      className={
        variants === "center-input" || variant === "right-input"
          ? "relative right-1"
          : "relative"
      }
    >
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        {icon}
      </div>
      {variant === "left-input" || variant === "center-input" || variant === "right-input" || "rounded-input" ? (
        <input
          type={type}
          className={`block p-4 pl-11 w-full text-sm text-gray-900 bg-white focus:outline-none ${pickVariant} ${addClassName}`}
          placeholder={placeholder}
          onChange={onChange}
          defaultValue={defaultValue}
          value={value}
          min={min}
          max={max}
          maxLength={maxLength}
        />
      ) : null}
      {/* {variant === "right-input" ? (
        <button
          type={type}
          className="text-white absolute right-3.5 bottom-2.5 bg-gray-900 hover:bg-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
        >
          {buttonText}
        </button>
      ) : (
        ""
      )} */}
    </div>
  );
};

export default InputSearch;
