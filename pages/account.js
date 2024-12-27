import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AddressComponent from "../components/AddressComponent";
import PasswordLoginSettings from "../components/PasswordLoginSettings";
import NotificationSettings from "../components/NotificationSettings";
import IdentityVerification from "../components/IdentityVerification";
const AccountSettings = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Profile Data
  const [profile, setProfile] = useState({
    username: "",
    phoneNumber: "",
    fullName: "",
    country: "",
  });
  const [businessInfo, setBusinessInfo] = useState({
    companyName: "",
    vatNumber: "",
  });
  const [profilePicture, setProfilePicture] = useState(null);

  // Address Data
  const [address, setAddress] = useState({
    street1: "",
    street2: "",
    city: "",
    state: "",
    postalCode: "",
    contactNumber: "",
    otherNumber: "",
  });

  // Notification Settings
  const [notifications, setNotifications] = useState({
    newsletters: true,
    outbidAlerts: true,
    republishedAlerts: false,
    reminders: {
      oneDay: true,
      oneHour: true,
      fifteenMinutes: false,
    },
  });

  // Password & Login Data
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Fetch data on load
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://127.0.0.1:8000/api/account-settings", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setProfile(response.data.profile);
        setAddress(response.data.address);
        setNotifications(response.data.notifications);
      } catch (error) {
        console.error("Error fetching account settings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e, setState) => {
    const { name, value, type, checked } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleProfilePictureUpload = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };

  const saveProfile = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("username", profile.username);
      formData.append("phoneNumber", profile.phoneNumber);
      formData.append("fullName", profile.fullName);
      formData.append("country", profile.country);
      if (profilePicture) {
        formData.append("profilePicture", profilePicture);
      }

      const response = await axios.post(
        "http://127.0.0.1:8000/api/user/update",
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setMessage(response.data.message || "Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("An error occurred while updating your profile.");
    } finally {
      setLoading(false);
    }
  };

  const saveAddress = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://127.0.0.1:8000/api/address/update",
        address,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setMessage(response.data.message || "Address updated successfully!");
    } catch (error) {
      console.error("Error updating address:", error);
      setMessage("An error occurred while updating your address.");
    } finally {
      setLoading(false);
    }
  };

  const saveNotifications = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://127.0.0.1:8000/api/notifications/update",
        notifications,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setMessage(response.data.message || "Notification settings updated!");
    } catch (error) {
      console.error("Error updating notifications:", error);
      setMessage("An error occurred while updating notifications.");
    } finally {
      setLoading(false);
    }
  };

  const savePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage("New password and confirm password do not match.");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        "http://127.0.0.1:8000/api/password/update",
        passwordData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setMessage(response.data.message || "Password updated successfully!");
    } catch (error) {
      console.error("Error updating password:", error);
      setMessage("An error occurred while updating your password.");
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <>
    <Header />
    <section className="account-setting">
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-4 user-setting">
            <div className="setting">
              <h3>User Settings</h3>
              <ul className="userSettingsMenu">
                <li>
                  <button
                    className={`profile-item ${
                      activeSection === "profile" ? "active" : ""
                    }`}
                    onClick={() => setActiveSection("profile")}
                  >
                    My Profile
                  </button>
                </li>
                <li>
                  <button
                    className={`profile-item ${
                      activeSection === "address" ? "active" : ""
                    }`}
                    onClick={() => setActiveSection("address")}
                  >
                    Address
                  </button>
                </li>
                <li>
                  <button
                    className={`profile-item ${
                      activeSection === "notifications" ? "active" : ""
                    }`}
                    onClick={() => setActiveSection("notifications")}
                  >
                    Notification Settings
                  </button>
                </li>
                <li>
                  <button
                    className={`profile-item ${
                      activeSection === "password" ? "active" : ""
                    }`}
                    onClick={() => setActiveSection("password")}
                  >
                    Password & Login
                  </button>
                </li>
                <li>
                  <button
                    className={`profile-item ${
                      activeSection === "identity" ? "active" : ""
                    }`}
                    onClick={() => setActiveSection("identity")}
                  >
                    Identity Verification
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Content Section */}
          <div className="col-lg-8 user-profile">
            {activeSection === "profile" && (
              <div>
                
                {/* Profile Form */}
                
              <div className="profile">
                <div className="profile-heading-and-button">
                  <h3>My Profile</h3>
                  <button
                    className="button-style-2"
                    onClick={saveProfile}
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
                <div className="profile-piture-and-upldRmov">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="profile-photo-format">
                        <img
                          id="profileImage"
                          src={profilePicture ? URL.createObjectURL(profilePicture) : "/assets/images/profile-circle.svg"}
                          alt="Profile"
                          style={{ width: "100px", height: "100px", objectFit: "cover" }}
                        />
                        <div className="profile-upload-btn">
                          <input
                            type="file"
                            id="profileInput"
                            accept="image/png, image/jpeg"
                            onChange={handleProfilePictureUpload}
                            style={{ display: "none" }}
                          />
                          <button
                            className="upload upload-btn button-style-3"
                            onClick={() => document.getElementById("profileInput").click()}
                          >
                            Upload
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="personal-information">
                  <h3>Personal Information</h3>
                  <form>
                    <div className="row">
                      <div className="col-md-6 form-child">
                        <label>Username*</label>
                        <input
                          type="text"
                          name="username"
                          value={profile.username}
                          onChange={(e) => handleInputChange(e, setProfile)}
                        />
                      </div>
                      <div className="col-md-6 form-child">
                        <label>Phone Number*</label>
                        <input
                          type="text"
                          name="phoneNumber"
                          value={profile.phoneNumber}
                          onChange={(e) => handleInputChange(e, setProfile)}
                        />
                      </div>
                      <div className="col-md-6 form-child">
                        <label>Your Full Name*</label>
                        <input
                          type="text"
                          name="fullName"
                          value={profile.fullName}
                          onChange={(e) => handleInputChange(e, setProfile)}
                        />
                      </div>
                      <div className="col-md-6 form-child">
                        <label>Country*</label>
                        <select
                          name="country"
                          value={profile.country}
                          onChange={(e) => handleInputChange(e, setProfile)}
                        >
                          <option value="United States">United States</option>
                          <option value="United Kingdom">United Kingdom</option>
                        </select>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            
                
              </div>
            )}
            {activeSection === "address" && (
              <div>
                
                <AddressComponent />
                
              </div>
            )}
            {activeSection === "notifications" && (
              <div>
                
                <NotificationSettings />
                
              </div>
            )}
            {activeSection === "password" && (
              <div>
                
                <PasswordLoginSettings />
                
              </div>
            )}
            {activeSection === "identity" && (
              <div>
                
                <IdentityVerification />
                
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
    <Footer />
    </>
  );
};

export default AccountSettings;
