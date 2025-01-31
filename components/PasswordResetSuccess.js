import React from "react";
import { useRouter } from "next/router"; // If using Next.js, otherwise replace with normal `a` tag

const PasswordResetSuccess = () => {
  const router = useRouter();

  const handleBackToLogin = () => {
    router.push("/login"); // Redirect to login page
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
        className="success-container text-center"
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
          src="/assets/images/Vector.png"
          alt="Success Icon"
          style={{ width: "180px", marginBottom: "16px" }}
        />
        <h3
          style={{
            fontWeight: "bold",
            fontSize: "24px",
            marginBottom: "8px",
            color: "#212529",
          }}
        >
          All done!
        </h3>
        <p
          style={{
            fontSize: "14px",
            color: "#6c757d",
            marginBottom: "24px",
          }}
        >
          Your new password has been set.
        </p>
        <button
          className="btn btn-dark"
          onClick={handleBackToLogin}
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
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default PasswordResetSuccess;
