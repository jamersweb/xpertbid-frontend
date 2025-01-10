

function openMobileMenu() {
    document.getElementById('mobile-menu').classList.add('active');
    document.querySelector('.mobileMenuOpen').style.display = 'none'; // Hide menu open icon
    document.getElementById('closeMenuIcon').style.display = 'block'; // Show close icon
}

function closeMobileMenu() {
    document.getElementById('mobile-menu').classList.remove('active');
    document.querySelector('.mobileMenuOpen').style.display = 'block'; // Show menu open icon
    document.getElementById('closeMenuIcon').style.display = 'none'; // Hide close icon
}

// Automatically close the menu and reset icons if the screen size exceeds 1122px
function handleResize() {
    if (window.innerWidth > 1122) {
        // Close the mobile menu if it's open
        document.getElementById('mobile-menu').classList.remove('active');
        
        // Reset menu icons to the default state
        document.querySelector('.mobileMenuOpen').style.display = 'block'; // Show menu open icon
        document.getElementById('closeMenuIcon').style.display = 'none'; // Hide close icon
    }
}

// Attach the resize event listener to the window
window.addEventListener('resize', handleResize);



// herosectionpagination
var swiperHeroSection = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 30,
    navigation: {
        nextEl: '.swiper-button-next', // Unique navigation for hero section
        prevEl: '.swiper-button-prev', // Unique navigation for hero section
    },
    pagination: {
        el: '.swiper-pagination', // Unique pagination for hero section
        clickable: true, // Make pagination clickable
    },
    breakpoints: {
        640: {
            slidesPerView: 1,
        },
        1024: {
            slidesPerView: 1,
        },
    },
    loop: true, // Infinite loop
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pauseOnMouseEnter: true,
});

// featured-product

var swiperFeatured = new Swiper('.swiper-featured-product', {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 30,
    navigation: {
        nextEl: '.swiper-button-next-btn', // Unique navigation for featured product section
        prevEl: '.swiper-button-prev-btn', // Unique navigation for featured product section
    },
    pagination: {
        el: '.swiper-pagination', // Unique pagination for featured product section
        clickable: true, // Make pagination clickable
    },
    breakpoints: {

        640: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
        1367: {
            slidesPerView: 4,
        },
    },
    loop: true, // Infinite loop
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pauseOnMouseEnter: true,
});

// featured-product

var swiperProductAlbum = new Swiper('#swiper-product-imageAlbum', {
    slidesPerView: 3,
    slidesPerGroup: 1, // Moves one slide at a time
    spaceBetween: 30,
    loop: true, // Enable loop mode
    loopFillGroupWithBlank: true, // Fills empty space in the last group with blank slides to avoid broken layout
    breakpoints: {
        640: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
        1367: {
            slidesPerView: 3,
        },
    },
});

// filtermarketplacebid

document.addEventListener('DOMContentLoaded', function () {
    // Add click event listener for the filter button
    document.querySelector('.filter').addEventListener('click', function () {
        const filterContainer = document.querySelector('.mkt-left-parent');

        // Toggle visibility of the filter container
        filterContainer.classList.toggle('visible');
    });
});

// pricingfilter

const priceRange = document.getElementById('priceRange');
const productList = document.getElementById('productList');
const minPrice = document.getElementById('minPrice');
const maxPrice = document.getElementById('maxPrice');

// priceRange.addEventListener('input', function () {
//     maxPrice.textContent = this.value;
//     filterProducts(this.value);
// });

//filterProducts(priceRange.value);





// document.getElementById('toggle-business-info').addEventListener('click', function () {
//     var businessInfo = document.getElementById('business-info');
//     var button = document.getElementById('toggle-business-info');
//     var buttonImg = button.querySelector('img'); // Select the image inside the button

//     if (businessInfo.classList.contains('show')) {
//         // Hide the business info
//         businessInfo.classList.remove('show');
//         setTimeout(function () {
//             businessInfo.style.display = 'none';
//         }, 500); // Wait for the opacity transition to complete

