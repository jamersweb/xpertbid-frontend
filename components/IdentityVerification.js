import React, { useState } from "react";
import axios from "axios";

const IdentityVerification = () => {
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [documentType, setDocumentType] = useState("Identity Card");
  const [issueCountry, setIssueCountry] = useState("Pakistan");
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const handleFileUpload = (event, setImage) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSaveSettings = async () => {
    if (!frontImage || !backImage || !fullName || !birthDate) {
      alert("Please fill all required fields and upload both images.");
      return;
    }

    const formData = new FormData();
    formData.append("frontImage", frontImage);
    formData.append("backImage", backImage);
    formData.append("documentType", documentType);
    formData.append("issueCountry", issueCountry);
    formData.append("fullName", fullName);
    formData.append("birthDate", birthDate);

    try {
      await axios.post("https://violet-meerkat-830212.hostingersite.com/public/api/identity-verification", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Identity verification details saved successfully.");
    } catch (error) {
      console.error("Error saving identity verification details:", error);
      alert("Failed to save identity verification details.");
    }
  };

  return (
    <div className="profile" id="identity-verification">
      <div className="profile-heading-and-button">
        <h3>Identity Verification</h3>
        <button className="button-style-2" onClick={handleSaveSettings}>
          Save Settings
        </button>
      </div>
      <p className="mb-5 identity-note">
        Add your shipping address to ensure smooth deliveries for your auction wins. You can update or edit this address
        anytime for future purchases.
      </p>
      <div className="notify-setting-inner-box">
        <h3>Verify your identity with an ID document</h3>
        <ul className="identity-requirements">
          <li>A valid ID document in the issuing country.</li>
          <li>A clear picture where all four corners are visible.</li>
          <li>Include the back if it has identifying information.</li>
          <li>
            Certified, meaning another person confirms that the copy corresponds to the original by providing their
            signature, name clarification, and telephone number.
          </li>
        </ul>
        <div className="front-and-back">
          <div className="row">
            <div className="col-sm-6">
              <div className="front text-center">
                <input
                  type="file"
                  id="frontUpload"
                  accept="image/png, image/jpeg"
                  style={{ display: "none" }}
                  onChange={(e) => handleFileUpload(e, setFrontImage)}
                />
                <button
                  className="button-style-3"
                  onClick={() => document.getElementById("frontUpload").click()}
                >
                  <img src="./assets/images/document-upload-dark.svg" alt="Upload Front" /> Upload Front
                </button>
                {frontImage && <p className="my-3">{frontImage.name}</p>}
              </div>
            </div>
            <div className="col-sm-6">
              <div className="back text-center">
                <input
                  type="file"
                  id="backUpload"
                  accept="image/png, image/jpeg"
                  style={{ display: "none" }}
                  onChange={(e) => handleFileUpload(e, setBackImage)}
                />
                <button
                  className="button-style-3"
                  onClick={() => document.getElementById("backUpload").click()}
                >
                  <img src="./assets/images/document-upload-dark.svg" alt="Upload Back" /> Upload Back
                </button>
                {backImage && <p className="my-3">{backImage.name}</p>}
              </div>
            </div>
          </div>
          <p className="identity-note">JPG or PNG. Max 2 images.</p>
        </div>
      </div>

      <div className="document-types-and-format">
        <div className="row">
          <div className="col-md-6 form-child">
            <label htmlFor="documentType">Document Type</label>
            <select
              id="documentType"
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
            >
              <option value="Identity Card">Identity Card</option>
              <option value="Passport">Passport</option>
              <option value="Drivers License">Drivers License</option>
            </select>
          </div>
          <div className="col-md-6 form-child">
            <label htmlFor="issueCountry">Issue Country</label>
            <select
              id="issueCountry"
              value={issueCountry}
              onChange={(e) => setIssueCountry(e.target.value)}
            >
              <option value="Pakistan">Pakistan</option>
              <option value="United States">United States</option>
              <option value="United Kingdom">United Kingdom</option>
            </select>
          </div>
          <div className="col-md-6 form-child">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="col-md-6 form-child">
            <label htmlFor="birthDate">Birth Date</label>
            <input
              type="date"
              id="birthDate"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdentityVerification;
