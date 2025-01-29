import React, { useState, useRef, useEffect } from "react";
import SignupModal from "@/components/SignupModal";
import LoginModal from "@/components/LoginModal";
import axios from "axios";


export default function MultiStepModals() {
  const [currentStep, setCurrentStep] = useState(0);
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState("assets/images/profile-circle.png");

  useEffect(() => {
    // Show the popups only once
    const hasSeenPopups = localStorage.getItem("hasSeenPopups");
    if (!hasSeenPopups) {
      setCurrentStep(1); // Start from Signup
      localStorage.setItem("hasSeenPopups", "true");
    }
  }, []);

  // Handle image click
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  // Handle file input change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result); // Set image preview
      };
      reader.readAsDataURL(file);
    }
  };

  // Modal controls
  const closeModal = () => setCurrentStep(0);
  const nextStep = () => setCurrentStep((prevStep) => prevStep + 1);
  const previousStep = () => setCurrentStep((prevStep) => prevStep - 1);
  // const handleSubmitProfileInfo = async () => {
  //   try {
  //     const response = await axios.post(
  //       "https://violet-meerkat-830212.hostingersite.com/public/api/update-profile",
  //       {
  //         name: profileData.name,          // ✅ Full Name
  //         email: profileData.email,        // ✅ Email
  //         phone: profileData.phone,        // ✅ Phone Number
  //         country_id: profileData.country_id, // ✅ Country ID
  //       },
  //       { headers: { "Content-Type": "application/json" } }
  //     );
  
  //     if (response.data.profile) { // ✅ Check if the profile is returned
  //       alert("Profile Info Updated Successfully!");
  //       nextStep(); // ✅ Move to next step only after success
  //     } else {
  //       alert("Failed to update profile. Please try again.");
  //     }
  //   } catch (error) {
  //     console.error("Error updating profile:", error);
  //     alert("An error occurred. Please try again.");
  //   }
  // };
  
  
  return (
    <>
      {/* Step 1 - Signup */}
      {currentStep === 1 && <SignupModal isOpen={true} onClose={nextStep} />}

      {/* Step 2 - Login */}
      {currentStep === 2 && <LoginModal isOpen={true} onClose={nextStep} />}

      {/* Step 3 - Profile Welcome */}
      {currentStep === 3 && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ background: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
              <div className="d-block "></div>
                <h5 className="modal-title ms-4">Create your profile</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body text-center">                
                <img src="assets/images/Group-1.png" className="my-4" alt="" />
                <h3>Welcome to ExpertBid</h3>
                <p className="px-5 my-3 font-size">
                  Pick an image that shows your face. Your picture won’t be public, we will keep this for our record.
                </p>
              </div>
              <div className="modal-footer text-center">
                <button className="btn btn-dark p-3 w-100" onClick={nextStep}>
                  Start exploring!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 4 - Profile Info Form */}
         {/* Step 4 - Profile Info Form */}
         {currentStep === 4 && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ background: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
              <div className="d-block "></div>
              <h5 className="modal-title ms-4">Create your profile</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Username*</label>
                    <input type="text" className="form-control proin shadow" placeholder="Enter username" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Your Name*</label>
                    <input type="email" className="form-control proin shadow" placeholder="Enter email" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Country*</label>
                    <select className="form-select proin shadow">
                      <option selected>Select an option</option>
                      <option value="1">Option 1</option>
                      <option value="2">Option 2</option>
                      <option value="3">Option 3</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email*</label>
                    <input type="email" className="form-control proin shadow" placeholder="Enter email" />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button className="btn btn-dark p-3 w-100" onClick={nextStep}>
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Step 5 - Profile Picture Upload */}
      {currentStep === 5 && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ background: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header"><div className="d-block "></div>
                <h5 className="modal-title ms-4">Upload Profile Picture</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body text-center">
                <input type="file" ref={fileInputRef} className="d-none" onChange={handleFileChange} accept="image/*" />
                <img src={previewImage} alt="Profile" className="my-4 rounded-circle" 
                  style={{ width: "150px", height: "150px", cursor: "pointer", objectFit: "cover" }} 
                  onClick={handleImageClick} 
                />
                <h3>Add a profile picture</h3>
               <p className="px-5 my-4  font-size"> Pick an image that shows your face. Your picture won’t be
               public, we will keep this for our record.</p>
              </div>
              <div className="modal-footer text-center" style={{border : "none" }}>
                <button className="btn btn-dark p-3 w-100" onClick={nextStep}>
                  Upload
                </button>
                <button className="btn btn-link p-3 w-100 text-decoration-none text-secondary-emphasis" onClick={nextStep}>
                  I’ll do it later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 6 - Final Confirmation */}
      {currentStep === 6 && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ background: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
              <div className="d-block "></div>
                <h5 className="modal-title ms-4">Profile Setup Complete</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body text-center">
                <img src={previewImage} alt="Profile" className="my-4 rounded-circle" style={{ width: "150px", height: "150px" }} />
                <h3>Looking good!</h3>
                <p className="my-4 font-size ">This photo will be added to your profile.</p>
              </div>
              <div className="modal-footer text-start justify-content-start "  style={{border : "none"}}>
                <button className="btn mx-1 px-5 py-3" style={{width: "47%" , color : "black", border : "2px solid black" }} onClick={previousStep}>
                  Change photo
                </button>
                <button className="btn btn-dark mx-1  px-5 py-3" style={{width: "47%", border:"2px solid black"}} onClick={closeModal}>
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