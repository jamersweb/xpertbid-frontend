(function() {
    // ==== Get Paid Modal Functionality ====

    
    // ==== Wallet Setup Functionality ====

    // Open the wallet setup popup when 'Setup Wallet' button is clicked
    document.getElementById("setupWallet").addEventListener("click", function () {
        document.getElementById("walletSetupPopUpMultiForm").style.display = "block";
        disableBodyScroll(); // Hide overflow when the popup opens
    });

    // Close wallet popup on close button click
    document.getElementById("closeWallet").addEventListener("click", function () {
        document.getElementById("walletSetupPopUpMultiForm").style.display = "none";
        document.getElementById("walletSaveCardForm").style.display = "none";
        enableBodyScroll(); // Show overflow when the popup closes
    });

    // Format card number to add spaces after every 3 digits and limit to 15 digits
    document.getElementById("cardNumber").addEventListener("input", function (e) {
        let value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
        value = value.substring(0, 15); // Limit to 15 digits
        value = value.match(/.{1,3}/g)?.join(" ") || value; // Add space after every 3 digits
        e.target.value = value;
    });

    // Format expiry date: First 2 digits (day) max 31, next 2 digits (month) max 12
    document.getElementById("expiryDate").addEventListener("input", function (e) {
        let value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
        if (value.length > 2) {
            let day = parseInt(value.slice(0, 2), 10);
            let month = value.slice(2);

            // Ensure day doesn't exceed 31
            if (day > 31) {
                day = 31;
            }

            // Ensure month doesn't exceed 12
            if (month.length > 0 && parseInt(month, 10) > 12) {
                month = "12";
            }

            value = day.toString().padStart(2, "0") + "/" + month;
        }
        e.target.value = value;
    });

    // Ensure CVV is numeric only and limit to 3 digits
    document.getElementById("cvv").addEventListener("input", function (e) {
        e.target.value = e.target.value.replace(/\D/g, "").substring(0, 3);
    });

    // Function to validate form inputs
    function validateWalletForm() {
        const cardHolderName = document.getElementById("cardHolderName").value.trim();
        const cardNumber = document.getElementById("cardNumber").value.replace(/\s/g, ''); // Remove spaces
        const expiryDate = document.getElementById("expiryDate").value;
        const cvv = document.getElementById("cvv").value;

        // Basic validation: Check if all fields are filled
        if (cardHolderName === "" || cardNumber.length !== 15 || expiryDate.length !== 5 || cvv.length !== 3) {
            alert("Please fill all fields correctly before proceeding.");
            return false;
        }

        return true;
    }

    // Handle form submission and show step 2 if valid
    document.getElementById("addBalanceBtn").addEventListener("click", function () {
        // Validate the form
        if (validateWalletForm()) {
            // Proceed to next step if valid
            document.getElementById("walletSetupPopUpMultiForm").style.display = "none";
            document.getElementById("walletSaveCardForm").style.display = "block";
            disableBodyScroll(); // Continue to hide overflow on next step
        }
    });

    // Save wallet details to cookies
    document.getElementById("saveDetails").addEventListener("click", function () {
        const cardHolderName = document.getElementById("cardHolderName").value;
        const cardNumber = document.getElementById("cardNumber").value;
        const expiryDate = document.getElementById("expiryDate").value;
        const cvv = document.getElementById("cvv").value;

        // Save details in cookies (you can modify cookie expiry as per requirements)
        document.cookie = `cardHolderName=${cardHolderName};path=/`;
        document.cookie = `cardNumber=${cardNumber};path=/`;
        document.cookie = `expiryDate=${expiryDate};path=/`;
        document.cookie = `cvv=${cvv};path=/`;

        // Close popup and allow body scrolling again
        document.getElementById("walletSaveCardForm").style.display = "none";
        enableBodyScroll();
    });

    // Don't save wallet details and close popup
    document.getElementById("notNow").addEventListener("click", function () {
        // Close the popup without saving and re-enable scrolling
        document.getElementById("walletSaveCardForm").style.display = "none";
        enableBodyScroll();
    });

})();
