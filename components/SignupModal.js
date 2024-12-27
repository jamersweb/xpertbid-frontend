import React, { useState } from "react";
import axios from "axios";

const SignupModal = ({ isOpen, onClose }) => {
  // Always declare hooks unconditionally
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

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const closeHandler = () => {
    onClose();
    setActiveStep("step1"); // Reset steps on close
    setFormData({ name: "", email: "", password: "", phone: "", countryCode: "+1" });
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const registerWithEmail = async () => {
    try {
      const response = await axios.post(
        `https://violet-meerkat-830212.hostingersite.com/public/api/register`,
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }
      );

      const newUser = { name: formData.name, email: formData.email };
      localStorage.setItem("user", JSON.stringify(newUser)); // Save user to localStorage
      setSuccessMessage("Registration successful! Please check your email to verify your account.",response);
      handleStepChange("success");
    } catch (error) {
      if (error.response?.status === 422) {
        const apiErrors = error.response.data.errors; // Extract validation errors
        const formattedErrors = Object.values(apiErrors)
          .flat()
          .join(", "); // Combine all error messages
        setErrorMessage(formattedErrors);
      } else {
        setErrorMessage(
          error.response?.data?.message || "An unexpected error occurred. Please try again."
        );
      }
    }
  };

  const registerWithPhone = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/register-phone`,
        {
          name: formData.name,
          phone: `${formData.countryCode}${formData.phone}`,
        }
      );

      setSuccessMessage("Registration successful! Please verify the OTP sent to your phone.",response);
      handleStepChange("otpVerification");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "An error occurred during phone registration."
      );
    }
  };

  // Render conditionally based on `isOpen`
  return (
    <div
      id="SignupModal"
      className="modal signupModal"
      style={{ display: isOpen ? "flex" : "none" }}
    >
      <div className="signupmodal-content">
        <span className="close-btn" id="closeModal" onClick={closeHandler}>
          <i className="fa-solid fa-xmark"></i>
        </span>

        {/* Step 1: Choose Signup Method */}
        {activeStep === "step1" && (
          <div id="step1" className="form-step active">
            <div className="d-flex justify-content-center step-heading-and-back">
              <h3>Sign Up</h3>
            </div>
            <button
              id="continuePhone"
              className="signUpContinueIcon"
              onClick={() => handleStepChange("phoneSignup")}
            >
              <img src="/assets/images/MobileLogo.svg" alt="Mobile Logo" />
              Continue with Phone
            </button>
            <button
              id="continueEmail"
              className="signUpContinueIcon"
              onClick={() => handleStepChange("emailSignup")}
            >
              <img src="/assets/images/smsLogo.svg" alt="Email Logo" />
              Continue with Email
            </button>
          </div>
        )}

        {/* Step 2: Email Signup */}
        {activeStep === "emailSignup" && (
          <div id="stepEmail" className="form-step">
            <div className="d-flex justify-content-center step-heading-and-back">
              <button id="backEmail" onClick={() => handleStepChange("step1")}>
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
            <button id="submitEmail" className="form-button-1" onClick={registerWithEmail}>
              Submit
            </button>
          </div>
        )}

        {/* Step 2: Phone Signup */}
        {activeStep === "phoneSignup" && (
          <div id="stepPhone" className="form-step">
            <div className="d-flex justify-content-center step-heading-and-back">
              <button id="backPhone" onClick={() => handleStepChange("step1")}>
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
              id="countryCode"
              value={formData.countryCode}
              onChange={(e) =>
                setFormData((prevData) => ({ ...prevData, countryCode: e.target.value }))
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
            {errorMessage && <p className="alert-message">{errorMessage}</p>}
            <button id="submitPhone" className="form-button-1" onClick={registerWithPhone}>
              Submit
            </button>
          </div>
        )}

        {/* Step 3: Success */}
        {activeStep === "success" && (
          <div id="stepSuccess" className="form-step">
            <div className="d-flex justify-content-center step-heading-and-back">
              <h3>Registration Complete</h3>
            </div>
            <p className="text-center">{successMessage}</p>
            <button className="form-button-1" onClick={closeHandler}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignupModal;