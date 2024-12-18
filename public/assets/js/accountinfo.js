// Function to hide all sections
function hideAllSections() {
    var sections = document.querySelectorAll('.profile');
    sections.forEach(function (section) {
        section.classList.remove('show'); // Remove the show class to start the fade out
        setTimeout(function () {
            section.style.display = 'none'; // After fade out, hide the section
        }, 500); // Match this timeout with the transition duration in the CSS
    });
}

// Function to show a specific section
function showSection(sectionId) {
    var section = document.getElementById(sectionId);
    section.style.display = 'block'; // Set display to block first
    setTimeout(function () {
        section.classList.add('show'); // Add the show class to fade in
    }, 10); // Small timeout to allow display property to apply first
}

// Function to set active button
function setActiveButton(activeButton) {
    // Remove active class from all buttons
    var buttons = document.querySelectorAll('.profile-item');
    buttons.forEach(function (button) {
        button.classList.remove('active');
    });
    // Add active class to the clicked button
    activeButton.classList.add('active');
}

// Event listener for the Address button
document.querySelector('.address').addEventListener('click', function () {
    hideAllSections(); // Hide all sections
    setActiveButton(this); // Set active class on this button
    setTimeout(function () {
        showSection('address'); // Show the Address section after the fade out
    }, 500); // Wait for fade out to complete
});

// Event listener for the My Profile button
document.querySelector('.myProfile').addEventListener('click', function () {
    hideAllSections(); // Hide all sections
    setActiveButton(this); // Set active class on this button
    setTimeout(function () {
        showSection('my-profile'); // Show the My Profile section after the fade out
    }, 500); // Wait for fade out to complete
});

// Event listener for the Notification Settings button
document.querySelector('.notificationSetting').addEventListener('click', function () {
    hideAllSections(); // Hide all sections
    setActiveButton(this); // Set active class on this button
    setTimeout(function () {
        showSection('notification-settings'); // Show the Notification Settings section after the fade out
    }, 500); // Wait for fade out to complete
});

// Event listener for the Password & Login button
document.querySelector('.passAndLogin').addEventListener('click', function () {
    hideAllSections(); // Hide all sections
    setActiveButton(this); // Set active class on this button
    setTimeout(function () {
        showSection('password-login'); // Show the Password & Login section after the fade out
    }, 500); // Wait for fade out to complete
});

// Event listener for the Identity Verification button
document.querySelector('.identityVerification').addEventListener('click', function () {
    console.log('Identity Verification button clicked'); // Check if this triggers
    hideAllSections(); // Hide all sections
    setActiveButton(this); // Set active class on this button
    setTimeout(function () {
        showSection('identyVerify'); // Show the Identity Verification section after the fade out
        console.log('Showing identity-verification section'); // Check if this is logged
    }, 500); // Wait for fade out to complete
});


document.getElementById('uploadButton').addEventListener('click', function () {
    // Trigger the hidden file input when the "upload" button is clicked
    document.getElementById('profileInput').click();
});

// Handle file input change event
document.getElementById('profileInput').addEventListener('change', function (event) {
    const file = event.target.files[0]; // Get the selected file
    if (file && file.size <= 2 * 1024 * 1024) { // Check if file size is under 2MB
        const reader = new FileReader(); // Create a FileReader to read the file
        reader.onload = function (e) {
            // Display the uploaded image in the img tag
            document.getElementById('profileImage').src = e.target.result;
        }
        reader.readAsDataURL(file); // Read the file as a data URL
    } else {
        alert('Please upload an image file under 2MB.');
    }
});

// Handle remove button click
document.getElementById('removeButton').addEventListener('click', function () {
    // Reset the image back to the default placeholder
    document.getElementById('profileImage').src = './assets/images/profile-circle.svg';

    // Clear the file input so the user can upload a new file
    document.getElementById('profileInput').value = ''; // Reset the file input
});

document.getElementById('uploadFrontButton').addEventListener('click', function() {
    document.getElementById('frontUpload').click();
});

document.getElementById('frontUpload').addEventListener('change', function() {
    const frontFile = this.files[0];
    if (frontFile) {
        document.getElementById('frontDocumentName').textContent = frontFile.name;
    }
});

document.getElementById('uploadBackButton').addEventListener('click', function() {
    document.getElementById('backUpload').click();
});

document.getElementById('backUpload').addEventListener('change', function() {
    const backFile = this.files[0];
    if (backFile) {
        document.getElementById('backDocumentName').textContent = backFile.name;
    }
});


function validatePassword() {
    const oldPassword = document.getElementById('oldPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Define the conditions
    const lowercaseReq = /[a-z]/.test(newPassword); // At least one lowercase letter
    const uppercaseReq = /[A-Z]/.test(newPassword); // At least one uppercase letter
    const numberReq = /\d/.test(newPassword);       // At least one number
    const lengthReq = newPassword.length >= 8;      // Minimum 8 characters
    const matchReq = newPassword === confirmPassword; // Passwords match
    const notSameReq = oldPassword !== newPassword;  // New password is different from old one

    // Update the requirement list dynamically in real-time
    updateRequirement('lowercaseReq', lowercaseReq);
    updateRequirement('uppercaseReq', uppercaseReq);
    updateRequirement('numberReq', numberReq);
    updateRequirement('lengthReq', lengthReq);
    updateRequirement('matchReq', matchReq);
    updateRequirement('notSameReq', notSameReq);
}

// Function to update the color based on condition (true = green, false = red)
function updateRequirement(elementId, isValid) {
    const element = document.getElementById(elementId);
    
    // Update the color of the icon or text
    if (isValid) {
        element.style.color = 'green'; // Apply green color if valid
        element.querySelector('i').classList.add('fa-circle-check'); // Add check mark
    } else {
        element.style.color = 'red'; // Apply red color if invalid
        element.querySelector('i').classList.remove('fa-circle-check'); // Remove check mark
    }
}

// Attach event listeners to the password input fields for real-time validation
document.getElementById('newPassword').addEventListener('input', validatePassword);
document.getElementById('confirmPassword').addEventListener('input', validatePassword);
document.getElementById('oldPassword').addEventListener('input', validatePassword);

// Form submission handling
document.getElementById('passwordForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Validate password again before submission
    const oldPassword = document.getElementById('oldPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    const lowercaseReq = /[a-z]/.test(newPassword);
    const uppercaseReq = /[A-Z]/.test(newPassword);
    const numberReq = /\d/.test(newPassword);
    const lengthReq = newPassword.length >= 8;
    const matchReq = newPassword === confirmPassword;
    const notSameReq = oldPassword !== newPassword;

    if (lowercaseReq && uppercaseReq && numberReq && lengthReq && matchReq && notSameReq) {
        alert('Password changed successfully!');
        location.reload(); // Refresh the page on successful password change
    } else {
        alert('Please ensure all password requirements are met.');
    }
});