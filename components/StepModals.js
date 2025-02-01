import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function MultiStepModals() {
  const { data: session } = useSession();
  const [countries, setCountries] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const fileInputRef = useRef(null);

  const [profileData, setProfileData] = useState({
    username: "",
    name: "",
    email: "",
    phone: "",
    country_id: "",
  });

  const [previewImage, setPreviewImage] = useState("assets/images/profile-circle.png");

  // Fetch countries from API
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

  // Load user profile dynamically from session
  useEffect(() => {
    if (session?.user) {
      setProfileData({
        username: session.user.username || "",
        name: session.user.name || "",
        email: session.user.email || "",
        phone: session.user.phone || "",
        country_id: session.user.country_id || "",
      });

      if (session.user.profile_pic) {
        setPreviewImage(session.user.profile_pic);
      }
    }
  }, [session]);

  // Show popups only once
  useEffect(() => {
    if (!localStorage.getItem("hasSeenPopups")) {
      setCurrentStep(1);
      localStorage.setItem("hasSeenPopups", "true");
    }
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image selection
  const handleImageClick = () => fileInputRef.current.click();

  // Handle image preview update
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setPreviewImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  // Close modal
  const closeModal = () => setCurrentStep(0);

  // Modal navigation
  const nextStep = () => setCurrentStep((prevStep) => prevStep + 1);
  const previousStep = () => setCurrentStep((prevStep) => prevStep - 1);

  // Submit profile info
  const handleSubmitProfileInfo = async () => {
    if (!session) {
      alert("You must be signed in to continue.");
      return;
    }

    try {
      const response = await axios.post(
        "https://violet-meerkat-830212.hostingersite.com/public/api/user/update",
        {
          name: profileData.name,
          email: profileData.email,
          phone: profileData.phone,
          country_id: profileData.country_id,
        },
        {
          headers: {
            Authorization: `Bearer ${session.user.token}`,
          },
        }
      );

      if (response.data.profile) {
        alert("Profile Info Updated Successfully!");
        nextStep();
      } else {
        alert("Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating the profile. Please try again.");
    }
  };

  const handleCardClick = (type) => {
    console.log(`${type} selected`);
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
        <div className="modal fade show d-block" style={{ background: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  className="down-arrow "
                  type="button"
                  onClick={previousStep}
                  aria-label="Back"
                >
                  <img
                    src="assets/images/arrow-down.png"
                    alt="Back"
                    className="ms-1"
                  />
                </button>
                <h5 className="modal-title">Create your profile</h5>
                <span>Step 1/3</span>
              </div>
              <div className="modal-body">
                <h3 className="fw-bloder my-3">How you would like to continue?</h3>
                <p className="uppara my-4 mb-5" >
                  This will help us to understand your identity. Both users have
                  the same features, but profile creation has different fields.
                </p>
                <div className="d-flex justify-content-center gap-3 mx-auto">
                  {/* Individual Card */}
                  <div
                    className="choice-card shadow-lg text-center"
                    onClick={() => handleCardClick("Individual")}
                  >
                    <img
                      src="assets/images/individual.png"
                      style={{width:"50px" , objectFit:"none"}}
                      alt="Individual"
                      className="img-fluid mx-auto my-3"
                    />
                    <span>I am an individual</span>
                  </div>
                  {/* Business Owner Card */}
                  <div
                    className="choice-card shadow-lg text-center"
                    onClick={() => handleCardClick("Business Owner")}
                  >
                    <img
                      src="assets/images/business-icon.png"
                      alt="Business Owner"
                      style={{width:"50px" , objectFit:"none"}}
                      className="img-fluid mx-auto my-3"
                    />
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
                <button className="btn btn-dark w-100 py-3" onClick={handleSubmitProfileInfo}>
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
                  style={{ width: "150px", height:"150px" , objectFit:"cover" ,  cursor: "pointer" }}
                  onClick={handleImageClick}
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
