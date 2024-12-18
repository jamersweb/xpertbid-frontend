
(function() {
    // Get elements for Get Paid functionality
    const getPaidButton = document.querySelector('.button-style-2'); // 'Get Paid' button in Step 1
    const getPaidModalStep1 = document.getElementById('getPaid'); // Step 1 modal
    const getPaidModalStep2 = document.getElementById('getPaid2'); // Step 2 modal
    const closeGetPaidButton = document.getElementById('getPaidClose'); // Close button in Step 1
    const backGetPaidButton = document.getElementById('getPaidback'); // Back button in Step 2
    const addPaymentMethodButton = getPaidModalStep1.querySelector('.button-style-2.w-100'); // 'Add Payment Method' button in Step 1
    const paymentMethodSelect = getPaidModalStep2.querySelector('select'); // Payment method dropdown in Step 2
    const paypalPaymentDiv = document.getElementById('paypalPayment'); // PayPal input div
    const bankPaymentDiv = document.getElementById('bankPayment'); // Bank input div
    const saveChangesButton = getPaidModalStep2.querySelector('.btn-save-changes button'); // Save changes button

    // Function to show PayPal or Bank inputs based on selected option
    function togglePaymentMethod() {
        if (paymentMethodSelect.value === 'paypal') {
            paypalPaymentDiv.style.display = 'block'; // Show PayPal inputs
            bankPaymentDiv.style.display = 'none'; // Hide Bank inputs
        } else if (paymentMethodSelect.value === 'bank') {
            paypalPaymentDiv.style.display = 'none'; // Hide PayPal inputs
            bankPaymentDiv.style.display = 'block'; // Show Bank inputs
        }
    }

    // Disable body scroll
    function disableBodyScroll() {
        document.body.style.overflow = 'hidden';
    }

    // Enable body scroll
    function enableBodyScroll() {
        document.body.style.overflow = 'auto';
    }

    // Open Get Paid modal (Step 1)
    if (getPaidButton) {
        getPaidButton.addEventListener('click', function() {
            if (getPaidModalStep1) {
                getPaidModalStep1.style.display = 'block'; // Show step 1
                disableBodyScroll(); // Disable body scroll
            }
        });
    }

    // Close Get Paid modal (Step 1)
    if (closeGetPaidButton) {
        closeGetPaidButton.addEventListener('click', function() {
            if (getPaidModalStep1) {
                getPaidModalStep1.style.display = 'none'; // Hide modal
                enableBodyScroll(); // Enable body scroll
            }
        });
    }

    // Move to Step 2 (Add Payment Method) when 'Add Payment Method' is clicked
    if (addPaymentMethodButton) {
        addPaymentMethodButton.addEventListener('click', function() {
            if (getPaidModalStep1) {
                getPaidModalStep1.style.display = 'none'; // Hide step 1
            }
            if (getPaidModalStep2) {
                getPaidModalStep2.style.display = 'block'; // Show step 2
                paymentMethodSelect.value = 'paypal'; // Default select PayPal
                togglePaymentMethod(); // Show PayPal fields by default
            }
        });
    }

    // Back button to return to Step 1 from Step 2
    if (backGetPaidButton) {
        backGetPaidButton.addEventListener('click', function() {
            if (getPaidModalStep2) {
                getPaidModalStep2.style.display = 'none'; // Hide step 2
            }
            if (getPaidModalStep1) {
                getPaidModalStep1.style.display = 'block'; // Show step 1
            }
        });
    }

    // Show PayPal or Bank inputs based on selected option
    if (paymentMethodSelect) {
        paymentMethodSelect.addEventListener('change', togglePaymentMethod);
    }

    // Validation before saving payment details
    if (saveChangesButton) {
        saveChangesButton.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent form submission

            let isValid = true;
            if (paymentMethodSelect.value === 'paypal') {
                const paypalId = paypalPaymentDiv.querySelector('input').value.trim();
                if (!paypalId) {
                    alert('Please enter your PayPal ID.');
                    isValid = false;
                }
            } else if (paymentMethodSelect.value === 'bank') {
                const bankInputs = bankPaymentDiv.querySelectorAll('input');
                bankInputs.forEach(input => {
                    if (input.value.trim() === '') {
                        alert('Please fill all bank details.');
                        isValid = false;
                    }
                });
            }

            if (isValid) {
                alert('Payment details saved successfully.');
                getPaidModalStep2.style.display = 'none'; // Hide step 2 after successful submission
                enableBodyScroll(); // Enable body scroll after modal closes
            }
        });
    }

    
})();



// Function to show the payment method popup
function openPaymentMethodPopup() {
    document.getElementById('paymentMethodChoose').style.display = 'block';
}

// Function to close the payment method popup
function closePaymentMethodPopup() {
    document.getElementById('paymentMethodChoose').style.display = 'none';
}

// Event listener to open the payment method popup when button is clicked
document.getElementById('openPaymentMethod').addEventListener('click', function() {
    openPaymentMethodPopup();
});

// Event listener to close the payment method popup when close button is clicked
document.getElementById('closePaymentMethodChoose').addEventListener('click', function() {
    closePaymentMethodPopup();
});

// Prevent form submission if no payment method is selected
document.getElementById('sendRequest').addEventListener('click', function(event) {
    var paymentSelect = document.getElementById('paymentSelect').value;

    // Check if a payment method is selected
    if (paymentSelect === "") {
        alert("Please select a payment method before submitting the request.");
        event.preventDefault(); // Prevent the form from submitting
    }
});

// Open the "Add New" popup when the "Add New" button is clicked
document.getElementById('addNewMethodBtn').addEventListener('click', function() {
    document.getElementById('addNewMethod').style.display = 'block'; // Show popup
});

// Close the "Add New" popup
document.getElementById('closeAddNewMethod').addEventListener('click', function() {
    document.getElementById('addNewMethod').style.display = 'none'; // Hide popup
});

// Remove only the payment method associated with the clicked trash icon
document.querySelectorAll('.trash-payment-method').forEach(function(button) {
    button.addEventListener('click', function(event) {
        // Prevent default form submission or link behavior
        event.preventDefault();

        // Find the closest .method element that holds the trash button and remove it
        const methodElement = this.closest('.method');
        if (methodElement) {
            methodElement.remove(); // Remove only the specific .method containing the clicked trash button
        }
    });
});

// Go to the next step (e.g., showing the 'getPaid2' section) when "Add New Payment Method" is clicked
document.getElementById('sendRequest').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default form submission if it's a form
    document.getElementById('addNewMethod').style.display = 'none'; // Hide the current popup
    document.getElementById('getPaid2').style.display = 'block'; // Show the next step (getPaid2)
});

// Close the "getPaid2" popup when the back button is clicked
document.getElementById('getPaidback').addEventListener('click', function() {
    document.getElementById('getPaid2').style.display = 'none'; // Hide the "getPaid2" section
});

