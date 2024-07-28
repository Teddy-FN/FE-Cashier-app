import React, { useState } from "react";

// Assets
import ViewPassword from "../../../assets/view-password.png";
import HidePassword from "../../../assets/hide-password.png";

const Input = ({
  htmlFor,
  placeholder,
  label,
  type,
  id,
  name,
  onChange,
  value,
  error,
  errorLabel,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <label
        className="block text-[#828282] text-lg font-semibold"
        htmlFor={htmlFor}
      >
        {label} :
      </label>
      <div className="relative">
        <input
          placeholder={placeholder}
          className="w-full p-2 border-2 border-[#C5C5C5] rounded-full outline-none focus:bg-gray-300"
          type={type !== "password" ? type : showPassword ? "text" : type}
          id={id}
          name={name}
          onChange={onChange}
          value={value}
        />
        {/* Icons Show Password */}
        {type === "password" && (
          <div className="absolute top-[24%] right-[5%]">
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="w-6 h-6 cursor-pointer"
            >
              <img
                src={!showPassword ? HidePassword : ViewPassword}
                alt="password"
                className="object-cover"
              />
            </div>
          </div>
        )}
      </div>
      {error ? <p className="mt-1 text-sm text-red-600">{errorLabel}</p> : null}
    </div>
  );
};

export default Input;
