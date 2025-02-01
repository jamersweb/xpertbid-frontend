import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function MultiStepModals() {
  const { data: session } = useSession();
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [previewImage, setPreviewImage] = useState("assets/images/profile-circle.png");
  const [countries, setCountries] = useState([]);

  const [profileData, setProfileData] = useState({
    username: "",
    name: "",
    email: "",
    phone: "",
    country_id: "",
    user_type: "",
  });

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          "https://violet-meerkat-830212.hostingersite.com/public/api/get-countries"
        );
        setCountries(response.data?.country || []);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);


  useEffect(() => {
    if (session?.user) {
      setProfileData({
        username: session.user.username || "",
        name: session.user.name || "",
        email: session.user.email || "",
        phone: session.user.phone || "",
        country_id: session.user.country_id || "",
        user_type: session.user.user_type || "",
      });

      if (session.user.profile_pic) {
        setPreviewImage(session.user.profile_pic);
      }
    }
  }, [session]);

  const handleCardClick = (type) => {
    setProfileData((prev) => ({
      ...prev,
      user_type: type === "Individual" ? "individual" : "business",
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setPreviewImage(e.target.result);
      reader.readAsDataURL(file);
      setSelectedFile(file); // Store the file in state
    }
  };
  useEffect(() => {
    if (!localStorage.getItem("hasSeenPopups")) {
      setCurrentStep(1);
      localStorage.setItem("hasSeenPopups", "true");
    }
  }, []);
  
  // Close modal
  const closeModal = () => setCurrentStep(0);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  // Modal navigation
  const nextStep = () => setCurrentStep((prevStep) => prevStep + 1);
  const previousStep = () => setCurrentStep((prevStep) => prevStep - 1);
  const handleSubmitProfileInfo = async () => {
    if (!session) {
      alert("You must be signed in to continue.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", profileData.name);
      formData.append("email", profileData.email);
      formData.append("phone", profileData.phone);
      formData.append("country_id", profileData.country_id);
      formData.append("user_type", profileData.user_type);

      // Append profile picture if selected
      if (selectedFile) {
        formData.append("profile_pic", selectedFile);
      }

      const response = await axios.post(
        "https://violet-meerkat-830212.hostingersite.com/public/api/user/update",
        formData,
        {
          headers: {
            Authorization: `Bearer ${session.user.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.profile) {
        alert("Profile Info Updated Successfully!");
        closeModal();
      } else {
        alert("Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating the profile. Please try again.");
    }
  };
  return (
    <>
      {/* Step 1 - Profile Welcome */}
      {currentStep === 1 && (
        <div className="modal fade show d-block" style={{ background: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title ms-4">Create your profile</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body text-center">
                <img src="assets/images/Group-1.png" className="my-4" alt="" />
                <h3>Welcome to ExpertBid</h3>
                <p className="uppara px-5">Pick an image that shows your face. This picture won’t be public.</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-dark w-100 py-3" onClick={nextStep}>
                  Start exploring!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 2 - Individual or Business Owner Selection */}
      {currentStep === 2 && (
        <div className="modal fade show d-block">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Create your profile</h5>
            </div>
            <div className="modal-body">
              <h3 className="fw-bold my-3">How would you like to continue?</h3>
              <div className="d-flex justify-content-center gap-3 mx-auto">
                {/* Individual Card */}
                <div   className={`choice-card shadow-lg text-center ${profileData.user_type === "Individual" ? "selected-card" : ""}`}
 onClick={() => handleCardClick("Individual")}>
                  <img src="assets/images/individual.png" alt="Individual" className="img-fluid mx-auto my-3" />
                  <span>I am an individual</span>
                </div>
                {/* Business Owner Card */}
                <div   className={`choice-card shadow-lg text-center ${profileData.user_type === "business" ? "selected-card" : ""}`}
 onClick={() => handleCardClick("Business Owner")}>
                  <img src="assets/images/business-icon.png" alt="Business Owner" className="img-fluid mx-auto my-3" />
                  <span>I am a business owner</span>
                </div>
                
              </div>
            </div>
            <div className="modal-footer">
                <button className="btn btn-dark w-100 py-3" onClick={nextStep}>
                  Continue
                </button>
            </div>
          </div>
        </div>
      </div>
      )}

      {/* Remaining steps have been incremented (Step 3, Step 4, Step 5) */}
      {/* Add your existing step logic here for steps 3, 4, and 5 */}

      {/* Step 3 - Profile Info Form */}
      {currentStep === 3 && (
        <div className="modal fade show d-block" style={{ background: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <div></div>
                <h5 className="modal-title ms-4">Create your profile</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Username*</label>
                    <input
                      type="text"
                      className="form-control shadow-lg"
                      name="username"
                      value={profileData.username}
                      onChange={handleInputChange}
                      placeholder="Enter username"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Your Name*</label>
                    <input
                      type="text"
                      className="form-control shadow-lg"
                      name="name"
                      value={profileData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Country*</label>
                    <select
                      name="country_id"
                      value={profileData.country_id}
                      onChange={handleInputChange}
                      className="form-control shadow-lg"
                    >
                      <option value="">Select Country</option>
                      {countries.map((country) => (
                        <option key={country.id} value={country.id}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button className="btn btn-dark w-100 py-3" onClick={nextStep}>
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
         {/* Step 4 - Profile Picture Upload */}
         {currentStep === 4 && (
        <div className="modal fade show d-block" style={{ background: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <div></div>
                <h5 className="modal-title ms-4">Upload Profile Picture</h5>

                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body text-center">
              <input type="file" ref={fileInputRef} className="d-none" onChange={handleFileChange} accept="image/*" />
              <img
                src={previewImage}
                alt="Profile"
                className="my-4 rounded-circle"
                style={{ width: "150px", height: "150px", cursor: "pointer" }}
                onClick={() => fileInputRef.current.click()}
              />

                <h3 className="my-3">Add a profile picture</h3>
                <p className="px-4 uppara">Pick an image that shows your face. Your picture won’t be
                public, we will keep this for our record.</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-dark w-100 py-3" onClick={nextStep}>
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
         )}
           {/* Step 5 - Final Confirmation */}
      {currentStep === 5 && (
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
                <button className="btn btn-dark mx-1  px-5 py-3" style={{width: "47%", border:"2px solid black"}} onClick={handleSubmitProfileInfo}>
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
