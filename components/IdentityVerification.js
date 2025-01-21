import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

const IdentityVerification = () => {
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [documentType, setDocumentType] = useState("Identity Card");
  const [issueCountry, setIssueCountry] = useState("");
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { data: session } = useSession();

  // Fetch countries and pre-fill data on load
  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const [countriesRes, identityRes] = await Promise.all([
          axios.get("https://violet-meerkat-830212.hostingersite.com/public/api/get-countries"),
          axios.get("https://violet-meerkat-830212.hostingersite.com/public/api/get-identity-verification", {
            headers: { Authorization: `Bearer ${session.user.token}` },
          }),
        ]);
        setCountries(countriesRes.data.country);
        setDocumentType(identityRes.data[0].document_type || "Identity Card");
        setIssueCountry(identityRes.data[0].issue_country || "");
        setFullName(identityRes.data[0].full_name || "");
        setBirthDate(identityRes.data[0].birth_date || "");
      } catch (error) {
        console.error("Error fetching identity data:", error);
      }
    };

    fetchData();
  }, []);

  const handleFileUpload = (event, setImage) => {
    const file = event.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      if (file.size <= 2 * 1024 * 1024) {
        setImage(file);
      } else {
        alert("File size exceeds 2MB limit.");
      }
    } else {
      alert("Only JPG and PNG files are allowed.");
    }
  };

  const handleSaveSettings = async () => {
    if (!frontImage || !backImage || !fullName || !birthDate || !issueCountry) {
      setMessage("Please fill all required fields and upload both images.");
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
      setLoading(true);
      const response = await axios.post(
        "https://violet-meerkat-830212.hostingersite.com/public/api/identity-verification",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${session.user.token}`,
          },
        }
      );
      setMessage("Identity verification details saved successfully.");
    } catch (error) {
      console.error("Error saving identity verification details:", error);
      setMessage("Failed to save identity verification details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile" id="identity-verification">
      <div className="profile-heading-and-button">
        <h3>Identity Verification</h3>
        <button
          className="button-style-2"
          onClick={handleSaveSettings}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Settings"}
        </button>
      </div>
      <p className="mb-5 identity-note">
        Verify your identity to enhance your account security and enable
        advanced features. Upload a valid ID document.
      </p>
      {message && <p className="alert-message text-success alert alert-success">{message}</p>}
      <div className="notify-setting-inner-box">
        <h3>Verify your identity with an ID document</h3>
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
                  Upload Front
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
                  Upload Back
                </button>
                {backImage && <p className="my-3">{backImage.name}</p>}
              </div>
            </div>
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
                <option value="Driver's License">Driver's License</option>
              </select>
            </div>
            <div className="col-md-6 form-child">
              <label htmlFor="issueCountry">Issue Country</label>
              <select
                id="issueCountry"
                value={issueCountry}
                onChange={(e) => setIssueCountry(e.target.key)}
              >
                <option value="">Select Country</option>
              {Array.isArray(countries) &&
                countries.map((country) => (
                <option key={country.id} value={country.name}>
                  {country.name}
                </option>
              ))}
              </select>
            </div>
            <div className="col-md-6 form-child">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter Full Name"
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
    </div>
  );
};

export default IdentityVerification;
