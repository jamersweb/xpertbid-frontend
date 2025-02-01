import React, { useState } from "react";

const MultiStepModal = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1); // Manage Current Step
  const [formData, setFormData] = useState({
    paymentMethod: "Paypal",
    bankName: "",
    ibanNumber: "",
    swiftCode: "",
    accountTitle: "",
    country: "",
    branchAddress: "",
  });
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("UBL (PK64*****2724)");
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, type: "Bank", details: "UBL (PK64*****2724)" },
    { id: 2, type: "Paypal", details: "hell****ed@gmail.com" },
  ]);

  const handleNextStep = () => setCurrentStep((prev) => prev + 1); // Go to Next Step
  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = () => {
    alert("Details Saved");
    handleNextStep();
  };

  const handleSendRequest = () => {
    alert(`Payment Request Sent with ${selectedPaymentMethod}`);
    handleNextStep();
  };

  if (!isOpen) return null;

  return (
    <div className="modal show  d-block" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content py-3 px-4" >
          <div className="modal-header ps-5"> <div className="">
                   
                </div>
            <h5 className="modal-title">
               
              {currentStep === 1 && "Get Paid"}
              {currentStep === 2 && "Add Payment Method"}
              {currentStep === 3 && "Add Payment Method Details"}
              {currentStep === 4 && "Confirm Payment"}
              {currentStep === 5 && "Payment Methods"}
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          {/* Step 1 */}
          {currentStep === 1 && (
            <div className="modal-body text-center">
              <h1 style={{fontSize:"100px !important"}}>$0</h1>
              <p className="mb-5 mt-3">Minimum amount you can withdraw is $10.</p>
              <button className="btn btn-dark w-100 py-3" onClick={handleNextStep}>
                Add Payment Method
              </button>
            </div>
          )}

          {/* Step 2 */}
          {currentStep === 2 && (
            <div className="modal-body ">
              <label className="fw-bold">Select Payment Method</label>
              <select
                className="form-select form-control shadow shadow-lg"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleInputChange}
              >
                <option value="Paypal">Paypal</option>
                <option value="Stripe">Stripe</option>
                <option value="Bank Transfer">Bank Transfer</option>
              </select>
              <label htmlFor="id" className="fw-bold">Paypal Id</label>
              <input 
              type="number"
              className="form-control shadow shadow-lg"
              placeholder="Enter your paypal id here"
              required
              />
              <button className="btn btn-dark w-100 mt-3 py-3" onClick={handleNextStep}>
                Next
              </button>
            </div>
          )}

          {/* Step 3 */}
          {currentStep === 3 && (
            <div className="modal-body">



               <form>
                    {/* <!-- Select Payment Method --> */}
                    <div className="mb-3">
                    <label for="paymentMethod" className="form-label fw-bold">Select Payment Method</label>
                    <select id="paymentMethod" className="form-control shadow">
                        <option>Bank Account</option>
                        <option>PayPal</option>
                        <option>Credit Card</option>
                    </select>
                    </div>

                    {/* <!-- Bank Name --> */}
                    <div className="mb-3">
                    <label for="bankName" className="form-label fw-bold">Bank Name*</label>
                    <input type="text" id="bankName" className="form-control shadow" placeholder="Enter bank name" required />
                    </div>

                    {/* <!-- IBAN Number --> */}
                    <div className="mb-3">
                    <label for="ibanNumber" className="form-label fw-bold">IBAN Number*</label>
                    <input type="text" id="ibanNumber" className="form-control shadow" placeholder="Enter IBAN number" required />
                    </div>

                    {/* <!-- Swift Code --> */}
                    <div className="mb-3">
                    <label for="swiftCode" className="form-label fw-bold">Swift Code*</label>
                    <input type="text" id="swiftCode" className="form-control shadow" placeholder="Enter Swift code" required />
                    </div>

                    {/* <!-- Account Title --> */}
                    <div className="mb-3">
                    <label for="accountTitle" className="form-label fw-bold">Account Title*</label>
                    <input type="text" id="accountTitle" className="form-control shadow" placeholder="Enter account title" required />
                    </div>

                    {/* <!-- Country --> */}
                    <div className="mb-3">
                    <label for="country" className="form-label fw-bold">Country*</label>
                    <select id="country" className="form-control shadow">
                        <option>Select Country</option>
                        <option>United States</option>
                        <option>United Kingdom</option>
                        <option>Canada</option>
                        <option>Australia</option>
                    </select>
                    </div>

                    {/* <!-- Branch Address --> */}
                    <div className="mb-3">
                    <label for="branchAddress" className="form-label fw-bold">Branch Address*</label>
                    <input type="text" id="branchAddress" className="form-control shadow" placeholder="Enter branch address" required />
                    </div>

                    {/* <!-- Save Changes Button --> */}
                    <button type="submit" className="btn btn-dark mt-4">Save Changes</button>
                </form>
            </div>
          )}

          {/* Step 4 */}
          {currentStep === 4 && (
            <div className="modal-body">
              <label>Select Payment Method</label>
              <select
                className="form-select"
                value={selectedPaymentMethod}
                onChange={(e) => setSelectedPaymentMethod(e.target.value)}
              >
                <option value="UBL (PK64*****2724)">UBL (PK64*****2724)</option>
                <option value="MCB (PK23*****0987)">MCB (PK23*****0987)</option>
              </select>
              <button className="btn btn-dark w-100 mt-3" onClick={handleSendRequest}>
                Confirm Payment
              </button>
            </div>
          )}

          {/* Step 5 */}
          {currentStep === 5 && (
            <div className="modal-body">
              {paymentMethods.map((method) => (
                <div key={method.id} className="d-flex justify-content-between mb-2">
                  <span>{method.details}</span>
                  <button className="btn btn-danger" onClick={() => alert("Method Removed")}>
                    Remove
                  </button>
                </div>
              ))}
              <button className="btn btn-dark w-100" onClick={() => alert("Add New Method")}>
                Add New Method
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiStepModal;
