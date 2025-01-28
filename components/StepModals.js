import React, { useState, useEffect } from "react";

export default function StepModals() {
  const [currentStep, setCurrentStep] = useState(0); // Start with no modal shown

  useEffect(() => {
    // Check if the popup has already been shown
    const hasSeenPopup = localStorage.getItem("hasSeenPopup");
    if (!hasSeenPopup) {
      setCurrentStep(1); // Show the first modal
      localStorage.setItem("hasSeenPopup", "true"); // Mark as shown
    }
  }, []);

  const closeModal = () => setCurrentStep(0); // Close all modals
  const nextStep = () => setCurrentStep((prevStep) => prevStep + 1); // Go to the next step
  const previousStep = () => setCurrentStep((prevStep) => prevStep - 1); // Go to the previous step

  return (
    <>
      {/* Step 1 */}
      {currentStep === 1 && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ background: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="btn" onClick={previousStep}>
                  <i className="fa-solid fa-less-than"></i>
                </button>
                <h5 className="modal-title">Create your profile</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body text-center">
                <img src="assets/images/Group 1.png" className="my-4" alt="" />
                <h3>Welcome to ExpertBid</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Officiis, eum?
                </p>
              </div>
              <div className="modal-footer text-center">
                <button
                  className="btn btn-dark p-3 w-100"
                  onClick={nextStep}
                >
                  Start exploring!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 2 */}
      {currentStep === 2 && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ background: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create your profile</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Username*</label>
                    <input
                      type="text"
                      className="form-control shadow"
                      placeholder="Enter username"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Your Name*</label>
                    <input
                      type="email"
                      className="form-control shadow"
                      placeholder="Enter email"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Country*</label>
                    <select className="form-select shadow">
                      <option selected>Select an option</option>
                      <option value="1">Option 1</option>
                      <option value="2">Option 2</option>
                      <option value="3">Option 3</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email*</label>
                    <input
                      type="number"
                      className="form-control shadow"
                      placeholder="Enter number"
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-dark p-3 w-100"
                  onClick={nextStep}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add additional modals (Steps 3, 4) as needed */}
       {/* Step 3 */}
      {currentStep === 3 && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ background: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create your profile</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body text-center">
                <label className="form-label">Profile Picture</label>
                <input type="file" className="form-control mb-3" />
                <img
                  src="assets/images/Default_pfp.svg.png"
                  alt=""
                  className="my-4"
                />
                <h3>Add a profile picture</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Officiis, eum?
                </p>
              </div>
              <div className="modal-footer text-center">
                <button
                  className="btn btn-dark p-3 w-100"
                  onClick={nextStep}
                >
                  Upload
                </button>
                <button
                  className="btn btn-link p-3 w-100"
                  onClick={nextStep}
                >
                  I’ll do it later
                </button>
              </div>
            </div>
          </div>
        </div>
        
      )}
            {/* Step 4 */}
            {currentStep === 4 && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ background: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create your profile</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body text-center">
                <img
                  src="assets/images/dashboard-profile.png"
                  alt=""
                  className="my-4"
                />
                <h3>Looking good!</h3>
                <p>This photo will be added to your profile.</p>
              </div>
              <div className="modal-footer text-center">
                <button
                  className="btn btn-dark mx-3 p-3 w-40"
                  onClick={previousStep}
                >
                  Change photo
                </button>
                <button
                  className="btn btn-success mx-3 p-3 w-40"
                  onClick={closeModal}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


     


