
import { useState } from 'react';
import { signIn } from "next-auth/react";

const LoginModal = ({ isOpen, onClose }) =>  {

  const [currentStep, setCurrentStep] = useState('loginStep'); // 'loginStep', 'loginStep2', ...
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [errorMessage, setErrorMessage] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState(null);
  //const [otpTimeLeft, setOtpTimeLeft] = useState(60);
 // const { data: session } = useSession(); // Access session data
 


 

  const closeHandler = () => {
    onClose();
  };

  const handleEmailLogin = async () => {
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
    }
    
  };


  const handleContinueWithPhone = () => {
    setCurrentStep('loginStep2');
  };

  const handleSubmitPhone = () => {
    // Validate phone number according to country code
    if (!validatePhoneNumber(phoneNumber)) {
      setErrorMessage('Invalid phone number');
      return;
    }
    setErrorMessage('');
    // Simulate validation and OTP generation
    setCurrentStep('loginStep3');
    setTimeout(() => {
      setGeneratedOtp(generateOTP());
      setCurrentStep('loginStep4');
    }, 2000);
  };

  const handleVerifyOtp = () => {
    if (otp === generatedOtp?.toString()) {
      // On successful OTP verification
      // For example, call Laravel endpoint to finalize login
      // axios.post('/api/verify-otp', {phoneNumber, otp})
      //   .then(...)
      window.location.href = 'https://google.com';
    } else {
      setErrorMessage('Invalid OTP, please try again.');
    }
  };

  const handleResendOtp = () => {
    const newOtp = generateOTP();
    setGeneratedOtp(newOtp);
    setOtp('');
    setErrorMessage('OTP has been resent.');
    // Reset timer logic as needed
  };

  // Utility functions
  const validatePhoneNumber = (num) => {
    // Simple validation: at least 10 digits
    return num.replace(/\D/g, '').length === 10;
  };

  const generateOTP = () => Math.floor(1000 + Math.random() * 9000);

  if (!isOpen) return null;

  return (
    <div className="loginModal" style={{ display: isOpen ? 'block' : 'none' }}>
      <div className="loginModal-content">
        <span className="close-btn" id="closeLoginModal" onClick={closeHandler}>
          <i className="fa-solid fa-xmark"></i>
        </span>

        {currentStep === 'loginStep' && (
          <div id="loginStep" className="login-form-step active">
            <h3>Login</h3>
            <button onClick={handleContinueWithPhone} className="loginContinueIcon">
              <img src="/assets/images/MobileLogo.svg" alt="" />Continue with Phone
            </button>
            <button onClick={() => setCurrentStep('loginEmail')} className="loginContinueIcon">
              <img src="/assets/images/smsLogo.svg" alt="" />Continue with Email
            </button>
            {/* Add Google/Apple logic if needed */}
          </div>
        )}

        {currentStep === 'loginStep2' && (
          <div id="loginStep2" className="login-form-step">
            <div className="d-flex justify-content-center step-heading-and-back">
              <button id="backPhoneLogin" onClick={() => setCurrentStep('loginStep')}><i class="fa-solid fa-chevron-left"></i></button>
              <h3>Login</h3>
            </div>
           
            <select value={countryCode} onChange={(e) => setCountryCode(e.target.value)}>
              <option value="+1">+1 USA</option>
              <option value="+44">+44 UK</option>
              <option value="+91">+91 India</option>
              <option value="+92">+92 PK</option>
            </select>
            <input 
              type="text" 
              placeholder="Enter phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            {errorMessage && <p className="login-alert-message-login">{errorMessage}</p>}
            <button onClick={handleSubmitPhone} className="form-button-1">Submit</button>
          </div>
        )}

        {currentStep === 'loginStep3' && (
          <div id="loginStep3" className="login-form-step">
            <div className="d-flex justify-content-center step-heading-and-back">
              <button id="backPhoneLogin" onClick={() => setCurrentStep('loginStep2')}><i class="fa-solid fa-chevron-left"></i></button>
              <h3>Validating</h3>
            </div>
            <p>Validating your phone number...</p>
          </div>
        )}

        {currentStep === 'loginStep4' && (
          <div id="loginStep4" className="login-form-step">
            <div className="d-flex justify-content-center step-heading-and-back">
              <button id="backPhoneLogin" onClick={() => setCurrentStep('loginStep3')}><i class="fa-solid fa-chevron-left"></i></button>
              <h3>Login with Phone</h3>
            </div>
            
            <p className="heading-margin text-start">An OTP has been sent to your phone number.</p>
            <div id="otp-container-login">
              {[...Array(4)].map((_, i) => (
                <input 
                  key={i} 
                  type="text" 
                  className="otp-input-login"
                  maxLength="1"
                  value={otp[i] || ''}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '');
                    setOtp(prev => {
                      const arr = prev.split('');
                      arr[i] = val;
                      return arr.join('');
                    });
                  }}
                />
              ))}
            </div>
            <p>The OTP will expire in <span>{otpTimeLeft}</span> seconds.</p>
            {errorMessage && <span className="login-alert-message-login">{errorMessage}</span>}
            <div className="resendotplogin">
              <button onClick={handleResendOtp} disabled={otpTimeLeft !== 0}>Resend OTP</button>
            </div>
            <button onClick={handleVerifyOtp} className="form-button-1">Continue</button>
          </div>
        )}

        {currentStep === 'loginEmail' && (
          <div id="loginEmail" className="login-form-step">
            <div className="d-flex justify-content-center step-heading-and-back">
              <button id="backPhoneLogin" onClick={() => setCurrentStep('loginStep')}><i class="fa-solid fa-chevron-left"></i></button>
                          
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
            {errorMessage && <span className="login-alert-message-login">{errorMessage}</span>}
            <button onClick={handleEmailLogin} className="form-button-1">Continue</button>
          </div>
        )}

        {/* Implement similar logic for forget password steps using states and conditional rendering */}
      </div>
    </div>
  );
};
export default LoginModal;
