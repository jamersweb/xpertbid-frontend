import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import React, { useState } from "react";

const PayPalPayment = ({ token }) => {
  const [amount, setAmount] = useState("");

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const createOrder = async () => {
    const response = await axios.post("https://violet-meerkat-830212.hostingersite.com/public/api/paypal-payment", {
      amount: parseFloat(amount),
      token,
    });
    window.location.href = response.data.approval_url;
    return response.data.orderID;
  };

  const handleApprove = async (data) => {
    try {
      const response = await axios.post("https://violet-meerkat-830212.hostingersite.com/public/api/paypal-payment-success", {
        orderId: data.orderID,
      });
      alert("Payment successful: " + response.data.message);
    } catch (err) {
      alert("Payment failed: " + (err.response?.data?.message || err.message));
    }
  };

  const isValidAmount = parseFloat(amount) > 0;

  return (
    <>
      <div>
        <label htmlFor="amount">Enter Amount:</label>
        <input
          type="number"
          id="amount"
          onChange={handleAmountChange}
          placeholder="Enter amount to add"
          value={amount}
        />
      </div>

      {isValidAmount ? (
        <PayPalScriptProvider
          options={{
            "client-id":
              "AfPVbyshC2H1txfGFG0yzfbGjI4XU3QeiIm8IHAZhJhfh_j11pVoVsmmgvIbnToTQ9Xm63rRIPr6bj6o",
          }}
        >
          <PayPalButtons createOrder={createOrder} onApprove={handleApprove} />
        </PayPalScriptProvider>
      ) : (
        <p>Please enter a valid amount above 0 to enable PayPal checkout.</p>
      )}
    </>
  );
};

export default PayPalPayment;
