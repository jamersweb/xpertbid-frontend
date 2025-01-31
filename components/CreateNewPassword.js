import React, { useState } from "react";
import PropTypes from "prop-types";

const CreateNewPassword = ({ onSubmit, onCancel }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = (type) => {
    if (type === "newPassword") {
      setShowNewPassword(!showNewPassword);
    } else if (type === "confirmPassword") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      onSubmit(newPassword); // Pass the new password to the parent component
    } else {
      alert("Passwords do not match!");
    }
  };

  return (
    <div
      className="reset-password-container"
      style={{
        background: "#ffffff",
        borderRadius: "16px",
        boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.1)",
        padding: "32px",
        maxWidth: "400px",
        width: "100%",
        margin: "auto",
      }}
    >
      <h3
        style={{
          fontWeight: "bold",
          fontSize: "24px",
          marginBottom: "24px",
          textAlign: "center",
        }}
      >
        Create New Password
      </h3>
      <form onSubmit={handleSubmit}>
        {/* New Password */}
        <div className="mb-3 password-input" style={{ position: "relative" }}>
          <label htmlFor="newPassword" className="form-label">
            New Password
          </label>
          <input
            type={showNewPassword ? "text" : "password"}
            className="form-control"
            id="newPassword"
            placeholder="Enter your password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            style={{
              borderRadius: "8px",
              padding: "12px",
              fontSize: "14px",
              border: "1px solid #e0e0e0",
            }}
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => togglePasswordVisibility("newPassword")}
            style={{
              position: "absolute",
              right: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              style={{ width: "20px", height: "20px", color: "#6c757d" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.98 8.223c-1.298 1.664-1.298 3.893 0 5.556M8.223 3.98c1.664-1.298 3.893-1.298 5.556 0M19.777 8.223c1.298 1.664 1.298 3.893 0 5.556M15.98 19.777c-1.664 1.298-3.893 1.298-5.556 0M8.223 15.98c-1.664 1.298-3.893 1.298-5.556 0M19.777 15.98c-1.298-1.664-1.298-3.893 0-5.556M15.98 8.223c-1.298-1.664-3.893-1.298-5.556 0"
              ></path>
            </svg>
          </button>
        </div>

        {/* Confirm Password */}
        <div className="mb-3 password-input" style={{ position: "relative" }}>
          <label htmlFor="confirmPassword" className="form-label">
            Confirm New Password
          </label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            className="form-control"
            id="confirmPassword"
            placeholder="Enter your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{
              borderRadius: "8px",
              padding: "12px",
              fontSize: "14px",
              border: "1px solid #e0e0e0",
            }}
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => togglePasswordVisibility("confirmPassword")}
            style={{
              position: "absolute",
              right: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              style={{ width: "20px", height: "20px", color: "#6c757d" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.98 8.223c-1.298 1.664-1.298 3.893 0 5.556M8.223 3.98c1.664-1.298 3.893-1.298 5.556 0M19.777 8.223c1.298 1.664 1.298 3.893 0 5.556M15.98 19.777c-1.664 1.298-3.893 1.298-5.556 0M8.223 15.98c-1.664-1.298-3.893-1.298-5.556 0M19.777 15.98c-1.298-1.664-1.298-3.893 0-5.556M15.98 8.223c-1.298-1.664-3.893-1.298-5.556 0"
              ></path>
            </svg>
          </button>
        </div>

        {/* Submit and Cancel Buttons */}
        <div className="d-flex justify-content-between">
          <button
            type="submit"
            className="btn btn-dark"
            style={{
              padding: "12px",
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: "8px",
              flex: 1,
              marginRight: "10px",
            }}
          >
            Reset Password
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={onCancel}
            style={{
              padding: "12px",
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: "8px",
              flex: 1,
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

// Define PropTypes for better validation
CreateNewPassword.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default CreateNewPassword;
