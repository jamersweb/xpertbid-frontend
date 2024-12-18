(function() {
// Open the login modal
const loginButtons = document.querySelectorAll('.loginButton');
const loginModal = document.getElementById('LoginModal');
const closeLoginModal = document.getElementById('closeLoginModal');

// Show modal on login button click
loginButtons.forEach(button => {
    button.addEventListener('click', () => {
        loginModal.style.display = 'block';
    });
});

// Close modal when the close button is clicked
closeLoginModal.addEventListener('click', () => {
    loginModal.style.display = 'none';
});

// Step navigation variables
const loginStep = document.getElementById('loginStep');
const loginStep2 = document.getElementById('loginStep2');
const loginStep3 = document.getElementById('loginStep3');
const loginStep4 = document.getElementById('loginStep4');
const phoneNumberLoginInput = document.getElementById('phoneNumberLogin');
const errorMessageLogin = document.getElementById('errorMessageLogin');
const otperrorMessageLogin = document.getElementById('otperrorMessageLogin');
const otpInputs = document.querySelectorAll('.otp-input-login');
const countryCode = document.getElementById('countryCode');
const loginEmail = document.getElementById('loginEmail');
const forgetEmailPasswordLogin = document.getElementById('forgetEmailPasswordLogin');
const forgetEmailPasswordLoginLink = document.getElementById('forgetEmailPasswordLoginLink');
const emailerrorMessageLogin = document.getElementById('emailerrorMessageLogin');
const emailInputLogin = document.getElementById('emailInputLogin');
const passwordInputLogin = document.getElementById('passwordInputLogin');
const forgetemailInputLogin = document.getElementById('forgetemailInputLogin');

let generatedOtpLogin; // Store the OTP for later verification

// Move to Step 2 when 'Continue with Phone' is clicked
document.getElementById('continueMobilePhone').addEventListener('click', () => {
    loginStep.classList.remove('active');
    loginStep2.classList.add('active');
});

// Phone number validation rules for different countries
const phoneValidationRulesLogin = {
    '+1': /^\d{10}$/,   // USA - 10 digits
    '+44': /^\d{10}$/,  // UK - 10 digits
    '+91': /^\d{10}$/,  // India - 10 digits
    '+92': /^\d{10}$/,  // Pakistan - 10 digits
};

// Move to Step 3 after submitting phone number
document.getElementById('submitPhoneLogin').addEventListener('click', () => {
    const phoneNumberLogin = phoneNumberLoginInput.value;
    const selectedCountryCode = countryCode.value;
    const isValidPhone = phoneValidationRulesLogin[selectedCountryCode].test(phoneNumberLogin);

    if (isValidPhone) {
        errorMessageLogin.textContent = ''; // Clear error message
        loginStep2.classList.remove('active');
        loginStep3.classList.add('active');

        // Generate a random 4-digit OTP
        generatedOtpLogin = Math.floor(1000 + Math.random() * 9000);
        console.log("Generated OTP: " + generatedOtpLogin); // Log OTP to the console

        // Simulate a 2-second delay for phone validation
        setTimeout(() => {
            loginStep3.classList.remove('active');
            loginStep4.classList.add('active');
            startotpTimerLogin(); // Start the OTP timer
        }, 2000);
    } else {
        errorMessageLogin.textContent = "Invalid phone number. Please enter a valid number.";
    }
});

// Back button in Step 2 to return to Step 1
document.getElementById('backPhoneLogin').addEventListener('click', () => {
    loginStep2.classList.remove('active');
    loginStep.classList.add('active');
});

// Back button in Step 3 to return to Step 2
document.getElementById('backValidationLogin').addEventListener('click', () => {
    loginStep3.classList.remove('active');
    loginStep2.classList.add('active');
});

// OTP verification and redirection
document.getElementById('verifyOtpButtonLogin').addEventListener('click', () => {
    let otp = '';
    otpInputs.forEach(input => {
        otp += input.value;
    });

    if (otp === generatedOtpLogin.toString()) {
        window.location.href = "https://google.com"; // Replace with the actual URL
    } else {
        otperrorMessageLogin.textContent = "Invalid OTP, please try again.";
    }
});

// Back button in OTP screen to return to Step 3
document.getElementById('backOtpLogin').addEventListener('click', () => {
    loginStep4.classList.remove('active');
    loginStep3.classList.add('active');
});

// Resend OTP button functionality
document.getElementById('resendOtpButtonLogin').addEventListener('click', () => {
    otperrorMessageLogin.textContent = "OTP has been resent.";
    otpInputs.forEach(input => input.value = ''); // Clear OTP inputs
    // Generate a new OTP
    generatedOtpLogin = Math.floor(1000 + Math.random() * 9000);
    console.log("Resent OTP: " + generatedOtpLogin); // Log new OTP to the console
    startotpTimerLogin(); // Restart OTP timer
});

// OTP timer functionality
function startotpTimerLogin() {
    let timer = 60;
    const otpTimerLoginElement = document.getElementById('otpTimerLogin');
    const countdown = setInterval(() => {
        timer--;
        otpTimerLoginElement.textContent = timer;
        if (timer === 0) {
            clearInterval(countdown);
            otperrorMessageLogin.textContent = "OTP expired. Please resend.";
        }
    }, 1000);
}

// Move to email login form
document.getElementById('continueMobileEmail').addEventListener('click', () => {
    loginStep.classList.remove('active');
    loginEmail.classList.add('active');
});

// Simulate email and password validation
document.getElementById('forgetPasswordLogin').addEventListener('click', () => {
    const email = emailInputLogin.value;
    const password = passwordInputLogin.value;

    // Basic email and password validation
    if (!validateEmail(email)) {
        emailerrorMessageLogin.textContent = "Please enter a valid email.";
    } else if (password.length < 6) {
        emailerrorMessageLogin.textContent = "Password must be at least 6 characters.";
    } else {
        emailerrorMessageLogin.textContent = '';
        window.location.href = "https://google.com"; // Redirect to website after successful login
    }
});

// Move to Forget Password form
document.getElementById('forgetPasswordLogin').addEventListener('click', () => {
    loginEmail.classList.remove('active');
    forgetEmailPasswordLogin.classList.add('active');
});

// Simulate sending reset link
document.getElementById('sendResetLinkLogin').addEventListener('click', () => {
    const email = forgetemailInputLogin.value;
    if (validateEmail(email)) {
        forgetEmailPasswordLogin.classList.remove('active');
        forgetEmailPasswordLoginLink.classList.add('active');
    } else {
        alert("Please enter a valid email address.");
    }
});

// Back to login form from the reset link confirmation
document.getElementById('backToLoginLogin').addEventListener('click', () => {
    forgetEmailPasswordLoginLink.classList.remove('active');
    loginEmail.classList.add('active');
});

// Email validation function
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

})();
// signupquery

