import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import PrevButton from "../Buttons/PrevButton";
import NextButton from "../Buttons/NextButton";

const LoginStep = ({ formData, handleChange, error, handleForgotPassword, onSubmit, onPrevious, isSubmitting }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <h2 className="text-md sm:text-lg font-bold mb-1 text-violet-800 text-center">
        Welcome Back {formData.name}!
      </h2>
      <span className="text-xs text-gray-700 px-1 mb-3">
        Enter Your Password
      </span>
      
      {/* Password Input Container */}
      <div className="relative w-full max-w-xs mb-2">
        <input
          name="password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleChange}
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-12 rounded-lg text-sm focus:outline-none w-full"
          placeholder="Enter the Password"
          disabled={isSubmitting}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200 focus:outline-none"
          disabled={isSubmitting}
        >
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>

      {/* Forgot Password Link */}
      <div className="w-full max-w-xs mb-4">
        <button
          type="button"
          onClick={handleForgotPassword}
          disabled={isSubmitting}
          className="text-xs text-violet-600 hover:text-violet-800 underline transition-colors duration-200 disabled:opacity-50"
        >
          {isSubmitting ? 'Sending...' : 'Forgot Password?'}
        </button>
      </div>

      {/* To show error messages */}
      {/* {error && <span className="text-[11px] text-red-500 px-5 mb-2">{error}</span>} */}
      
      <div className="flex flex-row items-center justify-between gap-6">
        <button className="ui-btn" onClick={onPrevious} disabled={isSubmitting}>
          <PrevButton />
        </button>
        <button className="ui-btn" onClick={onSubmit} disabled={isSubmitting}>
          <NextButton isLoading={isSubmitting} />
        </button>
      </div>
    </>
  );
};

export default LoginStep;