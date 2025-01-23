import React, { useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

const SignupModal = ({ isOpen, onClose }) => {
  const [activeStep, setActiveStep] = useState("step1");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    countryCode: "+1",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false); // Toggle password visibility
  const router = useRouter();
  const [verificationCode, setVerificationCode] = useState("");

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const closeHandler = () => {
    onClose();
    setActiveStep("step1");
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      countryCode: "+1",
    });
    setErrorMessage("");
    setVerificationCode("");
    setSuccessMessage("");
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const registerWithEmail = async () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setErrorMessage("All fields are required.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    try {
      await axios.post(
        `https://violet-meerkat-830212.hostingersite.com/public/api/register`,
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }
      );

      setSuccessMessage("Registration successful! Sending verification code...");
      await sendVerificationCode(); // Send verification code after successful registration
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again.");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyCode = async () => {
    setIsLoading(true);
    try {
      await axios.post(
        `https://violet-meerkat-830212.hostingersite.com/public/api/verify-code`,
        {
          email: formData.email,
          code: verificationCode,
        }
      );

      setSuccessMessage("Verification successful! Logging you in...");
      // Auto-login the user
      await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      // Redirect to the dashboard
      router.push("/dashboard");
    } catch (error) {
      setErrorMessage("Invalid verification code. Please try again.");
      console.log(error);

    } finally {
      setIsLoading(false);
    }
  };

  const sendVerificationCode = async () => {
    try {
      await axios.post(
        `https://violet-meerkat-830212.hostingersite.com/public/api/send-verification-code`,
        { email: formData.email }
      );
      setSuccessMessage("Verification code sent to your email.");
      handleStepChange("verifyCode");
    } catch (error) {
      console.log(error);
      setErrorMessage("Failed to send verification code. Please try again.");
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };
  const registerWithPhone = async () => {
    if (!formData.name || !formData.phone) {
      setErrorMessage("Name and phone number are required.");
      return;
    }
    setIsLoading(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/register-phone`,
        {
          name: formData.name,
          phone: `${formData.countryCode}${formData.phone}`,
        }
      );
      setSuccessMessage(
        "Registration successful! Please verify the OTP sent to your phone."
      );
      handleStepChange("otpVerification");
    } catch {
      setErrorMessage("An error occurred during phone registration.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await signIn("google", { redirect: false });
      if (result?.error) {
        setErrorMessage("Google Sign-Up failed. Please try again.");
      } else {
        setSuccessMessage("Google Sign-Up successful!");
        handleStepChange("success");
      }
    } catch {
      setErrorMessage("An error occurred during Google Sign-Up.");
    }
  };

  const handleAppleSignUp = async () => {
    try {
      const result = await signIn("apple", { redirect: false });
      if (result?.error) {
        setErrorMessage("Apple Sign-Up failed. Please try again.");
      } else {
        setSuccessMessage("Apple Sign-Up successful!");
        handleStepChange("success");
      }
    } catch {
      setErrorMessage("An error occurred during Apple Sign-Up.");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="SignupModal"
      className="modal signupModal loginModal"
      style={{ display: isOpen ? "flex" : "none" }}
    >
      <div className="loginModal-content">
        <span id="closeLoginModal" className="close-btn" onClick={closeHandler}>
          <i className="fa-solid fa-xmark"></i>
        </span>

        {activeStep === "step1" && (
          <div id="loginStep" className=" login-form-step active">
            <h3>Sign Up</h3>
            <button onClick={handleGoogleSignUp} className="loginContinueIcon">
              <img src="/assets/images/googleLogo.svg" alt="Google Logo" />
              Sign Up with Google
            </button>
            <button className="loginContinueIcon" onClick={handleAppleSignUp}>
              <img src="/assets/images/appleLogo.svg" alt="Apple Logo" />
              Sign Up with Apple
            </button>
            <button
              className="loginContinueIcon"
              onClick={() => handleStepChange("emailSignup")}
            >
              <img src="/assets/images/smsLogo.svg" alt="Email Logo" />
              Sign Up with Email
            </button>
            {/* <button
              className="loginContinueIcon"
              onClick={() => handleStepChange("phoneSignup")}
            >
              <img src="/assets/images/MobileLogo.svg" alt="phone Logo" />
              Sign Up with Phone
            </button> */}
          </div>
        )}

{activeStep === "emailSignup" && (
          <div id="loginEmail" className="login-form-step">
            <div className="d-flex justify-content-center step-heading-and-back">
              <button
                id="backPhoneLogin"
                onClick={() => handleStepChange("step1")}
              >
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              <h3>Sign Up with Email</h3>
            </div>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <div className="password-field">
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? "Hide" : "Show"}
              </button>
            </div>
            <input
              type={passwordVisible ? "text" : "password"}
              id="confirmPassword"
              placeholder="Retype your password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
            {errorMessage && <p className="alert-message">{errorMessage}</p>}
            <button
              className="form-button-1"
              onClick={registerWithEmail}
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Submit"}
            </button>
          </div>
        )}

        {activeStep === "verifyCode" && (
          <div id="loginEmail" className="login-form-step">
            <h3>Verify Email</h3>
            <p>A verification code has been sent to your email. Please enter it below:</p>
            <input
              type="text"
              id="verificationCode"
              placeholder="Enter verification code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
            {errorMessage && <p className="alert-message">{errorMessage}</p>}
            <button
              className="form-button-1"
              onClick={verifyCode}
              disabled={isLoading}
            >
              {isLoading ? "Verifying..." : "Verify"}
            </button>
          </div>
        )}

        {activeStep === "phoneSignup" && (
          <div id="loginStep2" className="login-form-step">
            <div className="d-flex justify-content-center step-heading-and-back">
              <button
                id="backPhoneLogin"
                onClick={() => handleStepChange("Step1")}
              >
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              <h3>Sign Up with Phone</h3>
            </div>

            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <select
              value={formData.countryCode}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  countryCode: e.target.value,
                }))
              }
            >
              <option value="+1">+1 USA</option>
              <option value="+44">+44 UK</option>
              <option value="+91">+91 India</option>
              <option value="+92">+92 PK</option>
            </select>
            <input
              type="text"
              id="phone"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleInputChange}
            />
            {errorMessage && <p className="alert-message ">{errorMessage}</p>}
            <button
              className="form-button-1 "
              onClick={registerWithPhone}
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Submit"}
            </button>
          </div>
        )}

        {activeStep === "success" && (
          <div className="form-step">
            <h3>Registration Complete</h3>
            <p>{successMessage}</p>
            <button id="backPhoneLogin" onClick={closeHandler}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignupModal;
