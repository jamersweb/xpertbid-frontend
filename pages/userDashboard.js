import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import DashboardRecord from "../components/DashboardRecord";
import ListingCard from "../components/ListingCard";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import StepModals from "../components/StepModals";

const Dashboard = () => {
  const { data: session,status  } = useSession();
  const [isFirstLogin, setIsFirstLogin] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    listings: 0,
    biddings: 0,
    wallet: 0,
  });
// Check if User Logged in for the First Time
useEffect(() => {
  if (status === "authenticated" && session?.user) {
    if (!localStorage.getItem("hasLoggedIn")) {
      console.log("First-time login detected!",isFirstLogin);
      setIsFirstLogin(true);
      localStorage.setItem("hasLoggedIn", "true"); // Store flag in localStorage
    }
  }else{
    console.log(status,'working');
  }
}, [status, session]); // Run when session changes
  
useEffect((session) => {
    if (!session?.user?.token) {
      return; // If there's no token, do nothing yet
    }
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get("https://violet-meerkat-830212.hostingersite.com/public/api/dashboard",
          {
            headers: {
              Authorization: `Bearer ${session.user.token}`,
            },
          }
        );
        //const data = await response.json();
        setDashboardData({
          listings: response.data.auction || 0,
          biddings: response.data.bid || 0,
          wallet: response.data.wallet || 0,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, [session]);

  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      if (!session) {
        return; // Wait for the session to be initialized
      }
  
      try {
        const response = await axios.get(
          "https://violet-meerkat-830212.hostingersite.com/public/api/listings",
          {
            headers: {
              Authorization: `Bearer ${session.user.token}`,
            },
          }
        );
        setListings(response.data.auction || []);
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
       // setLoading(false);
      }
    };

    fetchListings();
  }, [session]);
  return (
    <>
    <Header />
    <StepModals />
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
    <div className="container listing-main-heading">
      <h2>My Listings</h2>
      <button className="button-style-3">See all</button>
    </div>
    <section className="listing">
    <div className="container dashboard-listing">
    
    {listings.length > 0 ? (
        listings.map((listing) => <ListingCard key={listing.id} listing={listing} />)
    ) : (
        <p>No listings available.</p>
    )}
    </div>
    </section>
    <Footer />
    </>
  );
};

export default Dashboard;