let generatedOtp; // To store the generated OTP for comparison later
let generatedEmailOtp; // To store the generated email OTP
let otpTimer; // Timer for OTP countdown
let emailOtpTimer; // Timer for email OTP countdown
let canResendOtp = false; // Flag to check if phone OTP can be resent
let canResendEmailOtp = false; // Flag to check if email OTP can be resent

// Hardcoded list of existing usernames (for demo purposes)
const existingUsernames = ["john_doe", "alice.smith", "user_123", "example_user"];

// Get all buttons with the class 'SignupButton'
document.querySelectorAll('.SignupButton').forEach(button => {
    button.addEventListener('click', function () {
        // Display the modal when any login button is clicked
        document.getElementById('SignupModal').style.display = 'flex';
    });
});

// Close modal when "X" button is clicked
document.getElementById('closeModal').addEventListener('click', function () {
    document.getElementById('SignupModal').style.display = 'none';
});

// Your remaining JavaScript code for modal functionality


// Step Navigation (from Step 1 to Step 2)
document.getElementById('continuePhone').addEventListener('click', function () {
    document.getElementById('step1').classList.remove('active');
    document.getElementById('step2').classList.add('active');
});

// Show email step when "Continue with Email" is clicked
document.getElementById('continueEmail').addEventListener('click', function () {
    document.getElementById('step1').classList.remove('active');
    document.getElementById('stepEmail').classList.add('active');
});