//         // Change button to "Add Business Info"
//         button.innerHTML = '<img src="./assets/images/addition-svg.svg" alt="">Add Business Info';
//         button.classList.remove('remove'); // Reset button style
//     } else {
//         // Show the business info
//         businessInfo.style.display = 'block';
//         setTimeout(function () {
//             businessInfo.classList.add('show');
//         }, 10); // Small timeout to ensure the transition effect applies

//         // Change button to "Remove Business Info"
//         button.innerHTML = '<img src="./assets/images/minus.png" alt="">Remove Business Info';
//         button.classList.add('remove'); // Add the red color to the button
//     }
// });


// Accountinformations





// // accountconnectedandpopup
// const connectGoogleButton = document.getElementById('connect-google');
// const connectedGoogleButton = document.getElementById('connected-google');
// const accountConnectedPassword = document.querySelector('.account-connected-password');
// const confirmationPopup = document.getElementById('confirmation-popup');

// // Event listener for connecting with Google
// connectGoogleButton.addEventListener('click', function () {
//     // Show the password section
//     accountConnectedPassword.style.display = 'block';

//     // Hide the connect button and show the connected button
//     connectGoogleButton.style.display = 'none';
//     connectedGoogleButton.style.display = 'flex';
// });

// // Event listener for removing the connected Google account
// connectedGoogleButton.addEventListener('click', function () {
//     confirmationPopup.style.display = 'block'; // Show confirmation popup
// });

// // Event listener for confirming removal
// document.getElementById('confirm-remove').addEventListener('click', function () {
//     // Hide the password section
//     accountConnectedPassword.style.display = 'none';

//     // Show connect button and hide connected button
//     connectGoogleButton.style.display = 'block';
//     connectedGoogleButton.style.display = 'none';

//     // Hide confirmation popup
//     confirmationPopup.style.display = 'none';
// });

// // Event listener for canceling removal
// document.getElementById('cancel-remove').addEventListener('click', function () {
//     confirmationPopup.style.display = 'none'; // Hide confirmation popup
// });

// // chagnepasswordpopup

// const chagnepasswordbtnClose = document.getElementById('closeCreatePasswordPopup')
// const changePasswordBtn = document.getElementById('changeAccountPassword');
// const createPasswordPopup = document.getElementById('createPasswordPopUpAccount');

// // Show popup and add 'overflow: hidden' to the body when popup is open
// changePasswordBtn.addEventListener('click', function () {
//     createPasswordPopup.style.display = 'block';
//     document.body.style.overflow = 'hidden'; // Disable scrolling when popup is open
// });

// // Show popup and add 'overflow: hidden' to the body when popup is open
// chagnepasswordbtnClose.addEventListener('click', function () {
//     createPasswordPopup.style.display = 'none';
//     document.body.style.overflow = ''; // Disable scrolling when popup is open
// });

// // Hide popup when clicking outside the popup
// window.addEventListener('click', function (event) {
//     if (event.target === createPasswordPopup) {
//         createPasswordPopup.style.display = 'none';
//         document.body.style.overflow = ''; // Restore scrolling when popup is closed
//     }
// });

// // Close popup when the user clicks outside the content area of the popup
// createPasswordPopup.addEventListener('click', function (event) {
//     if (event.target === createPasswordPopup) {
//         createPasswordPopup.style.display = 'none';
//         document.body.style.overflow = ''; // Restore scrolling when popup is closed
//     }
// });


// // loginqueries

// // Open the login modal

// // Open the login modal
// const loginButtons = document.querySelectorAll('.loginButton');
// const loginModal = document.getElementById('LoginModal');
// const closeLoginModal = document.getElementById('closeLoginModal');

// // Show modal on login button click
// loginButtons.forEach(button => {
//     button.addEventListener('click', () => {
//         loginModal.style.display = 'block';
//     });
// });

// // Close modal when the close button is clicked
// closeLoginModal.addEventListener('click', () => {
//     loginModal.style.display = 'none';
// });

