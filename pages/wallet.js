import { useState } from 'react';
import axios from 'axios';
import TransactionHistory from '../components/transcations';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useSession } from "next-auth/react";
import WalletBalance from '../components/walletDisplay';
import AddMoneyModal from '../components/payment_method';
import { useRouter } from "next/router";
const WalletPage = () => {
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState(0);
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { status, message } = router.query;

  const openModal = () => {
    //alert('sdf');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchBalance = async () => {
    const response = await axios.get('/api/wallet');
    setBalance(response.data.balance);
  };

  const handleStripePayment = async () => {
    const stripeToken = 'YOUR_STRIPE_TOKEN'; // Get Stripe token from client-side
    await axios.post('/api/stripe-payment', { amount, stripeToken });
    fetchBalance();
  };

  return (
    <>
    <Header />
    <section className="data-wallet">
            <div className="container-fluid">
                <h1 className="main-heading">My Wallet</h1>

                <div className="balance-inquery-and-payment">
                    <div className="row">
                        <div className="col-lg-6 col-md-4">
                            <div className="available-balance">
                                <p>Available balance</p>
                                <div className="balance"><i
                                        className="fa-solid fa-dollar-sign"></i>
                                    <span
                                        className="balance-number"><WalletBalance /></span></div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-8">
                            <div className="payment-methods-btns">
                                <button className="payment-methods"
                                    id="openPaymentMethod">Payment
                                    Methods</button><button
                                    className="button-style-3" onClick={openModal}>Add Money</button>
                                    
                                <button className="button-style-2">Get Paid</button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="transections-save-cards">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="transections">
                                <h3 className="heading">Recent Transactions</h3>
                                
                            </div>

                            <div className="table-parent">
                            <TransactionHistory />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="save-cards">
                                <div className="heading">
                                    <h3>Save Cards</h3>
                                    <button class="add-new-method-btn"
                                        id="addNewMethodBtn">Add
                                        New</button>
                                </div>

                                <div className="save-cards-info">
                                    <div className="card-img-bar">
                                        <img
                                            src="./assets/images/card-icon3.svg"
                                             class="card-icon" />
                                        <img
                                            src="./assets/images/card-icon2.svg"
                                             className="bar-icon" />
                                    </div>
                                    <div className="card-holder-number">
                                        <div className="sequence"><span
                                                className="no-1">1</span><span
                                                className="no-1">2</span><span
                                                className="no-1">4</span><span
                                                className="no-1">7</span></div>
                                        <div className="sequence"><span
                                                className="no-5">1</span><span
                                                className="no-6">2</span><span
                                                className="no-7">4</span><span
                                                className="no-8">7</span></div>
                                        <div className="sequence"><span
                                                className="no-9">1</span><span
                                                className="no-10">2</span><span
                                                className="no-11">4</span><span
                                                className="no-12">7</span></div>
                                        <div className="sequence"><span
                                                className="no-13">1</span><span
                                                className="no-14">2</span><span
                                                className="no-15">4</span><span
                                                className="no-16">7</span></div>
                                    </div>
                                    <div className="card-holder-name">
                                        <div className="row">
                                            <div
                                                className="align-items-center d-flex mt-4">
                                                <div className="col-6">
                                                    <p className="label">card
                                                        Holder</p>
                                                    <p class="holder-name">Name
                                                        Here</p>
                                                </div>
                                                <div
                                                    className="col-6 d-flex justify-content-end"><img
                                                        src="./assets/images/card-icon1.svg"
                                                        /></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                

                <AddMoneyModal isOpen={isModalOpen} onClose={closeModal} />
                
                <div id="getPaid" className="get-paid">
                    <div className="get-paid-content">
                        <button className="close-btn-get-paid" id="getPaidClose"><i
                                className="fa-solid fa-xmark"></i></button>
                        <div className="get-paid-pop-up-heading">
                            <h3>Add Money</h3>
                        </div>
                        <div className="get-paid-price"><i
                                className="fa-solid fa-dollar-sign"></i> <span
                                className="price-no">0</span></div>
                        <p className="get-paid-note">Minimum amount you can add
                            is $10.</p>
                        <button className="button-style-2 w-100">Add Payment
                            Method</button>
                    </div>
                </div>

               
                <div id="getPaid2" className="get-paid2">
                    <div className="get-paid-content2">
                        <button className="close-btn-get-paid" id="getPaidback"><i
                                className="fa-solid fa-chevron-left"></i></button>
                        <div className="get-paid-pop-up-heading">
                            <h3>Add Payment Method</h3>
                        </div>
                        <form action>
                            <div class="col-12 form-child">
                                <label for>Select Payment Method</label>
                                <select name id>
                                    <option value="paypal">Paypal</option>
                                    <option value="bank">Stripe</option>
                                </select>
                            </div>
                            <div className="paypal-payment">
                                <div className="col-12 form-child"
                                    id="paypalPayment">
                                    <label for>Paypal ID</label>
                                    <input type="text"
                                        placeholder="Enter your paypal id here"/>
                                </div>
                            </div>
                            <div className="bank-payment" id="bankPayment">
                                <div className="col-12 form-child">
                                    <label for>Bank Name*</label>
                                    <input type="text"
                                        placeholder="Bank Name" />
                                </div>
                                <div className="col-12 form-child">
                                    <label for>IBAN Number*</label>
                                    <input type="text"
                                        placeholder="IBAN Number" />
                                </div>
                                <div className="col-12 form-child">
                                    <label for>Swift Code*</label>
                                    <input type="text"
                                        placeholder="Swift Code" />
                                </div>
                                <div className="col-12 form-child">
                                    <label for>Account Title*</label>
                                    <input type="text"
                                        placeholder="Account Title" />
                                </div>
                                <div className="col-12 form-child">
                                    <label for>Country*</label>
                                    <select name id>
                                        <option value>Pakistan</option>
                                        <option value>United States</option>
                                        <option value>United Kingdom</option>
                                    </select>
                                </div>
                                <div className="col-12 form-child">
                                    <label for>Branch Address*</label>
                                    <input type="text"
                                        placeholder="Branch Address" />
                                </div>
                            </div>
                            <div className="btn-save-changes">
                                <button className="button-style-2 w-100">Save
                                    Changes</button>
                            </div>
                        </form>
                    </div>
                </div>

                
                <div id="paymentMethodChoose"
                    className="payment-method-choose-parent">
                    <div className="payment-method-choose">
                        <button className="close-payment-method-choose"
                            id="closePaymentMethodChoose">
                            <i className="fa-solid fa-chevron-left"></i>
                        </button>
                        <div className="close-payment-method-choose">
                            <h3>Get Paid</h3>
                        </div>
                        <div className="get-paid-price">
                            <i className="fa-solid fa-dollar-sign"></i>
                            <span className="price-no">0</span>
                        </div>
                        <p className="get-paid-note">Minimum amount you can withdraw
                            is $10.</p>
                        <form id="paymentForm">
                            <div className="row">
                                <div className="col-12 form-child">
                                    <label for="paymentSelect">Select Payment
                                        Method</label>
                                    <select name="paymentMethod"
                                        id="paymentSelect">
                                        <option value>-- Choose Payment Method
                                            --</option>
                                        <option value="PK64*****2724">UBL
                                            (PK64*****2724)</option>
                                        <option value="PK63*****2244">UBL
                                            (PK63*****2244)</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                        <div className="send-request-btn">
                            <button className="w-100 button-style-2"
                                id="sendRequest">Send Request</button>
                        </div>
                    </div>
                </div>

                
                <div id="addNewMethod" className="add-new-method-parent">
                    <div className="add-new-method">
                        <button className="close-add-new-method"
                            id="closeAddNewMethod">
                            <i className="fa-solid fa-chevron-left"></i>
                        </button>
                        <div className="close-payment-method-choose">
                            <h3>Payment Methods</h3>
                        </div>
                        <div className="add-new-payment-method">
                            <form action>
                                <div className="method">
                                    <div className="payment-info-img">
                                        <img
                                            src="./assets/images/bank.svg"
                                            />
                                        <span
                                            className="paymentInfo">UBL(PK64*****2724)</span>
                                    </div>
                                    <div className="method-btns">
                                        <button
                                            className="trash-payment-method"
                                            id="trash-payment-method"><img
                                                src="./assets/images/trashred.svg"
                                                /></button>
                                        <button
                                            className="edit-payment-method"
                                            id="edit-payment-method"><img
                                                src="./assets/images/editpen.svg"
                                                /></button>

                                    </div>
                                </div>
                                <div className="method">
                                    <div className="payment-info-img">
                                        <img src="./assets/images/bank.svg" />
                                        <span
                                            className="paymentInfo">UBL(PK64*****2724)</span>
                                    </div>
                                    <div className="method-btns">
                                        <button
                                            className="trash-payment-method"
                                            id="trash-payment-method"><img
                                                src="./assets/images/trashred.svg"
                                                /></button>
                                        <button
                                            className="edit-payment-method"
                                            id="edit-payment-method"><img
                                                src="./assets/images/editpen.svg"
                                                /></button>

                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="send-request-btn">
                            <button class="w-100 button-style-2"
                                id="sendRequest">Add New Payment
                                Method</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    
    
    
      
          
            {/* <StripePayment />
        
            
            <Paypal /> */}
       <Footer />
    </>
  );
};

export default WalletPage;