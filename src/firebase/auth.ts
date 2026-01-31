import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';
import type { User as FirebaseUser } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './config';

// Create user document in Firestore
const createUserDocument = async (user: FirebaseUser, additionalData?: Record<string, unknown>) => {
    if (!user) return;

    const userRef = doc(db, 'users', user.uid);
    const snapshot = await getDoc(userRef);

    if (!snapshot.exists()) {
        const { email, displayName, photoURL } = user;

        try {
            await setDoc(userRef, {
                email,
                displayName,
                photoURL,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
                ...additionalData
            });
        } catch (error) {
            console.error('Error creating user document:', error);
            throw error;
        }
    }

    return userRef;
};

// Sign up with email and password
export const signupWithEmail = async (
    email: string,
    password: string,
) => {
    try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        
        return user;
    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : 'An error occurred');
    }
};

// Login with email and password
export const loginWithEmail = async (email: string, password: string) => {
    try {
        const { user } = await signInWithEmailAndPassword(auth, email, password);
        return user;
    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : 'An error occurred');
    }
};

// Logout
export const logoutUser = async () => {
    try {
        await signOut(auth);
    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : 'An error occurred');
    }
};

// Reset password
export const resetPassword = async (email: string) => {
    try {
        await sendPasswordResetEmail(auth, email);
    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : 'An error occurred');
    }
};

// Update user profile
export const updateUserProfileData = async (
    displayName: string,
    photoURL?: string
) => {
    if (!auth.currentUser) throw new Error('No user logged in');

    try {
        await updateProfile(auth.currentUser, {
            displayName,
            ...(photoURL && { photoURL })
        });

        const userRef = doc(db, 'users', auth.currentUser.uid);
        await setDoc(
            userRef,
            {
                displayName,
                ...(photoURL && { photoURL }),
                updatedAt: serverTimestamp()
            },
            { merge: true }
        );
    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : 'An error occurred');
    }
};

// Google Sign In
export const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
        const { user } = await signInWithPopup(auth, provider);
        await createUserDocument(user);
        return user;
    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : 'An error occurred');
    }
};