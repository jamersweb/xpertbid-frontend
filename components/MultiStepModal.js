import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

const MultiStepModal = ({ isOpen, onClose }) => {
  const { data: session } = useSession();

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    paymentMethod: "Paypal",
    cardHolderName: "",
    bank_name: "",
    iban_number: "",
    swift_code: "",
    account_title: "",
    country_id: "",
    branch_address: "",
  });
  const [amount, setAmount] = useState(""); // Amount input state
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

 const fetchPaymentMethods = async () => {
    setLoading(true);
    if (session?.user) {
    try {
      const response = await axios.get(
        "https://violet-meerkat-830212.hostingersite.com/public/api/payment-methods",
        {
          headers: { Authorization: `Bearer ${session.user.token}` },
        }
      );
      setPaymentMethods(response.data);
      setCurrentStep(response.data.length > 0 ? 4 : 1);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch payment methods");
    } finally {
      setLoading(false);
    }}
  };
  useEffect(() => {
    console.log("Modal Opened, Fetching Payment Methods...");
    if (isOpen && session?.user) {
      fetchPaymentMethods();
    }
  }, [isOpen, session]);
  
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSavePaymentMethod = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        "https://violet-meerkat-830212.hostingersite.com/public/api/payment-methods",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.user.token}`,
          },
        }
      );

      setPaymentMethods([...paymentMethods, response.data.paymentMethod]);
      setCurrentStep(4);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to save payment method");
    } finally {
      setLoading(false);
    }
  };

  const handleSendPaymentRequest = async () => {
    console.log(selectedPaymentMethod, " ", amount);
    if (!selectedPaymentMethod || !amount) {
      alert("Please select a payment method and enter an amount");
      return;
    }
    console.log(selectedPaymentMethod);
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        "https://violet-meerkat-830212.hostingersite.com/public/api/payment-requests",
        {
          amount,
          payment_method: selectedPaymentMethod,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.user.token}`,
          },
        }
      );
      console.log(response);
      alert("Payment request sent successfully!");
      setCurrentStep(5);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to send payment request");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content py-3 px-4">
          <div className="modal-header ps-5"><div></div>
            <h5 className="modal-title">
              
              {currentStep === 1 && "Get Paid"}
              {currentStep === 2 && "Select Payment Method"}
              {currentStep === 3 && "Add Payment Method Details"}
              {currentStep === 4 && "Confirm Payment"}
              {currentStep === 5 && "Payment Methods"}
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          {error && <div className="alert alert-danger">{error}</div>}

          {/* Step 1: Get Paid */}
          {currentStep === 1 && (
            <div className="modal-body text-center">
              <h1 className="my-3">$0</h1>
              <input
                type="number"
                className="form-control shadow-lg my-4"
                placeholder="Enter amount"
                value={amount}
                onChange={handleAmountChange}
              />
              <p className="mb-5 mt-3 uppara">Minimum amount you can withdraw is $10.</p>
              <button className="btn btn-dark w-100 py-3" onClick={() => setCurrentStep(2)}>
                Add Payment Method
              </button>
            </div>
          )}

          {/* Step 2: Select Payment Method */}
          {currentStep === 2 && (
            <div className="modal-body">
              <label className="fw-bold">Select Payment Method</label>
              <select
                className="form-select form-control  shadow-lg"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleInputChange}
              >
                <option value="Paypal">Paypal</option>
                <option value="Bank Transfer">Bank Transfer</option>
              </select>
              <button className="btn btn-dark w-100 mt-3 py-3" onClick={() => setCurrentStep(3)}>
                Next
              </button>
            </div>
          )}

          {/* Step 3: Add Payment Details */}
          {currentStep === 3 && (
            <div className="modal-body">
              <label className="fw-bold">Bank Name</label>
              <input
                type="text"
                className="form-control  shadow-lg"
                name="bankName"
                value={formData.bankName}
                onChange={handleInputChange}
              />
              <label className="fw-bold">IBAN Number</label>
              <input
                type="text"
                className="form-control  shadow-lg"
                name="ibanNumber"
                value={formData.ibanNumber}
                onChange={handleInputChange}
              />
              <button className="btn btn-dark w-100 mt-3" onClick={handleSavePaymentMethod} disabled={loading}>
                {loading ? "Saving..." : "Save Payment Method"}
              </button>
            </div>
          )}

          {/* Step 4: Confirm Payment */}
          {currentStep === 4 && (
            <div className="modal-body">
              <div className="modal-body text-center">
              <h1>$0</h1>
              <input
                type="number"
                className="form-control   shadow-lg"
                placeholder="Enter amount"
                value={amount}
                onChange={handleAmountChange}
              />
              <p className="mb-5 mt-3">Minimum amount you can withdraw is $10.</p>
              
            </div>
            <label>Select Payment Method</label>

              <select
  className="form-select  shadow-lg mb-4"
  value={selectedPaymentMethod ? selectedPaymentMethod.id : ""}
  onChange={(e) => {
    //const selectedId = parseInt(e.target.value);
    //const selectedMethod = paymentMethods.find((pm) => pm.id === selectedId);
    setSelectedPaymentMethod(e.target.value);
  }}
>
  <option value="">Select option</option>
  {paymentMethods.map((method) => (
    <option key={method.id} value={method.id}>
      {method.paymentMethod}
    </option>
  ))}
</select>


              <button className="btn btn-dark w-100 mt-3" onClick={handleSendPaymentRequest} disabled={loading}>
                {loading ? "Processing..." : "Confirm Payment"}
              </button>
            </div>
          )}

          {/* Step 5: View Payment Methods */}
          {currentStep === 5 && (
            <div className="modal-body">
              {paymentMethods.map((method) => (
                <div key={method.id} className="d-flex justify-content-between mb-2">
                  <span>{method.paymentMethod}</span>
                  <button className="btn btn-danger">Remove</button>
                </div>
              ))}
              <button className="btn btn-dark w-100" onClick={() => setCurrentStep(2)}>
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
