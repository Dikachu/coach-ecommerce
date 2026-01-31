import type { InputHTMLAttributes } from "react";
import { forwardRef } from "react";

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ label, error, icon, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`w-full ${icon ? "pl-10" : "pl-4"} pr-4 py-3 border ${
              error ? "border-red-500" : "border-gray-300"
            } rounded-lg border focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-200 accent-primary ${className}`}
            {...props}
          />
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  },
);

AuthInput.displayName = "AuthInput";

export default AuthInput;