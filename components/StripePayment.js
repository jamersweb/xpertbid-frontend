import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe('pk_test_fKZAzAVqh3g3fg7ruTOEFwE600oylgtoVu');

const CheckoutForm = ({token}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    //console.log(token);
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        try {
            setLoading(true);

            // Call Laravel API to create payment intent
            const { data } = await axios.post('https://violet-meerkat-830212.hostingersite.com/public/api/stripe-payment',
             { amount },
             {
               headers: {
                 Authorization: `Bearer ${token.token}`,
               },
             });

            // Confirm payment with Stripe
            const { error } = await stripe.confirmCardPayment(data.clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });

            if (error) {
                setMessage(error.message);
            } else {
                setMessage('Payment successful!');
            }
        } catch (err) {
            setMessage('Payment failed. ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="number"
                className='form-control mb-3 paypalinput'
                placeholder="Enter Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
            />
            <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
                <CardElement />
            </div>
            {message && <p className='text-danger text-start'>{message}</p>}
            <button type="submit" className='submit-button btn btn-paypal bg-dark text-light px-5  text-end py-2' disabled={!stripe || loading}>
                {loading ? 'Processing...' : 'Pay'}
            </button>
           
        </form>
    );
};

const StripePayment = (token) => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm token={token}/>
        </Elements>
    );
};

export default StripePayment;