// Email and password validation
document.getElementById('submitEmail').addEventListener('click', function () {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var passwordErrorMessage = document.getElementById('passwordErrorMessage');

    if (!validateEmail(email)) {
        passwordErrorMessage.textContent = "Invalid email address!";
        return;
    }

    if (!validatePassword(password)) {
        passwordErrorMessage.textContent = "Password must contain at least 1 lowercase, 1 uppercase, 1 numeric character, and be at least 8 characters long!";
        return;
    }

    passwordErrorMessage.textContent = ""; // Clear error message
    goToNextStep('stepEmail', 'stepValidatingEmail'); // Navigate to validating step

    // Simulate email validation delay
    setTimeout(function () {
        generateEmailOTP(); // Generate and send the email OTP
        goToNextStep('stepValidatingEmail', 'stepEmailVerification'); // Navigate to email verification step
    }, 2000);  // 2 seconds delay for validation simulation
});

// Phone number validation (basic)
document.getElementById('submitPhone').addEventListener('click', function () {
    var phoneNumber = document.getElementById('phoneNumber').value;
    var errorMessage = document.getElementById('errorMessage');

    if (!validatePhoneNumber(phoneNumber)) {
        document.getElementById('phoneNumber').classList.add('error');
        errorMessage.textContent = "Invalid phone number!";
        return;
    } else {
        document.getElementById('phoneNumber').classList.remove('error');
        document.getElementById('phoneNumber').classList.add('success');
        errorMessage.textContent = "";

        goToNextStep('step2', 'step3');

        // Simulate a delay to show OTP screen
        setTimeout(function () {
            generateOTP(); // Generate OTP for phone
        }, 2000);  // 2 seconds delay for validation simulation
    }
});

// Back button functionality
document.getElementById('backEmail').addEventListener('click', function () {
    goToNextStep('stepEmail', 'step1'); // Go back to step 1
});

document.getElementById('backPhone').addEventListener('click', function () {
    goToNextStep('step2', 'step1'); // Go back to step 1
});

document.getElementById('backValidation').addEventListener('click', function () {
    goToNextStep('step3', 'step2'); // Go back to phone step
});

document.getElementById('backValidatingEmail').addEventListener('click', function () {
    goToNextStep('stepValidatingEmail', 'stepEmail'); // Go back to email step
});

document.getElementById('backEmailVerification').addEventListener('click', function () {
    goToNextStep('stepEmailVerification', 'stepValidatingEmail'); // Go back to validating email
});

document.getElementById('backOtp').addEventListener('click', function () {
    goToNextStep('step4', 'step3'); // Go back to validation step
});

// Generate email OTP
function generateEmailOTP() {
    generatedEmailOtp = Math.floor(1000 + Math.random() * 9000);  // Generate a 4-digit OTP
    console.log("Generated Email OTP: " + generatedEmailOtp);  // Log OTP for demo
    startEmailOtpTimer(); // Start the email OTP timer
}

// Verify Email OTP
document.getElementById('verifyEmailOtpButton').addEventListener('click', function () {
    var enteredEmailOtp = document.getElementById('emailOtp1').value +
        document.getElementById('emailOtp2').value +
        document.getElementById('emailOtp3').value +
        document.getElementById('emailOtp4').value;
    var emailOtpErrorMessage = document.getElementById('emailOtpErrorMessage');

    if (enteredEmailOtp === generatedEmailOtp.toString()) {
        emailOtpErrorMessage.textContent = "Email verified successfully!";
        emailOtpErrorMessage.style.color = 'green';
        goToNextStep('stepEmailVerification', 'verificationComplete');
    } else {
        emailOtpErrorMessage.textContent = "Invalid verification code. Please try again.";
        emailOtpErrorMessage.style.color = 'red';
    }
});

