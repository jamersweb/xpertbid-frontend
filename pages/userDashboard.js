import React, { useEffect, useState } from "react";
import DashboardRecord from "../components/DashboardRecord";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    listings: 0,
    biddings: 0,
    wallet: 0,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch("https://violet-meerkat-830212.hostingersite.com/public/api/dashboard");
        const data = await response.json();
        setDashboardData({
          listings: data.listings || 0,
          biddings: data.biddings || 0,
          wallet: data.wallet || 0,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch("https://violet-meerkat-830212.hostingersite.com/public/api/listings");
        const data = await response.json();
        setListings(data.listings);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchListings();
  }, []);
  return (
    <>
    <section className="dashboard-records">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4">
            <DashboardRecord
              image="./assets/images/dashboard-listing.svg"
              score={dashboardData.listings}
              title="Listings"
            />
          </div>
          <div className="col-md-4">
            <DashboardRecord
              image="./assets/images/dashboard-bidding.svg"
              score={dashboardData.biddings}
              title="Biddings"
            />
          </div>
          <div className="col-md-4">
            <DashboardRecord
              image="./assets/images/dashboard-wallet.svg"
              score={<><i className="fa-solid fa-dollar-sign"></i>{dashboardData.wallet}</>}
              title="Wallet"
            />
          </div>
        </div>
      </div>
    </section>
    <div className="listing-main-heading">
      <h2>My Listings</h2>
      <button className="button-style-3">See all</button>
    </div>
    <section className="listing">
    <div className="container-fluid dashboard-listing">
    <ListingsHeader />
    {listings.length > 0 ? (
        listings.map((listing) => <ListingCard key={listing.id} listing={listing} />)
    ) : (
        <p>No listings available.</p>
    )}
    </div>
    </section>
    </>
  );
};

export default Dashboard;
