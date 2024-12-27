import { useState,useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

const BidPage = ({product}) => {
  const [auctionId, setAuctionId] = useState(product.id);
  const [bidAmount, setBidAmount] = useState("");
  const [message, setMessage] = useState("");
  const { data: session } = useSession();
  //console.log('rage',product);
  const [highestBid, setHighestBid] = useState(0);
  const [highestBidder, setHighestBidder] = useState("Anonymous");

  const fetchHighestBid = async () => {
    try {
      const response = await axios.get(`https://violet-meerkat-830212.hostingersite.com/public/api/highest-bid/${product.id}`);
      if (response.data.success) {
        setHighestBid(response.data.highest_bid);
        setHighestBidder(response.data.user || "Anonymous");
      }
    } catch (error) {
      console.error("Error fetching the highest bid:", error);
    }
  };

  useEffect(() => {
    // Fetch initially
    fetchHighestBid();

    // Poll every 5 seconds
    const interval = setInterval(() => {
      fetchHighestBid();
    }, 5000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [product.id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }).format(date);
  };
  const handlePlaceBid = async () => {
    try {
      const response = await axios.post(
        "https://violet-meerkat-830212.hostingersite.com/public/api/bids",
        { auction_id: auctionId, bid_amount: bidAmount },
        { headers: { Authorization: `Bearer ${session.user.token}` } }
      );

      setMessage(response.data.message);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <>
        <div className="bid-rank-and-time">
          <div className="bid-price-and-rank">
            <span className="rank">Highest Bid</span>
            <div className="price">
              <i className="fa-solid fa-dollar-sign"></i>
              <span className="price-no">{highestBid}</span>USD
            </div>
          </div>
          <div className="bid-time-and-date">
            <span className="endin">End in</span>
            <p className="date">{formatDate(product.end_date)}</p>
          </div>
        </div>      
          <input type="hidden" value={product.id} />
        <input type="number" placeholder="USD" className="currency-and-price" value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
        />
        <div className="bid-place-button">
          <button className="place-bid" onClick={handlePlaceBid}>Place Bid</button>
        </div>
      {message && <p>{message}</p>}

      <div className="min-bid-and-estimate">
          <div className="minimum-bid">
            Minimum bid: <span className="bid-no">{product.minimum_bid}</span> USD.
          </div>
          <div className="estimate-bid">
            Estimate: <span className="bid-esti-no1">{product.reserve_price}</span> USD.
          </div>
        </div>
      </>
  );
};

export default BidPage;