// Verify Phone OTP
document.getElementById('verifyOtpButton').addEventListener('click', function () {
    var enteredOtp = document.getElementById('otp1').value +
        document.getElementById('otp2').value +
        document.getElementById('otp3').value +
        document.getElementById('otp4').value;
    var otpErrorMessage = document.getElementById('otpErrorMessage');

    if (enteredOtp === generatedOtp.toString()) {
        otpErrorMessage.textContent = "Phone OTP verified successfully!";
        otpErrorMessage.style.color = 'green';
        goToNextStep('step4', 'verificationComplete'); // Go to the verification complete step
    } else {
        otpErrorMessage.textContent = "Invalid Phone OTP. Please try again.";
        otpErrorMessage.style.color = 'red';
    }
});

// Function to generate OTP for phone
function generateOTP() {
    generatedOtp = Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit OTP
    console.log("Generated Phone OTP: " + generatedOtp); // Log OTP for demo

    // Clear previous OTP input fields
    document.getElementById('otp1').value = '';
    document.getElementById('otp2').value = '';
    document.getElementById('otp3').value = '';
    document.getElementById('otp4').value = '';

    // Show the OTP input step
    goToNextStep('step3', 'step4');

    // Start the OTP timer
    startOtpTimer();
}

// Start OTP timer for email
function startEmailOtpTimer() {
    let timeLeft = 60; // 60 seconds
    canResendEmailOtp = false; // Disable resend button
    document.getElementById('resendEmailOtpButton').style.display = 'none'; // Hide resend button
    document.getElementById('emailOtpTimer').textContent = timeLeft; // Display initial time

    emailOtpTimer = setInterval(function () {
        timeLeft--;
        document.getElementById('emailOtpTimer').textContent = timeLeft; // Update timer display

        if (timeLeft <= 0) {
            clearInterval(emailOtpTimer);
            canResendEmailOtp = true; // Enable resend button
            document.getElementById('resendEmailOtpButton').style.display = 'block'; // Show resend button
        }
    }, 1000);
}

// Start OTP timer for phone
function startOtpTimer() {
    let timeLeft = 60; // 60 seconds
    canResendOtp = false; // Disable resend button
    document.getElementById('resendOtpButton').style.display = 'none'; // Hide resend button
    document.getElementById('otpTimer').textContent = timeLeft; // Display initial time

    otpTimer = setInterval(function () {
        timeLeft--;
        document.getElementById('otpTimer').textContent = timeLeft; // Update timer display

        if (timeLeft <= 0) {
            clearInterval(otpTimer);
            canResendOtp = true; // Enable resend button
            document.getElementById('resendOtpButton').style.display = 'block'; // Show resend button
        }
    }, 1000);
}

// Function to navigate between steps
function goToNextStep(currentStepId, nextStepId) {
    document.getElementById(currentStepId).classList.remove('active');
    document.getElementById(nextStepId).classList.add('active');
}

// Validation functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function validatePassword(password) {
    return password.length >= 8 && /[a-z]/.test(password) && /[A-Z]/.test(password) && /[0-9]/.test(password);
}

function validatePhoneNumber(phoneNumber) {
    return phoneNumber.length >= 10; // Adjust validation as needed
}

// Resend Email OTP button functionality
document.getElementById('resendEmailOtpButton').addEventListener('click', function () {
    if (canResendEmailOtp) {
        generateEmailOTP(); // Generate new email OTP
    }
});

// Resend Phone OTP button functionality
document.getElementById('resendOtpButton').addEventListener('click', function () {
    if (canResendOtp) {
        generateOTP(); // Generate new OTP
        startOtpTimer(); // Restart timer
    }
});

