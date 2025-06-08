'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  Lock, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  AlertTriangle, 
  Shield, 
  Key,
  Loader2,
  ArrowLeft
} from 'lucide-react';
import toast from 'react-hot-toast';
import { ResetPassword } from '@/app/api/auth.service';

const PasswordStrengthIndicator = ({ password }) => {
  const getStrength = (pass) => {
    if (!pass) return { score: 0, text: '', color: '' };
    
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[a-z]/.test(pass)) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    
    const levels = [
      { score: 0, text: '', color: '' },
      { score: 1, text: 'Very Weak', color: 'bg-red-500' },
      { score: 2, text: 'Weak', color: 'bg-orange-500' },
      { score: 3, text: 'Fair', color: 'bg-yellow-500' },
      { score: 4, text: 'Good', color: 'bg-blue-500' },
      { score: 5, text: 'Strong', color: 'bg-green-500' }
    ];
    
    return levels[score];
  };

  const strength = getStrength(password);
  
  if (!password) return null;

  return (
    <div className="mt-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-gray-600">Password Strength</span>
        <span className={`text-xs font-medium ${
          strength.score >= 4 ? 'text-green-600' : 
          strength.score >= 3 ? 'text-blue-600' : 
          strength.score >= 2 ? 'text-yellow-600' : 
          'text-red-600'
        }`}>
          {strength.text}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all duration-300 ${strength.color}`}
          style={{ width: `${(strength.score / 5) * 100}%` }}
        />
      </div>
    </div>
  );
};

const InputField = ({ 
  label, 
  type, 
  name, 
  value, 
  onChange, 
  required = true, 
  placeholder,
  showToggle = false,
  onToggleShow,
  showPassword = false,
  children
}) => (
  <div className="space-y-2">
    <label className="block text-xs sm:text-sm font-medium text-gray-700">{label}</label>
    <div className="relative">
      <input
        type={showToggle ? (showPassword ? 'text' : 'password') : type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
        required={required}
        placeholder={placeholder}
      />
      {showToggle && (
        <button
          type="button"
          onClick={onToggleShow}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
        >
          {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
        </button>
      )}
    </div>
    {children}
  </div>
);

export default function ResetPasswordPage() {
  const { token } = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    // Check if token exists in URL
    if (!token) {
      toast.error('Invalid or missing reset token');
      // Uncomment the line below for production
      // router.push('/');
      console.log('Would redirect to / due to missing token');
    }
  }, [token, router]);

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) errors.push('At least 8 characters');
    if (!/[a-z]/.test(password)) errors.push('One lowercase letter');
    if (!/[A-Z]/.test(password)) errors.push('One uppercase letter'); 
    if (!/[0-9]/.test(password)) errors.push('One number');
    if (!/[^A-Za-z0-9]/.test(password)) errors.push('One special character');
    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');

    // Real-time validation
    const newErrors = { ...validationErrors };
    
    if (name === 'password') {
      const passwordErrors = validatePassword(value);
      if (passwordErrors.length > 0) {
        newErrors.password = passwordErrors;
      } else {
        delete newErrors.password;
      }
    }

    if (name === 'confirmPassword' || (name === 'password' && formData.confirmPassword)) {
      const confirmValue = name === 'confirmPassword' ? value : formData.confirmPassword;
      const passwordValue = name === 'password' ? value : formData.password;
      
      if (confirmValue && passwordValue !== confirmValue) {
        newErrors.confirmPassword = ['Passwords do not match'];
      } else {
        delete newErrors.confirmPassword;
      }
    }

    setValidationErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!token) {
      toast.error('Reset token is missing');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      toast.error('Passwords do not match');
      return;
    }

    const passwordErrors = validatePassword(formData.password);
    if (passwordErrors.length > 0) {
      setError('Please fix password requirements');
      toast.error('Please fix password requirements');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await ResetPassword({ token, password: formData.password });

      if(res.status == 200){
          toast.success('Password reset successful! Redirecting...');
      }
      
      // Small delay to show success message
      setTimeout(() => {
        router.push('/');
      }, 1500);

    } catch (err) {
      const errorMessage = err.message || 'Failed to reset password. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <Key size={24} className="text-white" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Reset Your Password
          </h1>
          <p className="text-gray-600 text-xs sm:text-sm">
            Create a new secure password for your account
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* New Password Field */}
            <InputField
              label="New Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your new password"
              showToggle={true}
              onToggleShow={() => setShowPassword(!showPassword)}
              showPassword={showPassword}
            >
              <PasswordStrengthIndicator password={formData.password} />
              {validationErrors.password && (
                <div className="mt-2 space-y-1">
                  {validationErrors.password.map((error, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs text-red-600">
                      <AlertTriangle size={12} />
                      <span>{error}</span>
                    </div>
                  ))}
                </div>
              )}
            </InputField>

            {/* Confirm Password Field */}
            <InputField
              label="Confirm New Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm your new password"
              showToggle={true}
              onToggleShow={() => setShowConfirmPassword(!showConfirmPassword)}
              showPassword={showConfirmPassword}
            >
              {validationErrors.confirmPassword && (
                <div className="mt-2">
                  {validationErrors.confirmPassword.map((error, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs text-red-600">
                      <AlertTriangle size={12} />
                      <span>{error}</span>
                    </div>
                  ))}
                </div>
              )}
              {formData.confirmPassword && !validationErrors.confirmPassword && formData.password === formData.confirmPassword && (
                <div className="mt-2 flex items-center gap-2 text-xs text-green-600">
                  <CheckCircle2 size={12} />
                  <span>Passwords match</span>
                </div>
              )}
            </InputField>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
                <AlertTriangle size={20} className="text-red-600 flex-shrink-0" />
                <span className="text-red-800 text-xs sm:text-sm">{error}</span>
              </div>
            )}

            {/* Security Tips */}
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <Shield size={16} className="text-indigo-600" />
                <span className="text-indigo-800 font-medium text-xs sm:text-sm">Security Tips</span>
              </div>
              <ul className="text-[10px] sm:text-xs text-indigo-700 space-y-1">
                <li>• Use a mix of letters, numbers, and symbols</li>
                <li>• Avoid using personal information or common words</li>
                <li>• Make it at least 8 characters long</li>
              </ul>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || Object.keys(validationErrors).length > 0}
              className="text-xs sm:text-sm w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-2 sm:py-3 px-6 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Resetting Password...
                </>
              ) : (
                <>
                  <Lock size={16} />
                  Reset Password
                </>
              )}
            </button>

            {/* Back Button */}
            <button
              type="button"
              onClick={goBack}
              className="text-xs sm:text-sm w-full text-gray-600 hover:text-gray-800 py-2 px-4 rounded-xl font-medium transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <ArrowLeft size={14} />
              Back to Home
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            Having trouble? Contact our support team for assistance.
          </p>
        </div>
      </div>
    </div>
  );
}