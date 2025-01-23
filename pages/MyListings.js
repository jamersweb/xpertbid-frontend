import React, { useEffect, useState } from "react";
import ListingCard from "../components/ListingCard";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSession } from "next-auth/react";
import axios from "axios";

const MyListings = () => {
    const { data: session } = useSession();
  
  const [listings, setListings] = useState();
  const [loading, setLoading] = useState(true);

  // Fetch listings from the API
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
        setLoading(false);
      }
    };
  
    fetchListings();
  }, [session]);
  

  if (loading) {
    return <p>Loading...</p>;
  }

  // if (listings.length === 0) {
  //  // return <p>No listings found.</p>;
  // }

  return (
    <>
    <Header />
    <section className="listing">
      <div className="container-fluid">
        <div className="listing-main-heading">
          <h2>My Listings</h2>
        </div>
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </section>
    <Footer />
    </>
  );
};

export default MyListings;
