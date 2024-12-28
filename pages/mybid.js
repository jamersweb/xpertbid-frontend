//import React, { useState, useEffect } from "react";
//import TabNavigation from "../components/TabNavigation";
//import AuctionCard from "../components/AuctionCard";
import Header from "../components/Header";
import Footer from "../components/Footer";
const BiddingTabs = () => {
  //const [activeTab, setActiveTab] = useState("active");
  //const [auctions, setAuctions] = useState([]);

  // const tabs = [
  //   { id: "active", label: "Active" },
  //   { id: "won", label: "Won Auctions" },
  //   { id: "lost", label: "Lost Auctions" },
  // ];

  // useEffect(() => {
  //   // Fetch data dynamically based on the active tab
  //   const fetchAuctions = async () => {
  //     try {
  //       const response = await fetch(
  //         `https://violet-meerkat-830212.hostingersite.com/public/api/auctions?status=${activeTab}`
  //       );
  //       const data = await response.json();
  //       setAuctions(data.auctions);
  //     } catch (error) {
  //       console.error("Error fetching auctions:", error);
  //     }
  //   };

  //   fetchAuctions();
  // }, [activeTab]);

  return (
    <>
    <Header />
    <section className="biddings-tabs">
            <div className="container-fluid">
                <ul className="nav nav-tabs bid-tabs-child" id="myTab"
                    role="tablist">
                    <li className="nav-item col-sm-4 col-12 bid-tabs-anchor"
                        role="presentation">
                        <button className="nav-link active w-100"
                            id="activeBids-tab" data-bs-toggle="tab"
                            data-bs-target="#activeBids" type="button"
                            role="tab" aria-controls="activeBids"
                            aria-selected="true">Active</button>
                    </li>
                    <li className="nav-item col-sm-4 col-12 bid-tabs-anchor"
                        role="presentation">
                        <button className="nav-link w-100" id="winAuctions-tab"
                            data-bs-toggle="tab" data-bs-target="#winAuctions"
                            type="button" role="tab" aria-controls="winAuctions"
                            aria-selected="false">Won Auctions</button>
                    </li>
                    <li className="nav-item col-sm-4 col-12 bid-tabs-anchor"
                        role="presentation">
                        <button className="nav-link w-100" id="lostAuctions-tab"
                            data-bs-toggle="tab" data-bs-target="#lostAuctions"
                            type="button" role="tab"
                            aria-controls="lostAuctions"
                            aria-selected="false">Lost Auctions</button>
                    </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="activeBids"
                        role="tabpanel" aria-labelledby="activeBids-tab">

                        <div className="bid-main-heading">
                            <h2>Active Bids</h2>
                        </div>

                        <div className="row makt-parent">
                            <div
                                className="col-lg-4 col-md-6 mkt-child">
                                <div className="market-card">
                                    <div className="mkt-img">
                                        <img
                                            src="./assets/images/active-bid.png"
                                            />
                                        <div className="counter">
                                            <span className="hour">08h</span>
                                            <span className="minutes">09m</span>
                                            <span className="seconds">22s</span>
                                        </div>
                                    </div>
                                    <div className="mkt-body">
                                        <div
                                            className="mkt-pro-head">
                                            <h3>GUNNAR
                                                ANDER</h3>
                                        </div>
                                        <div className="mkt-detail">
                                            <div
                                                className="mkt-crt-bid">
                                                <span
                                                    className="crnt-bid">My
                                                    Bid</span>
                                                <div
                                                    className="mkt-Mybid-price"><i
                                                        className="fa-solid fa-dollar-sign"></i>
                                                    <span
                                                        className="price">175</span>
                                                    USD</div>
                                            </div>
                                            <div
                                                className="mkt-crt-bid">
                                                <span
                                                    className="crnt-bid">Current
                                                    Bid</span>
                                                <div
                                                    className="mkt-currentBid-price"><i
                                                        className="fa-solid fa-dollar-sign"></i>
                                                    <span
                                                        className="price">180</span>
                                                    USD</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="tab-pane fade" id="winAuctions"
                        role="tabpanel" aria-labelledby="activeBids-tab">

                        <div className="bid-main-heading">
                            <h2>Active Bids</h2>
                        </div>

                        <div className="row makt-parent">
                            <div
                                className="col-lg-4 col-md-6 mkt-child">
                                <div className="market-card">
                                    <div className="mkt-img">
                                        <img
                                            src="./assets/images/active-bid.png"
                                            />
                                        <div className="counter">
                                            <span className="hour">08h</span>
                                            <span className="minutes">09m</span>
                                            <span className="seconds">22s</span>
                                        </div>
                                    </div>
                                    <div className="mkt-body">
                                        <div
                                            className="mkt-pro-head">
                                            <h3>GUNNAR
                                                ANDER</h3>
                                        </div>
                                        <div className="mkt-detail">
                                            <div
                                                className="mkt-crt-bid">
                                                <span
                                                    className="crnt-bid">My
                                                    Bid</span>
                                                <div
                                                    className="mkt-Mybid-price"><i
                                                        className="fa-solid fa-dollar-sign"></i>
                                                    <span
                                                        className="price">175</span>
                                                    USD</div>
                                            </div>
                                            <div
                                                className="mkt-crt-bid">
                                                <span
                                                    className="crnt-bid">Current
                                                    Bid</span>
                                                <div
                                                    className="mkt-currentBid-price"><i
                                                        className="fa-solid fa-dollar-sign"></i>
                                                    <span
                                                        className="price">180</span>
                                                    USD</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="tab-pane fade" id="lostAuctions"
                        role="tabpanel" aria-labelledby="activeBids-tab">

                        <div className="bid-main-heading">
                            <h2>Active Bids</h2>
                        </div>

                        <div className="row makt-parent">
                            <div
                                className="col-lg-4 col-md-6 mkt-child">
                                <div className="market-card">
                                    <div className="mkt-img">
                                        <img
                                            src="./assets/images/active-bid.png"
                                            />
                                        <div className="counter">
                                            <span className="hour">08h</span>
                                            <span className="minutes">09m</span>
                                            <span className="seconds">22s</span>
                                        </div>
                                    </div>
                                    <div className="mkt-body">
                                        <div
                                            className="mkt-pro-head">
                                            <h3>GUNNAR
                                                ANDER</h3>
                                        </div>
                                        <div className="mkt-detail">
                                            <div
                                                className="mkt-crt-bid">
                                                <span
                                                    className="crnt-bid">My
                                                    Bid</span>
                                                <div
                                                    className="mkt-Mybid-price"><i
                                                        className="fa-solid fa-dollar-sign"></i>
                                                    <span
                                                        className="price">175</span>
                                                    USD</div>
                                            </div>
                                            <div
                                                className="mkt-crt-bid">
                                                <span
                                                    className="crnt-bid">Current
                                                    Bid</span>
                                                <div
                                                    className="mkt-currentBid-price"><i
                                                        className="fa-solid fa-dollar-sign"></i>
                                                    <span
                                                        className="price">180</span>
                                                    USD</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    
                </div>
            </div>
    </section>
    <Footer />
    </>
  );
};

export default BiddingTabs;