// Event listener for Continue button in verificationComplete step
document.getElementById('continueToCreateProfile').addEventListener('click', function () {
    goToNextStep('verificationComplete', 'individualBusniess');
});

document.getElementById('individualBTN').addEventListener('click', function () {
    // Hide the company name input when "individual" is selected
    document.querySelector('.company-container').style.display = 'none';
    goToNextStep('individualBusniess', 'createProfile');
});

document.getElementById('busniessBTN').addEventListener('click', function () {
    // Show the company name input when "business" is selected
    document.querySelector('.company-container').style.display = 'block';
    document.querySelector('.signupModal').style.padding = '200px 0 2px 0';
    goToNextStep('individualBusniess', 'createProfile');
});

document.getElementById('submitProfileIndividualBusniess').addEventListener('click', function () {
    goToNextStep('individualBusniess', 'createProfile');
});


// Validate Username
function validateUsername(username) {
    const usernameRegex = /^[a-z0-9._]+$/;  // Only lowercase letters, numbers, . or _
    return usernameRegex.test(username);
}

// Check for username uniqueness
function isUsernameUnique(username) {
    return !existingUsernames.includes(username);
}

// Profile submission event listener
document.getElementById('submitProfile').addEventListener('click', function () {
    const username = document.getElementById('username').value.trim();
    const fullName = document.getElementById('fullName').value.trim();
    const country = document.getElementById('country').value;
    const profileErrorMessage = document.getElementById('profileErrorMessage');

    // Validate username
    if (!validateUsername(username)) {
        profileErrorMessage.textContent = "Invalid username! Only lowercase letters, numbers, dots (.), and underscores (_) are allowed.";
        return;
    }

    // Check if username is unique
    if (!isUsernameUnique(username)) {
        profileErrorMessage.textContent = "Username already exists! Please try a different username.";
        return;
    }

    if (fullName === "") {
        profileErrorMessage.textContent = "Please fill in your full name.";
        return;
    }

    if (country === "") {
        profileErrorMessage.textContent = "Please select a country.";
        return;
    }

    // If all validation passes
    profileErrorMessage.textContent = "";
    existingUsernames.push(username);  // Simulate saving the new username
    goToNextStep('createProfile', 'uploadProfilePicture');
});

// Handle "I'll Do It Later" option
document.getElementById('doItLater').addEventListener('click', function () {
    goToNextStep('uploadProfilePicture', 'profiledCreated');
});

// Handle "Upload Picture" button click
document.getElementById('continueToUpload').addEventListener('click', function () {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.click();

    input.onchange = function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                document.querySelector('.uploaded-profile-image img').src = e.target.result;
                goToNextStep('uploadProfilePicture', 'uploadedPicture');
            };
            reader.readAsDataURL(file);
        }
    };
});

// Handle "Change Picture" button click
document.getElementById('changePicture').addEventListener('click', function () {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.click();

    input.onchange = function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                document.querySelector('.uploaded-profile-image img').src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    };
});

// Handle "Done" after changing/uploading picture
document.getElementById('photoChangeDone').addEventListener('click', function () {
    goToNextStep('uploadedPicture', 'profiledCreated');
});

// Handle "Start Exploring" button click to redirect to the website
document.getElementById('startExploring').addEventListener('click', function () {
    window.location.href = 'https://www.google.com/';
});

// Function to navigate between steps
function goToNextStep(currentStepId, nextStepId) {
    document.getElementById(currentStepId).classList.remove('active');
    document.getElementById(nextStepId).classList.add('active');
}

document.getElementById('backToVerification').addEventListener('click', function () {
    goToNextStep('individualBusniess', 'verificationComplete');
});

document.getElementById('backToindividualBusniess').addEventListener('click', function () {
    goToNextStep('createProfile', 'individualBusniess');
});
