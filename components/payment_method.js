// Next.js Component for Add Money Modal
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import StripePayment from '../components/StripePayment';
import PayPalPayment from '../components/paypal';
const AddMoneyModal = ({ isOpen, onClose }) => {
  const { data: session } = useSession();
  const [selectedMethod, setSelectedMethod] = useState("");
  const userToken = session?.user?.token;

const closeHandler = () => {
    onClose();
  };


  return (
    
    isOpen && (

                <div id="paymentMethodChoose" className="payment-method-choose-parent" style={{ display: isOpen ? 'block' : 'none' }}>
                    <div className="payment-method-choose">
                        <button className="close-payment-method-choose"
                            id="closePaymentMethodChoose" onClick={closeHandler}>
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                        <div className="close-payment-method-choose">
                            <h3>Add Money To Wallet</h3>
                        </div>
                        {/* <div className="get-paid-price">
                            <i className="fa-solid fa-dollar-sign"></i>
                            <input className="form-control" value={amount}
                            onChange={(e) =>
                            setAmount(e.target.value)
                            }></input>
                        </div> */}
                        <p className="get-paid-note">Minimum amount you can add
                            is $10.</p>
                        
                            <div className="row">
                                <div className="col-12 form-child">
                                
                             <select
                                 id="payment-method"
                                 value={selectedMethod}
                                 onChange={(e) => setSelectedMethod(e.target.value)}>
                                  <option>Select</option>

                                 <option value="stripe">Stripe</option>
                                 {/* <option value="paypal">PayPal</option> */}
                             </select>
                                </div>
                            </div>
                        
                        
                    
                
        
          {selectedMethod === "stripe" && (
            
                <StripePayment token={userToken} user={session.user.id}/>
          )}

          {selectedMethod === "paypal" && (
                
                
                <PayPalPayment token={userToken}/>
                
          )}

          {/* <button className="submit-button" onClick={handlePayment} disabled={loading}>
            {loading ? "Processing..." : "Submit"}
          </button> */}
          </div>
          </div>
      
    )
    
  );
};

export default AddMoneyModal;
