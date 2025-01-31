import React from "react";
import { useRouter } from "next/router"; // If using Next.js, otherwise use normal `a` tag

const CheckYourEmail = () => {
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
        className="email-check-container"
        style={{
          background: "#ffffff",
          borderRadius: "16px",
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.1)",
          padding: "20px 32px",
          maxWidth: "450px",
          width: "100%",
          textAlign: "center",
        }}
      >
        {/* Header Section */}
        <div
          className="header d-flex align-items-center"
          style={{
            marginBottom: "24px",
            paddingBottom: "20px",
            borderBottom: "1px solid #EDEDED",
          }}
        >
          <button
            className="down-arrow"
            onClick={() => router.back()}
            style={{
              width: "30px",
              height: "30px",
              backgroundColor: "#EDEDED",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "20px",
              border: "none",
            }}
          >
            <img src="/assets/images/arrow-down.png" alt="Back" />
          </button>
          <h5
            className="modal-title text-center flex-grow-1"
            style={{ fontWeight: "bold", fontSize: "18px", margin: "0" }}
          >
            Login or Sign up
          </h5>
          <span></span> {/* Placeholder for layout balance */}
        </div>

        {/* Email Icon */}
        <img
          src="/assets/images/mail.svg"
          alt="Email Icon"
          style={{ width: "200px", marginBottom: "16px" }}
        />

        {/* Title */}
        <h3
          style={{
            fontWeight: "bold",
            fontSize: "24px",
            marginBlock: "18px",
            color: "#212529",
          }}
        >
          Please Check your email
        </h3>

        {/* Description */}
        <p
          style={{
            fontSize: "14px",
            color: "#6c757d",
            marginBlock: "24px",
          }}
        >
          We sent a password reset link to your email. Sometimes it shows in the spam folder, so please check that.
        </p>

        {/* Back to Login Button */}
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
          }}
        >
          Back to login
        </button>
      </div>
    </div>
  );
};

export default CheckYourEmail;
