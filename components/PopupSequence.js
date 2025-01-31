import React, { useState } from "react";
import { useRouter } from "next/router";

const PopupSequence = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleRedirectToWallet = () => {
    router.push("/wallet"); // Redirect to wallet page
  };

  return (
    <>
      {currentStep === 1 && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog modal-fullscreen">
            <div className="modal-content">
              <div className="modal-body text-center">
                <img
                  src="/assets/images/Blue.png"
                  alt="Thumbs Up"
                  style={{ width: "180px", marginBottom: "16px" }}
                />
                <h3 style={{ fontWeight: "bolder", fontSize: "24px", marginBottom: "18px", color: "#212529" }}>
                  Setup a wallet
                </h3>
                <p style={{ fontSize: "14px", color: "#6c757d", marginBottom: "24px" }}>
                  You can use the wallet balance for bidding. Please read our <a href="#">terms & conditions</a>.
                </p>
                <button
                  className="btn btn-dark"
                  onClick={handleNext}
                  style={{ padding: "12px", fontSize: "16px", fontWeight: "bold", borderRadius: "8px" }}
                >
                  Setup a wallet
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add balance to wallet</h5>
                <button type="button" className="btn-close" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <p style={{ fontSize: "72px", fontWeight: "bold", color: "#212529", margin: 0 }}>$0</p>
                <p style={{ color: "#6c757d", fontSize: "14px", marginBottom: "24px" }}>
                  Enter amount. We recommend you to add minimum $100 to your wallet.
                </p>
                <div className="mb-3">
                  <label className="form-label">Card Holder Name*</label>
                  <input type="text" className="form-control" placeholder="Enter full name here" />
                </div>
                <div className="mb-3 position-relative">
                  <label className="form-label">Card Number*</label>
                  <input type="text" className="form-control" placeholder="000 000 000 000 000" />
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
                    alt="Visa Logo"
                    style={{
                      width: "40px",
                      position: "absolute",
                      top: "50%",
                      right: "16px",
                      transform: "translateY(-50%)",
                    }}
                  />
                </div>
                <div className="row">
                  <div className="col-6 mb-3">
                    <label className="form-label">Expiry Date*</label>
                    <input type="text" className="form-control" placeholder="MM/YY" />
                  </div>
                  <div className="col-6 mb-3">
                    <label className="form-label">CVV*</label>
                    <input type="text" className="form-control" placeholder="000" />
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={handleNext}
                  style={{ fontSize: "16px", fontWeight: "bold", borderRadius: "8px", width: "100%" }}
                >
                  Add Balance
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body text-center">
                <img
                  src="/assets/images/Master-Card.png"
                  alt="Thumbs Up"
                  style={{ width: "180px", marginBottom: "16px" }}
                />
                <h3 style={{ fontWeight: "bold", fontSize: "24px", marginBottom: "8px", color: "#212529" }}>
                  Save Card Details
                </h3>
                <p style={{ fontSize: "14px", color: "#6c757d", marginBottom: "24px" }}>
                  Would you like to save this card information for later use? We never share your personal information
                  and payments are encrypted.
                </p>
                <button
                  className="btn btn-dark"
                  onClick={handleRedirectToWallet}
                  style={{ width: "100%", padding: "12px", fontSize: "16px", fontWeight: "bold", borderRadius: "8px" }}
                >
                  Save
                </button>
                <button
                  className="btn mt-3"
                  onClick={handleRedirectToWallet}
                  style={{ color: "#6c757d", width: "100%", fontSize: "16px" }}
                >
                  Not Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PopupSequence;
