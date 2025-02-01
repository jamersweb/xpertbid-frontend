import React, { useState } from "react";
import { useRouter } from "next/router";

const PopupSequence = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleRedirectToWallet = () => {
    onComplete(); // Call function to update WalletPage state and set localStorage
    router.push("/wallet"); // Redirect to wallet page
  };

  return (
    <>
      {currentStep === 1 && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog modal-fullscreen">
            <div className="modal-content">
              <div className="modal-body text-center">
                <img src="/assets/images/Blue.png" alt="Thumbs Up" style={{ width: "180px", marginBottom: "16px" }} />
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
                <div className="modal-input">
                  <label  htmlFor="name">Card Holder Name*</label>
                  <input type="name"
                  className="shadow-lg p-2"
                  placeholder="Enter full name here"
                  />
                  <label  htmlFor="number">Card Number*</label>
                  <input type="number"
                  className="shadow-lg p-2"
                  placeholder="000 000 000 000 000"
                  />
                  <div className="row">
                  <div className="col-6">
                  <label  htmlFor="date">Expiry Date*</label>
                  <input type="date"
                  className="shadow-lg p-2"
                  placeholder="20/12"
                  />
                  </div>
                  <div className="col-6">
                  <label  htmlFor="number">CVV*</label>
                  <input type="number"
                  className="shadow-lg p-2"
                  placeholder="000"
                  />
                  </div>
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
                <h3 style={{ fontWeight: "bold", fontSize: "24px", marginBottom: "8px", color: "#212529" }}>
                  Save Card Details
                </h3>
                <button className="btn btn-dark" onClick={handleRedirectToWallet} style={{ width: "100%", fontSize: "16px" }}>
                  Save
                </button>
                <button className="btn mt-3" onClick={handleRedirectToWallet} style={{ width: "100%", fontSize: "16px" }}>
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
