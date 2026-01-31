import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "@/components/layouts/AuthLayout";
import AuthInput from "@/components/auth/AuthInput";
import AuthButton from "@/components/auth/AuthButton";
import Divider from "@/components/auth/Divider";
import { AuthContext } from "@/context/AuthContext";
import GoogleButton from "@/components/auth/GoogleButton";
import { toast } from "react-toastify";
// import Button from "@/components/ui/Button";

function SignIn() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const useAuth = useContext(AuthContext);

  if (!useAuth) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      await useAuth.login(formData.email.trim(), formData.password.trim());
      toast.success("Successfully signed in!");
      navigate("/");
      // Inside your SignIn Page handleSubmit
    } catch (error: unknown) {
      let errorMessage = "An unexpected error occurred. Please try again.";

      // Type guard to check if it's a Firebase error
      if (error && typeof error === "object" && "code" in error) {
        const code = (error as { code: string }).code;

        switch (code) {
          case "auth/invalid-credential":
          case "auth/invalid-login-credentials": // Modern standard code
            errorMessage = "Invalid email or password. Please try again.";
            break;
          case "auth/user-disabled":
            errorMessage = "This account has been disabled.";
            break;
          case "auth/too-many-requests":
            errorMessage = "Too many failed attempts. Please try again later.";
            break;
          case "auth/network-request-failed":
            errorMessage = "Check your internet connection.";
            break;
        }
      }

      setErrors({ general: errorMessage });
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to your account to continue"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <AuthInput
          label="Email Address"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="you@example.com"
          icon={
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          }
        />

        {/* Password */}
        <AuthInput
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="Enter your password"
          icon={
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          }
        />

        {/* Forgot Password */}
        <div className="flex justify-end">
          <Link
            to="/forgot-password"
            className="text-sm text-primary hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit Button */}
        <AuthButton type="submit" loading={loading}>
          Sign In
        </AuthButton>
        {/* <Button type="submit" size="large" additionalClasses="w-full" disabled={loading} variant="primary">
          {loading ? "Signing In..." : "Sign In"}
        </Button> */}
      </form>

      {/* Divider */}
      <Divider text="Or continue with" />

      {/* Google Sign In */}
      <GoogleButton />

      {/* Sign Up Link */}
      <p className="mt-6 text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <Link to="/signup" className="text-primary font-medium hover:underline">
          Sign up
        </Link>
      </p>
    </AuthLayout>
  );
}

export default SignIn;
