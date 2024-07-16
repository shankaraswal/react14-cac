import React from "react";

export default function Button({
  children,
  type = "button",
  bgColor = "bg-red-500",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      className={`py-3 rounded-lg text-xl ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
