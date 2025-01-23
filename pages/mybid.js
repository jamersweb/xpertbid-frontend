import React, { useState, useEffect } from "react";
import TabNavigation from "../components/TabNavigation";
import AuctionCard from "../components/AuctionCard";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSession } from "next-auth/react";
import { Oval } from "react-loader-spinner"; // Import the loader

const BiddingTabs = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(false); // Add loading state
  const { data: session } = useSession();
  
  const tabs = [
    { id: "active", label: "Active" },
    { id: "won", label: "Won Auctions" },
    { id: "lost", label: "Lost Auctions" },
  ];

  useEffect(() => {
    const fetchAuctions = async () => {
      if (!session?.user?.token) return;

      setLoading(true); // Show loader
      try {
        const response = await fetch(
          `https://violet-meerkat-830212.hostingersite.com/public/api/auctions?status=${activeTab}`,
          {
            headers: {
              Authorization: `Bearer ${session.user.token}`,
            },
          }
        );
        const data = await response.json();
        setAuctions(data.auctions || []);
      } catch (error) {
        console.error("Error fetching auctions:", error);
      } finally {
        setLoading(false); // Hide loader
      }
    };

    fetchAuctions();
  }, [activeTab, session]);

  return (
    <>
      <Header />
      <section className="biddings-tabs">
        <div className="container-fluid">
          <TabNavigation tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
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
                  {loading ? ( // Show loader when loading
                    <div className="loader-container">
                      <Oval
                        height={80}
                        width={80}
                        color="#4fa94d"
                        secondaryColor="#4fa94d"
                        ariaLabel="oval-loading"
                        strokeWidth={2}
                        strokeWidthSecondary={2}
                      />
                    </div>
                  ) : auctions.length > 0 ? (
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
      <Footer />
    </>
  );
};

export default BiddingTabs;
