import React, { useState } from "react";
import { Eye, EyeOff } from 'lucide-react';
import PrevButton from "../Buttons/PrevButton";
import NextButton from "../Buttons/NextButton";

const PasswordStep = ({ formData, handleChange, error, onSubmit, onPrevious, isSubmitting }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Simple password strength calculation
  const getPasswordStrength = (password) => {
    if (!password) return '';
    
    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    
    if (score <= 2) return 'Weak';
    if (score <= 3) return 'Fair';
    if (score <= 4) return 'Good';
    return 'Strong';
  };

  const getStrengthColor = (strength) => {
    switch (strength) {
      case 'Weak': return 'text-red-500';
      case 'Fair': return 'text-orange-500';
      case 'Good': return 'text-blue-500';
      case 'Strong': return 'text-green-500';
      default: return '';
    }
  };

  const passwordStrength = getPasswordStrength(formData.confirmPassword);

  return (
    <>
      <h2 className="text-md sm:text-lg font-bold mb-1 text-violet-800 text-center">
        Create Your Password
      </h2>
      <span className="text-xs text-gray-700 px-1 mb-3">
        Choose a strong password
      </span>
      
      {/* Password Input with Eye Toggle */}
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
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
          disabled={isSubmitting}
        >
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>

      {/* Confirm Password Input with Eye Toggle */}
      <div className="relative w-full max-w-xs mb-2">
        <input
          name="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          value={formData.confirmPassword}
          onChange={handleChange}
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-12 rounded-lg text-sm focus:outline-none w-full"
          placeholder="Confirm Password"
          disabled={isSubmitting}
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
          disabled={isSubmitting}
        >
          {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>

      {/* Password Strength Indicator */}
      {passwordStrength && (
        <div className="w-full max-w-xs mb-3">
          <span className="text-xs text-gray-600">
            Password Strength: <span className={`font-medium ${getStrengthColor(passwordStrength)}`}>
              {passwordStrength}
            </span>
          </span>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="text-red-500 text-xs mb-3 max-w-xs text-center">
          {error}
        </div>
      )}

      {/* Navigation Buttons */}
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

export default PasswordStep;