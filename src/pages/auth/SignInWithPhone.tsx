import React, { useState, useEffect, useRef } from "react";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import type { ConfirmationResult } from "firebase/auth";// Your firebase config file
import { auth } from "@/firebase/config";

const PhoneAuth: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);
  const [error, setError] = useState<string>("");

  // Use a ref for the verifier to persist it across renders
  const recaptchaRef = useRef<HTMLDivElement | null>(null);
  const verifierInstance = useRef<RecaptchaVerifier | null>(null);

  useEffect(() => {
    if (!verifierInstance.current && recaptchaRef.current) {
      // Initialize the invisible reCAPTCHA
      verifierInstance.current = new RecaptchaVerifier(
        auth,
        recaptchaRef.current,
        {
          size: "invisible",
          callback: () => {
            console.log("reCAPTCHA solved");
          },
        },
      );
    }
  }, []);

  const sendOtp = async () => {
    if (!verifierInstance.current) return;
    try {
      const result = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        verifierInstance.current,
      );
      setConfirmationResult(result);
    } catch (err: unknown) {
      // Type narrowing for the error
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  const verifyOtp = async () => {
    if (!confirmationResult) return;
    try {
      const userCredential = await confirmationResult.confirm(otp);
      console.log("User verified:", userCredential.user);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError("Invalid OTP: " + err.message);
      }
    }
  };

  return (
    <div style={{padding: "200px"}}>
      {/* This hidden div is where reCAPTCHA attaches itself */}
      <div ref={recaptchaRef}></div>

      {!confirmationResult ? (
        <>
          <input
            type="tel"
            placeholder="+1234567890"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <button onClick={sendOtp}>Send OTP</button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter 6-digit code"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={verifyOtp}>Verify Code</button>
        </>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default PhoneAuth;