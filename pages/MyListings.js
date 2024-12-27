import React, { useEffect, useState } from "react";
import ListingCard from "../components/ListingCard";

const MyListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch listings from the API
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/listings");
        const data = await response.json();
        setListings(data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (listings.length === 0) {
    return <p>No listings found.</p>;
  }

  return (
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
  );
};

export default MyListings;
