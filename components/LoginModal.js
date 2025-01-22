import { useState } from "react";
import { signIn } from "next-auth/react";
import axios from "axios";
const LoginModal = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState("loginStep"); // Steps: loginStep, loginStep2, ...
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [errorMessage, setErrorMessage] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  //const { data: session } = useSession();

  const closeHandler = () => {
    setErrorMessage("");
    onClose();
  };

  const handleEmailLogin = async () => {
    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }
    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false, // Prevent NextAuth from redirecting by default
      });

      //console.log(result);
      //localStorage.setItem("token", result.data.token);
      if (result?.error) {
        setErrorMessage(result.error); // Display error from NextAuth
      } else {
        //localStorage.setItem("token", session.user.token);
        setErrorMessage(""); // Clear any previous errors
        onClose(); // Close the modal on successful login
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again.");
      console.error("Error during login:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinueWithPhone = () => {
    setCurrentStep("phoneLogin");
  };

  const validatePhoneNumber = (num) => {
    return num.replace(/\D/g, "").length === 10;
  };

  const sendOtp = async () => {
    if (!validatePhoneNumber(phoneNumber)) {
      setErrorMessage("Invalid phone number. Ensure it’s 11 digits long.");
      return;
    }
    setIsLoading(true);
    setErrorMessage("");
    try {
       await axios.post(
        "https://violet-meerkat-830212.hostingersite.com/public/api/send-otp",
        {
          phone: `${countryCode}${phoneNumber}`,
        }
      );
      setCurrentStep("otpStep");
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Failed to send OTP.");
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp || otp.length !== 4) {
      setErrorMessage("Please enter the 4-digit OTP.");
      return;
    }
    setIsLoading(true);
    setErrorMessage("");
    try {
      const response = await axios.post("/api/verify-otp", {
        phone: `${countryCode}${phoneNumber}`,
        otp,
      });
      // OTP verified, handle user login
      console.log("OTP verified:", response.data.message);
      onClose(); // Close the modal after success
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Failed to verify OTP.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleGoogleSignIn = async () => {
    try {
      const result = await signIn("google", { redirect: false });
      if (result?.error) {
        console.error("Google Sign-In failed:", result.error);
      } else {
        console.log("Google Sign-In success:", result);
        onClose(); // Close modal on success
      }
    } catch (error) {
      console.error("Error during Google Sign-In:", error);
    }
  };

  const handleAppleSignIn = async () => {
    try {
      const result = await signIn("apple", { redirect: false });
      if (result?.error) {
        console.error("Apple Sign-In failed:", result.error);
      } else {
        console.log("Apple Sign-In success:", result);
        onClose(); // Close modal on success
      }
    } catch (error) {
      console.error("Error during Apple Sign-In:", error);
    }
  };
  if (!isOpen) return null;

  return (
    <div className="loginModal" style={{ display: isOpen ? "block" : "none" }}>
      <div className="loginModal-content">
        <span className="close-btn" id="closeLoginModal" onClick={closeHandler}>
          <i className="fa-solid fa-xmark"></i>
        </span>

        {currentStep === "loginStep" && (
          <div id="loginStep" className="login-form-step active">
            <h3>Login</h3>
            <button
              onClick={handleContinueWithPhone}
              className="loginContinueIcon"
            >
              <img src="/assets/images/MobileLogo.svg" alt="" />
              Continue with Phone
            </button>
            <button
              onClick={() => setCurrentStep("loginEmail")}
              className="loginContinueIcon"
            >
              <img src="/assets/images/smsLogo.svg" alt="" />
              Continue with Email
            </button>
            <button className="loginContinueIcon" onClick={handleGoogleSignIn}>
              <img src="/assets/images/googleLogo.svg" alt="Google Logo" /> Sign
              in with Google
            </button>
            <button className="loginContinueIcon" onClick={handleAppleSignIn}>
              <img src="/assets/images/appleLogo.svg" alt="Apple Logo" /> Sign
              in with Apple
            </button>
            {/* Add Google/Apple logic if needed */}
          </div>
        )}

        {currentStep === "phoneLogin" && (
          <div id="loginStep2" className="login-form-step">
            <div className="d-flex justify-content-center step-heading-and-back">
              <button
                id="backPhoneLogin"
                onClick={() => setCurrentStep("loginStep")}
              >
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              <h3>Login with Phone</h3>
            </div>

            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
            >
              <option value="+1">+1 USA</option>
              <option value="+44">+44 UK</option>
              <option value="+91">+91 India</option>
              <option value="+92">+92 Pakistan</option>
            </select>
            <input
              type="text"
              placeholder="Enter Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              aria-label="Phone number"
            />
            {errorMessage && <p className="error">{errorMessage}</p>}
            <button
              className="form-button-1"
              onClick={sendOtp}
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send OTP"}
            </button>
          </div>
        )}

        {currentStep === "otpStep" && (
          <div>
            <button
                id="backPhoneLogin"
                onClick={() => setCurrentStep("loginStep")}
              >
                <i className="fa-solid fa-chevron-left"></i>
              </button>
            <h3>Enter OTP</h3>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              aria-label="OTP"
            />
            {errorMessage && <p className="error">{errorMessage}</p>}
            <button onClick={verifyOtp} disabled={isLoading}>
              {isLoading ? "Verifying..." : "Verify OTP"}
            </button>
          </div>
        )}

        {currentStep === "loginEmail" && (
          <div id="loginEmail" className="login-form-step">
            <div className="d-flex justify-content-center step-heading-and-back">
              <button
                id="backPhoneLogin"
                onClick={() => setCurrentStep("loginStep")}
              >
                <i className="fa-solid fa-chevron-left"></i>
              </button>

              <h3>Login with Email</h3>
            </div>

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              id="emailInputLogin"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              id="passwordInputLogin"
              onChange={(e) => setPassword(e.target.value)}
            />
            {errorMessage && (
              <span className="login-alert-message-login">{errorMessage}</span>
            )}
            <button onClick={handleEmailLogin} className="form-button-1">
              Continue
            </button>
          </div>
        )}

        {/* Implement similar logic for forget password steps using states and conditional rendering */}
      </div>
    </div>
  );
};
export default LoginModal;
