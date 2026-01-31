import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "@/components/layouts/AuthLayout";
import AuthInput from "@/components/auth/AuthInput";
import AuthButton from "@/components/auth/AuthButton";
import Divider from "@/components/auth/Divider";
import { db } from "@/firebase/config";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { AuthContext } from "@/context/AuthContext";
import GoogleButton from "@/components/auth/GoogleButton";

function SignUp() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // if (!formData.phone) {
    //   newErrors.phone = "Phone number is required";
    // } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
    //   newErrors.phone = "Invalid phone number";
    // }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    // if (!formData.confirmPassword) {
    //   newErrors.confirmPassword = "Password confirm is required";
    // } else if (formData.confirmPassword.length < 8) {
    //   newErrors.confirmPassword = "Password must be at least 8 characters";
    // }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!acceptedTerms) {
      newErrors.terms = "You must accept the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const useAuth =  useContext(AuthContext);
  // const { loading } = useAuth || {};
  if (!useAuth) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const userCredential = (
        await useAuth.signup(formData.email.trim(), formData.password.trim())
      );

      const user = userCredential.user;
      
      if (user.uid) {
        await setDoc(doc(db, "users", user.uid), {
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          role: "user", // default role
          createdAt: serverTimestamp(),
        });
      }

      toast.success("Account created successfully!");
      navigate("/signin");
    } catch (error) {
      if (error instanceof Error) {
        // setLoading(false);
        console.error(error.message);
      } else {
        console.error("An unknown error occurred");
      }
    }finally {
      setLoading(false);
    }
  };

  // const handleGoogleSignUp = async () => {
  //   // setLoading(true);
  //   try {
  //     const user = await signInWithGoogle();
  //     if (!user) throw new Error("Google sign-in failed");

  //     // Check if user doc exists
  //     const userDocRef = doc(db, "users", user.uid);
  //     const userSnap = await getDoc(userDocRef);

  //     if (!userSnap.exists()) {
  //       // Create user profile
  //       await setDoc(userDocRef, {
  //         firstName: user.displayName?.split(" ")[0] || "",
  //         lastName: user.displayName?.split(" ").slice(1).join(" ") || "",
  //         email: user.email || "",
  //         phone: user.phoneNumber || "",
  //         role: "user",
  //         createdAt: serverTimestamp(),
  //       });
  //       toast.success("Account created successfully!");
  //     } else {
  //       toast.success("Welcome back!");
  //     }

  //     // Redirect or do post-login logic
  //     // navigate("/dashboard"); // change to your route
  //   } catch (error) {
  //     const errorMessage =
  //       error instanceof Error ? error.message : "Google sign-in failed";
  //     toast.error(errorMessage);
  //     // console.log(errorMessage);
  //   } finally {
  //     // setLoading(false);
  //   }
  // };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join Cushion to start shopping premium furniture"
    >
      <div id="recaptcha-container"></div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Fields */}
        {/* <div className="grid grid-cols-2 gap-4"> */}
        <AuthInput
          label="Full Name"
          type="text"
          name="name"
          value={formData.name}
          onInput={handleChange}
          error={errors.name}
          placeholder="John Doe"
        />
        {/* <AuthInput
            label="Last Name"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            error={errors.lastName}
            placeholder="Doe"
          /> */}
        {/* </div> */}

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

        {/* Phone */}
        <AuthInput
          label="Phone Number"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
          placeholder="+234 800 000 0000"
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
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
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
          placeholder="Minimum 8 characters"
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

        {/* Confirm Password */}
        <AuthInput
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          placeholder="Re-enter password"
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
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          }
        />

        {/* Terms and Conditions */}
        <div>
          <label className="flex items-start cursor-pointer">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="w-4 h-4 mt-1 text-primary border-gray-300 rounded focus:ring-primary accent-primary cursor-pointer"
            />
            <span className="ml-2 text-sm text-gray-600">
              I agree to the{" "}
              <Link to="/terms" className="text-primary hover:underline">
                Terms and Conditions
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </span>
          </label>
          {errors.terms && (
            <p className="mt-1 text-sm text-red-600">{errors.terms}</p>
          )}
        </div>

        {/* Submit Button */}
        <AuthButton type="submit" loading={loading}>
          Create Account
        </AuthButton>
      </form>

      {/* Divider */}
      <Divider text="Or sign up with" />

      {/* Google Sign Up */}
      <GoogleButton text="Sign up with Google" />

      {/* Sign In Link */}
      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link to="/signin" className="text-primary font-medium hover:underline">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}

export default SignUp;
