import React, { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import StripePayment from '../components/StripePayment';

const PopupSequence = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();
  const { data: session } = useSession();
  const userToken = session?.user?.token;

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
                <div></div>
                <h5 className="modal-title ms-4">Add balance to wallet</h5>
                <button type="button" className="btn-close" onClick={handleRedirectToWallet} aria-label="Close"></button>
              </div>
              <div className="modal-body px-4">
                <p className="text-center d-block p-4" style={{ fontSize: "72px", fontWeight: "bold", color: "#212529", margin: "20px" }}>$0</p>
                <p className="text-center px-4" style={{ color: "#6c757d", fontSize: "14px", marginBlock: "24px" }}>
                  Enter amount. We recommend you to add minimum $100 to your wallet.
                </p>
                <StripePayment token={userToken} user={session.user.id}/>

                <button
                  type="button"
                  className="btn btn-dark my-4 p-3"
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
                src="assets/images/Blue-1.png"
                />
                <h3 style={{ fontWeight: "bold", fontSize: "24px", marginBottom: "8px", color: "#212529" }}>
                  Save Card Details
                </h3>
                <p className="px-4 my-4" style={{
                  color:"rgb(133, 127, 127)",
                  fontSize:"14px"
                }}>
                Would you like save this card information for later use? We never share your personal information and payments are encrypted.
                </p>
                <button className="btn btn-dark mt-4 py-3" onClick={handleRedirectToWallet} style={{ width: "100%", fontSize: "16px" }}>
                  Save
                </button>
                <button className="btn mt-3 py-3" onClick={handleRedirectToWallet} style={{ width: "100%", fontSize: "16px" }}>
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
