import React, { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setMessage("A password reset link has been sent to your email.");
    } else {
      setMessage("Please enter a valid email address.");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
      }}
    >
      <div
        className="forgot-password-container text-center"
        style={{
          background: "#ffffff",
          borderRadius: "16px",
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.1)",
          padding: "32px",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <img
          src="/assets/images/forget-pass.png"
          alt="Forgot Password Icon"
          style={{ width: "100px", marginBottom: "16px" }}
        />
        <h3
          style={{
            fontWeight: "bold",
            fontSize: "24px",
            marginBottom: "8px",
            color: "#212529",
          }}
        >
          Forgot your password?
        </h3>
        <p
          style={{
            fontSize: "14px",
            color: "#6c757d",
            marginBottom: "24px",
          }}
        >
          Enter your registered email to get a new password link.
        </p>
        
        {message && <p style={{ color: "green", fontSize: "14px" }}>{message}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email here"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                borderRadius: "8px",
                padding: "12px",
                fontSize: "14px",
                border: "1px solid #e0e0e0",
              }}
            />
          </div>
          <button
            type="submit"
            className="btn btn-dark"
            style={{
              width: "100%",
              padding: "12px",
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: "8px",
              backgroundColor: "#212529",
              color: "#ffffff",
              border: "none",
              textDecoration: "none",
            }}
          >
            Send link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
