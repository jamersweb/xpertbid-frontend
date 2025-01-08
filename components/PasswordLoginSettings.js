import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

const PasswordLoginSettings = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordRequirements, setPasswordRequirements] = useState({
    lowercase: false,
    uppercase: false,
    number: false,
    length: false,
    match: false,
    notSame: true,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
 const { data: session } = useSession();
  // Fetch user details when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://violet-meerkat-830212.hostingersite.com/public/api/user/details",
          {
            headers: { Authorization: `Bearer ${session.user.token}` },
          }
        );
        setPhoneNumber(response.data.phoneNumber);
        setContactEmail(response.data.contactEmail);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchData();
  }, []);

  const handlePasswordChange = (password) => {
    setNewPassword(password);
    setPasswordRequirements({
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      length: password.length >= 8,
      notSame: password !== oldPassword,
      match: password === confirmPassword,
    });
  };

  const handleConfirmPasswordChange = (password) => {
    setConfirmPassword(password);
    setPasswordRequirements((prev) => ({
      ...prev,
      match: password === newPassword,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      setLoading(true);
      const payload = { phoneNumber, contactEmail };
      const response = await axios.post(
        "https://violet-meerkat-830212.hostingersite.com/public/api/user/save-login",
        payload,
        {
          headers: { Authorization: `Bearer ${session.user.token}` },
        }
      );
      setMessage("Login information updated successfully!");
    } catch (error) {
      console.error("Error saving login information:", error);
      setMessage("Failed to update login information.");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!passwordRequirements.match || !passwordRequirements.notSame) {
      setMessage("Password does not meet the requirements!");
      return;
    }

    try {
      setLoading(true);
      const payload = { oldPassword, newPassword };
      const response = await axios.post(
        "https://violet-meerkat-830212.hostingersite.com/public/api/user/change-password",
        payload,
        {
          headers: { Authorization: `Bearer ${session.user.token}` },
        }
      );
      setMessage("Password changed successfully!");
    } catch (error) {
      console.error("Error changing password:", error);
      setMessage("Failed to change password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile" id="password-login">
      <div className="profile-heading-and-button">
        <h3>Password & Login</h3>
        <button
          className="button-style-2"
          onClick={handleSaveChanges}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
      <div className="profile-form">
        <form>
          <div className="row">
            <div className="col-12 form-child">
              <label htmlFor="phoneNumber">Phone Number*</label>
              <input
                type="text"
                id="phoneNumber"
                value={phoneNumber}
                placeholder="Phone Number"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="col-12 form-child">
              <label htmlFor="contactEmail">Contact Email</label>
              <input
                type="email"
                id="contactEmail"
                value={contactEmail}
                placeholder="Contact Email"
                onChange={(e) => setContactEmail(e.target.value)}
              />
            </div>
          </div>
        </form>
        <p className="mb-4">
          We will send you a verification code on your given email to confirm it’s you. After that you can set up a
          password for your account.
        </p>
        <div className="password-content">
          <h3>Create New Password</h3>
          <div className="create-password-form">
            <form onSubmit={handleChangePassword}>
              <div className="col-12 create-password-child">
                <label htmlFor="oldPassword">Old Password</label>
                <input
                  type="password"
                  id="oldPassword"
                  value={oldPassword}
                  placeholder="Enter your old password"
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
              <div className="col-12 create-password-child">
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  placeholder="Enter your new password"
                  onChange={(e) => handlePasswordChange(e.target.value)}
                />
              </div>
              <div className="col-12 create-password-child">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  placeholder="Confirm your new password"
                  onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                />
              </div>
              <ul className="password-requirements">
                <li>
                  <i
                    className={`fa-solid ${
                      passwordRequirements.lowercase ? "fa-circle-check" : "fa-circle-xmark"
                    }`}
                  ></i>{" "}
                  At least one lowercase letter
                </li>
                <li>
                  <i
                    className={`fa-solid ${
                      passwordRequirements.uppercase ? "fa-circle-check" : "fa-circle-xmark"
                    }`}
                  ></i>{" "}
                  At least one uppercase letter
                </li>
                <li>
                  <i
                    className={`fa-solid ${
                      passwordRequirements.number ? "fa-circle-check" : "fa-circle-xmark"
                    }`}
                  ></i>{" "}
                  At least one number
                </li>
                <li>
                  <i
                    className={`fa-solid ${
                      passwordRequirements.length ? "fa-circle-check" : "fa-circle-xmark"
                    }`}
                  ></i>{" "}
                  Minimum 8 characters
                </li>
                <li>
                  <i
                    className={`fa-solid ${
                      passwordRequirements.match ? "fa-circle-check" : "fa-circle-xmark"
                    }`}
                  ></i>{" "}
                  Passwords must match
                </li>
                <li>
                  <i
                    className={`fa-solid ${
                      passwordRequirements.notSame ? "fa-circle-check" : "fa-circle-xmark"
                    }`}
                  ></i>{" "}
                  New password must not be the same as the old one
                </li>
              </ul>
              <button type="submit" className="button-style-2 change-password w-100">
                Change Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordLoginSettings;