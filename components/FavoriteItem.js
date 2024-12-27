// components/FavoriteItem.js
import Link from 'next/link';
import React, { useEffect } from 'react';
//import { useSession } from "next-auth/react";
import CountdownTimer from './countdown';
const FavoriteItem = ({ item }) => {
    //const [timeLeft, setTimeLeft] = useState(item.timeLeft);
   // const { data: session } = useSession();
    //const userToken = session?.user?.token; // Assumes token is part of session data

  useEffect(() => {
    const interval = setInterval(() => {
      // Calculate time left
      const endTime = new Date(item.auctionEndTime);
      const now = new Date();
      const diff = endTime - now;

      if (diff > 0) {
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        setTimeLeft({ hours, minutes, seconds });
      } else {
        // Auction ended
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [item.auctionEndTime]);

  // const removeFavorite = async (itemId) => {
  //   try {
  //     await axios.delete(`https://violet-meerkat-830212.hostingersite.com/public/api/favorites/${itemId}`, {
  //       headers: {
  //         Authorization: `Bearer ${userToken}`,
  //       },
  //     });
  //     setFavorites(favorites.filter((item) => item.id !== itemId));
  //   } catch (error) {
  //     console.error('Error removing favorite item:', error);
  //   }
  // };
  
  
  return (
    <div className="col-lg-4 col-md-6 mkt-child">
      <div className="market-card">
        <div className="mkt-img">
          <img src={`https://violet-meerkat-830212.hostingersite.com/public/${item.image}`}
 alt={item.name} />
          <CountdownTimer startDate={item.start_date} endDate={item.end_date} />

          {/* <div className="counter">
            <span className="hour">{item.timeLeft.hours}h</span>
            <span className="minutes">{item.timeLeft.minutes}m</span>
            <span className="seconds">{item.timeLeft.seconds}s</span>
          </div> */}
          <div className="favourite-icon">
            <i className="fa-solid fa-heart"></i>
          </div>
        </div>
        <div className="mkt-body">
          <div className="mkt-pro-head">
            <h3>{item.name}</h3>
          </div>
          <div className="mkt-detail">
            <div className="mkt-crt-bid">
              <span className="crnt-bid">Current Bid</span>
              <div className="mkt-bid-price">
                <i className="fa-solid fa-dollar-sign"></i>
                <span className="price">{item.currentBid}</span>
                USD
              </div>
            </div>
            <div className="mkt-bid-btn">
              <Link href={`/product/${item.id}`}>
                Place Bid
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoriteItem;
