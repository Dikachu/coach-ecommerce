import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
// import { doc, getDoc } from "firebase/firestore";
import { auth, db, signInWithGoogle } from "../firebase/config";
import { updateUserProfileData } from "../firebase/auth";
import type { AuthContextType } from "@/types/authTypes";
import { AuthContext } from "./AuthContext";
import { useEffect, useState } from "react";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within AuthProvider");
//   }
//   return context;
// };

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  //   const navigate = useNavigate();

  const signup = async (email: string, password: string) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };

  const login = async (email: string, password: string) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error: unknown) {
      throw new Error(
        error instanceof Error ? error.message : "An error occurred",
      );
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: unknown) {
      throw new Error(
        error instanceof Error ? error.message : "An error occurred",
      );
    }
  };

  const updateUserProfile = async (displayName: string, photoURL?: string) => {
    await updateUserProfileData(displayName, photoURL);
  };

  const googleSignIn = async () => {
    setLoading(true);

    try {
      const user = await signInWithGoogle();
      if (!user) throw new Error("Google sign-in failed");

      // Check if user doc exists
      const userDocRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userDocRef);

      if (!userSnap.exists()) {
        // Create user profile
        await setDoc(userDocRef, {
          name:
            user.displayName?.split(" ")[0] ||
            "" + user.displayName?.split(" ").slice(1).join(" ") ||
            "",
          email: user.email || "",
          phone: user.phoneNumber || "",
          role: "user",
          createdAt: serverTimestamp(),
        });
        toast.success("Account created successfully!");
      } else {
        toast.success("Welcome back!");
      }

      // Redirect or do post-login logic
      //   navigate("/"); // change to your route
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Google sign-in failed";
      toast.error(errorMessage);
      // console.log(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      // console.log(currentUser);

      if (currentUser) {
        // const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        // const userData = userDoc.data();
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    user,
    loading,
    signup,
    login,
    logout,
    googleSignIn,
    resetPassword,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
