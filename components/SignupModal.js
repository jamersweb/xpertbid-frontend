import React, { useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";

const SignupModal = ({ isOpen, onClose }) => {
  const [activeStep, setActiveStep] = useState("step1");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    countryCode: "+1",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
      phone: "",
      countryCode: "+1",
    });
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const registerWithEmail = async () => {
    if (!formData.name || !formData.email || !formData.password) {
      setErrorMessage("All fields are required.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post(
        `https://violet-meerkat-830212.hostingersite.com/public/api/register`,
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }
      );
      setSuccessMessage(
        "Registration successful! Please check your email to verify your account."
      );
      handleStepChange("success");
    } catch (error) {
      if (error.response?.status === 422) {
        const formattedErrors = Object.values(error.response.data.errors)
          .flat()
          .join(", ");
        setErrorMessage(formattedErrors);
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const registerWithPhone = async () => {
    if (!formData.name || !formData.phone) {
      setErrorMessage("Name and phone number are required.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post(
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
    } catch (error) {
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
    } catch (error) {
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
    } catch (error) {
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
            <button
              className="loginContinueIcon"
              onClick={() => handleStepChange("phoneSignup")}
            >
              <img src="/assets/images/MobileLogo.svg" alt="phone Logo" />
              Sign Up with Phone
            </button>
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
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={formData.password}
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
            <button onClick={closeHandler}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignupModal;
