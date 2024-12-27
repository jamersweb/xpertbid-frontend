import React, { useState, useEffect } from "react";
import TabNavigation from "../components/TabNavigation";
import AuctionCard from "../components/AuctionCard";

const BiddingTabs = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [auctions, setAuctions] = useState([]);

  const tabs = [
    { id: "active", label: "Active" },
    { id: "won", label: "Won Auctions" },
    { id: "lost", label: "Lost Auctions" },
  ];

  useEffect(() => {
    // Fetch data dynamically based on the active tab
    const fetchAuctions = async () => {
      try {
        const response = await fetch(
          `https://violet-meerkat-830212.hostingersite.com/public/api/auctions?status=${activeTab}`
        );
        const data = await response.json();
        setAuctions(data.auctions);
      } catch (error) {
        console.error("Error fetching auctions:", error);
      }
    };

    fetchAuctions();
  }, [activeTab]);

  return (
    <section className="biddings-tabs">
      <div className="container-fluid">
        <TabNavigation tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="tab-content">
          {tabs.map((tab) => (
            <div
              className={`tab-pane fade ${
                activeTab === tab.id ? "show active" : ""
              }`}
              id={tab.id}
              role="tabpanel"
              key={tab.id}
            >
              <div className="bid-main-heading">
                <h2>{tab.label}</h2>
              </div>
              <div className="row makt-parent">
                {auctions.length > 0 ? (
                  auctions.map((auction) => (
                    <AuctionCard key={auction.id} auction={auction} />
                  ))
                ) : (
                  <p>No auctions found.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BiddingTabs;