// // Step navigation variables
// const loginStep = document.getElementById('loginStep');
// const loginStep2 = document.getElementById('loginStep2');
// const loginStep3 = document.getElementById('loginStep3');
// const loginStep4 = document.getElementById('loginStep4');
// const phoneNumberLoginInput = document.getElementById('phoneNumberLogin');
// const errorMessageLogin = document.getElementById('errorMessageLogin');
// const otperrorMessageLogin = document.getElementById('otperrorMessageLogin');
// const otpInputs = document.querySelectorAll('.otp-input-login');
// const countryCode = document.getElementById('countryCode');
// const loginEmail = document.getElementById('loginEmail');
// const forgetEmailPasswordLogin = document.getElementById('forgetEmailPasswordLogin');
// const forgetEmailPasswordLoginLink = document.getElementById('forgetEmailPasswordLoginLink');
// const emailerrorMessageLogin = document.getElementById('emailerrorMessageLogin');
// const emailInputLogin = document.getElementById('emailInputLogin');
// const passwordInputLogin = document.getElementById('passwordInputLogin');
// const forgetemailInputLogin = document.getElementById('forgetemailInputLogin');

// let generatedOtpLogin; // Store the OTP for later verification

// // Move to Step 2 when 'Continue with Phone' is clicked
// document.getElementById('continueMobilePhone').addEventListener('click', () => {
//     loginStep.classList.remove('active');
//     loginStep2.classList.add('active');
// });

// // Phone number validation rules for different countries
// const phoneValidationRulesLogin = {
//     '+1': /^\d{10}$/,   // USA - 10 digits
//     '+44': /^\d{10}$/,  // UK - 10 digits
//     '+91': /^\d{10}$/,  // India - 10 digits
//     '+92': /^\d{10}$/,  // Pakistan - 10 digits
// };

// // Move to Step 3 after submitting phone number
// document.getElementById('submitPhoneLogin').addEventListener('click', () => {
//     const phoneNumberLogin = phoneNumberLoginInput.value;
//     const selectedCountryCode = countryCode.value;
//     const isValidPhone = phoneValidationRulesLogin[selectedCountryCode].test(phoneNumberLogin);

//     if (isValidPhone) {
//         errorMessageLogin.textContent = ''; // Clear error message
//         loginStep2.classList.remove('active');
//         loginStep3.classList.add('active');

//         // Generate a random 4-digit OTP
//         generatedOtpLogin = Math.floor(1000 + Math.random() * 9000);
//         console.log("Generated OTP: " + generatedOtpLogin); // Log OTP to the console

//         // Simulate a 2-second delay for phone validation
//         setTimeout(() => {
//             loginStep3.classList.remove('active');
//             loginStep4.classList.add('active');
//             startotpTimerLogin(); // Start the OTP timer
//         }, 2000);
//     } else {
//         errorMessageLogin.textContent = "Invalid phone number. Please enter a valid number.";
//     }
// });

// // Back button in Step 2 to return to Step 1
// document.getElementById('backPhoneLogin').addEventListener('click', () => {
//     loginStep2.classList.remove('active');
//     loginStep.classList.add('active');
// });

// // Back button in Step 3 to return to Step 2
// document.getElementById('backValidationLogin').addEventListener('click', () => {
//     loginStep3.classList.remove('active');
//     loginStep2.classList.add('active');
// });

// // OTP verification and redirection
// document.getElementById('verifyOtpButtonLogin').addEventListener('click', () => {
//     let otp = '';
//     otpInputs.forEach(input => {
//         otp += input.value;
//     });

//     if (otp === generatedOtpLogin.toString()) {
//         window.location.href = "https://google.com"; // Replace with the actual URL
//     } else {
//         otperrorMessageLogin.textContent = "Invalid OTP, please try again.";
//     }
// });

// // Back button in OTP screen to return to Step 3
// document.getElementById('backOtpLogin').addEventListener('click', () => {
//     loginStep4.classList.remove('active');
//     loginStep3.classList.add('active');
// });

// // Resend OTP button functionality
// document.getElementById('resendOtpButtonLogin').addEventListener('click', () => {
//     otperrorMessageLogin.textContent = "OTP has been resent.";
//     otpInputs.forEach(input => input.value = ''); // Clear OTP inputs
//     // Generate a new OTP
//     generatedOtpLogin = Math.floor(1000 + Math.random() * 9000);
//     console.log("Resent OTP: " + generatedOtpLogin); // Log new OTP to the console
//     startotpTimerLogin(); // Restart OTP timer
// });

