import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';
import React, { useState } from "react";
import { unstable_noStore as noStore } from 'next/cache';

noStore();
const PayPalPayment = ({token} ) => {
    //console.log(amount);
      const [amount, setAmount] = useState("");
    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };
    //const price = amounts;
    const handleApprove = async (data) => {
        try {
            const response = await axios.post('/api/paypal-payment-success', {
                orderId: data.orderID,
            });

            alert('Payment successful: ' + response.data.message);
        } catch (err) {
            alert('Payment failed: ' + err.response?.data?.message || err.message);
        }
    };
    //console.log("Amount to send:", amount);

    const createOrder = async () => {
        console.log("Amount to send:", token);

                    const response = await axios.post('/api/paypal-payment', {
                        amount: 44, // Amount to charge
                        token:token
                    });
                    const approvalUrl = response.data.approval_url;
                    //alert(approvalUrl);
                    window.location.href = approvalUrl;
                    return response.data.orderID;
    };
    //console.log('sfsf',price)
    return (
        <>
        <div>
                <label htmlFor="amount">Enter Amount:</label>
                <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={handleAmountChange}
                    placeholder="Enter amount to add"
                />.
            </div>
        <PayPalScriptProvider options={{ 'client-id': 'AfPVbyshC2H1txfGFG0yzfbGjI4XU3QeiIm8IHAZhJhfh_j11pVoVsmmgvIbnToTQ9Xm63rRIPr6bj6o' }}>
            <PayPalButtons
                createOrder={createOrder}
                onApprove={handleApprove}
            />
        </PayPalScriptProvider>
        </>
    );
};

export default PayPalPayment;