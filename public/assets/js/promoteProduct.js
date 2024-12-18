const modal = document.getElementById('promoteModal');
const buyNowButtons = document.querySelectorAll('.buy-now-btn');
const closeModal = document.getElementById('closePromote');
const successPopup = document.getElementById('successPopup');
const closeSuccessPopup = document.getElementById('closeSuccessPopup');

buyNowButtons.forEach(button => {
    button.addEventListener('click', () => {
        modal.style.display = 'flex';
    });
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

closeSuccessPopup.addEventListener('click', () => {
    successPopup.style.display = 'none';
});

// Card number formatting
const cardNumberInput = document.getElementById('cardNumber');
cardNumberInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '') // Remove non-digits
        .replace(/(.{4})/g, '$1 ') // Add space every 4 digits
        .trim(); // Trim extra spaces
});

// Expiry date validation
const expiryDateInput = document.getElementById('expiryDate');
expiryDateInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    e.target.value = value;
});

// Form submission and validation
document.getElementById('paymentForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const cardName = document.getElementById('cardName').value;
    const cardNumber = document.getElementById('cardNumber').value;
    const expiryDate = document.getElementById('expiryDate').value;
    const cvv = document.getElementById('cvv').value;

    // Validation
    if (cardName === '' || cardNumber.length !== 19 || !/^\d{2}\/\d{2}$/.test(expiryDate) || cvv.length !== 3) {
        alert('Please fill in the form correctly.');
        return;
    }

    // Show success popup
    modal.style.display = 'none';
    successPopup.style.display = 'flex';
});

