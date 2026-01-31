import type { UserCredential, User } from "firebase/auth";

export interface UserInfo {
    uid: string;
    name: string | null;
    email: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface AuthContextType {
    user: User | null;
    loading: boolean;
    signup: (email: string, password: string) => Promise<UserCredential>;
    login: (email: string, password: string) => Promise<UserCredential>;
    logout: () => Promise<void>;
    googleSignIn: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    updateUserProfile: (displayName: string, photoURL?: string) => Promise<void>;
}