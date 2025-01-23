import React from "react";
import Link from "next/link";
import CountdownTimer from "./countdown";
const AuctionCard = ({ auction }) => {
  return (
    <div className="col-sm-6 mkt-child">
              <div className="market-card">
                <div className="mkt-img">
                  <img
                    src={`https://violet-meerkat-830212.hostingersite.com/public/${auction.image}`}
                    alt={auction.name}
                  />
                  <CountdownTimer startDate={auction.start_date} endDate={auction.end_date} />
                </div>
                <div className="mkt-body">
                  <div className="mkt-pro-head">
                    <h3>{auction.title}</h3>
                  </div>
                  <div className="mkt-detail">
                    <div className="mkt-crt-bid">
                      {/* <span className="crnt-bid">Current Bid</span> */}
                      <div className="mkt-bid-price">
                        {/* <i className="fa-solid fa-dollar-sign"></i>
                        <span className="price">{auction.currentBid}</span> USD */}
                      </div>
                    </div>
                    <div className="mkt-bid-btn">
                      <Link href={`/product/${auction.id}`}>Place Bid</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  );
};

export default AuctionCard;