import { useState , useEffect } from "react";
import TransactionHistory from "../components/transcations";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WalletBalance from "../components/walletDisplay";
import MultiStepModal from "../components/MultiStepModal"; // Import MultiStepModal
import AddMoneyModal from "../components/payment_method"; // Import AddMoneyModal
import { useSession } from "next-auth/react";
import PopupSequence from "../components/PopupSequence"; // Import Popup Component

  

const WalletPage = () => {
  const { data: session } = useSession();
  const [isMultiStepModalOpen, setIsMultiStepModalOpen] = useState(false); // State for MultiStepModal
  const [isAddMoneyModalOpen, setIsAddMoneyModalOpen] = useState(false); // State for AddMoneyModal
  const [showPopup, setShowPopup] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Check if user has seen popups before
    const popupShown = localStorage.getItem("popupShown");

    if (!popupShown) {
      setShowPopup(true); // Show popups if not seen before
    }
  }, []);
  

 
  const handlePopupClose = () => {
    setShowPopup(false);
    localStorage.setItem("popupShown", "true"); // Mark as shown in localStorage
  };

  const openMultiStepModal = () => {
    setIsAddMoneyModalOpen(false); // Ensure AddMoneyModal is closed
    setIsMultiStepModalOpen(true); // Open MultiStepModal
  };

  const openAddMoneyModal = () => {
    setIsMultiStepModalOpen(false); // Ensure MultiStepModal is closed
    setIsAddMoneyModalOpen(true); // Open AddMoneyModal
  };

  const closeMultiStepModal = () => setIsMultiStepModalOpen(false); // Close MultiStepModal
  const closeAddMoneyModal = () => setIsAddMoneyModalOpen(false); // Close AddMoneyModal

  return (
    <>
      <Header />

      {showPopup && <PopupSequence onComplete={handlePopupClose} />} {/* Show Popup Only Once */}

      <section className="data-wallet">
        <div className="container-fluid">
          <h1 className="main-heading">My Wallet</h1>

          <div className="balance-inquery-and-payment">
            <div className="row">
              <div className="col-lg-6 col-md-4">
                <div className="available-balance">
                  <p>Available balance</p>
                  <div className="balance">
                    <i className="fa-solid fa-dollar-sign"></i>
                    <span className="balance-number">
                      <WalletBalance />
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-8">
                <div className="payment-methods-btns">
                  <button className="payment-methods" id="openPaymentMethod">
                    Payment Methods
                  </button>
                  <button className="button-style-3" onClick={openAddMoneyModal}>
                    Add Money
                  </button>
                  <button className="button-style-2" onClick={openMultiStepModal}>
                    Get Paid
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="transections-save-cards">
            <div className="row">
              <div className="col-md-8">
                <div className="transections">
                  <h3 className="heading">Recent Transactions</h3>
                </div>

                <div className="table-parent">
                  <TransactionHistory />
                </div>
              </div>
              <div className="col-md-4">
                <div className="save-cards">
                  <div className="heading">
                    <h3>Cards</h3>
                    
                  </div>

                  <div className="save-cards-info">
                    <div className="card-img-bar">
                      <img
                        src="./assets/images/card-icon3.svg"
                        className="card-icon"
                      />
                      <img
                        src="./assets/images/card-icon2.svg"
                        className="bar-icon"
                      />
                    </div>
                    <div className="card-holder-number">
                      <div className="sequence">
                        <span className="no-1">1</span>
                        <span className="no-1">2</span>
                        <span className="no-1">4</span>
                        <span className="no-1">7</span>
                      </div>
                      <div className="sequence">
                        <span className="no-5">1</span>
                        <span className="no-6">2</span>
                        <span className="no-7">4</span>
                        <span className="no-8">7</span>
                      </div>
                      <div className="sequence">
                        <span className="no-9">1</span>
                        <span className="no-10">2</span>
                        <span className="no-11">4</span>
                        <span className="no-12">7</span>
                      </div>
                      <div className="sequence">
                        <span className="no-13">1</span>
                        <span className="no-14">2</span>
                        <span className="no-15">4</span>
                        <span className="no-16">7</span>
                      </div>
                    </div>
                    <div className="card-holder-name">
                      <div className="row">
                        <div className="align-items-center d-flex mt-4">
                          <div className="col-6">
                            <p className="label">Card Holder</p>
                            <p className="holder-name">{session?.user?.name}</p>
                          </div>
                          <div className="col-6 d-flex justify-content-end">
                            <img src="./assets/images/card-icon1.svg" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <Footer />

      {/* AddMoneyModal */}
      <AddMoneyModal isOpen={isAddMoneyModalOpen} onClose={closeAddMoneyModal} />

      {/* MultiStepModal */}
      <MultiStepModal isOpen={isMultiStepModalOpen} onClose={closeMultiStepModal} />
    </>
  );
};

export default WalletPage;