// // OTP timer functionality
// function startotpTimerLogin() {
//     let timer = 60;
//     const otpTimerLoginElement = document.getElementById('otpTimerLogin');
//     const countdown = setInterval(() => {
//         timer--;
//         otpTimerLoginElement.textContent = timer;
//         if (timer === 0) {
//             clearInterval(countdown);
//             otperrorMessageLogin.textContent = "OTP expired. Please resend.";
//         }
//     }, 1000);
// }

// // Move to email login form
// document.getElementById('continueMobileEmail').addEventListener('click', () => {
//     loginStep.classList.remove('active');
//     loginEmail.classList.add('active');
// });

// // Simulate email and password validation
// document.getElementById('forgetPasswordLogin').addEventListener('click', () => {
//     const email = emailInputLogin.value;
//     const password = passwordInputLogin.value;

//     // Basic email and password validation
//     if (!validateEmail(email)) {
//         emailerrorMessageLogin.textContent = "Please enter a valid email.";
//     } else if (password.length < 6) {
//         emailerrorMessageLogin.textContent = "Password must be at least 6 characters.";
//     } else {
//         emailerrorMessageLogin.textContent = '';
//         window.location.href = "https://google.com"; // Redirect to website after successful login
//     }
// });

// // Move to Forget Password form
// document.getElementById('forgetPasswordLogin').addEventListener('click', () => {
//     loginEmail.classList.remove('active');
//     forgetEmailPasswordLogin.classList.add('active');
// });

// // Simulate sending reset link
// document.getElementById('sendResetLinkLogin').addEventListener('click', () => {
//     const email = forgetemailInputLogin.value;
//     if (validateEmail(email)) {
//         forgetEmailPasswordLogin.classList.remove('active');
//         forgetEmailPasswordLoginLink.classList.add('active');
//     } else {
//         alert("Please enter a valid email address.");
//     }
// });

// // Back to login form from the reset link confirmation
// document.getElementById('backToLoginLogin').addEventListener('click', () => {
//     forgetEmailPasswordLoginLink.classList.remove('active');
//     loginEmail.classList.add('active');
// });

// // Email validation function
// function validateEmail(email) {
//     const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return re.test(String(email).toLowerCase());
// }




// function toggleNotificationPopup(event) {
//     var popup = document.getElementById("notificationPopup");
//     var profileSetting = document.getElementById("userProfileSettingPopup");

//     // Hide the user profile setting popup when opening the notification popup
//     profileSetting?.classList.remove("show");

//     // Toggle the notification popup
//     popup.classList.toggle("show");

//     // Stop the event from bubbling up to the window.onclick
//     event.stopPropagation();
// }

// function toggleUserSettingPopup(event) {
//     var popup = document.getElementById("notificationPopup");
//     var profileSetting = document.getElementById("userProfileSettingPopup");

//     // Hide the notification popup when opening the user profile setting popup
//     popup.classList.remove("show");

//     // Toggle the user profile setting popup
//     profileSetting.classList.toggle("show");

//     // Stop the event from bubbling up to the window.onclick
//     event.stopPropagation();
// }

// // Hide both popups if clicking outside
// window.onclick = function (event) {
//     var popup = document.getElementById("notificationPopup");
//     var profileSetting = document.getElementById("userProfileSettingPopup");

//     // Ensure that clicks outside of the popups and buttons close both popups
//     var isNotificationButton = event.target.closest('#notificationButton');
//     var isProfileButton = event.target.closest('#profileButton');

//     if (!popup.contains(event.target) && !profileSetting.contains(event.target) && !isNotificationButton && !isProfileButton) {
//         popup.classList.remove("show");
//         profileSetting?.classList.remove("show");
//     }
// };




// topbid
// $(document).ready(function() {
//     $('#topbid').DataTable();
// });
// new DataTable('#topbid');

// new DataTable('#wallet');



