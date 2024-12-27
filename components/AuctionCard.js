import React from "react";

const AuctionCard = ({ auction }) => {
  return (
    <div className="col-lg-4 col-md-6 mkt-child">
      <div className="market-card">
        <div className="mkt-img">
          <img src={auction.image} alt={auction.title} />
          {auction.timer && (
            <div className="counter">
              <span className="hour">{auction.timer.hours}h</span>
              <span className="minutes">{auction.timer.minutes}m</span>
              <span className="seconds">{auction.timer.seconds}s</span>
            </div>
          )}
        </div>
        <div className="mkt-body">
          <div className="mkt-pro-head">
            <h3>{auction.title}</h3>
          </div>
          <div className="mkt-detail">
            <div className="mkt-crt-bid">
              <span className="crnt-bid">My Bid</span>
              <div className="mkt-Mybid-price">
                <i className="fa-solid fa-dollar-sign"></i>
                <span className="price">{auction.myBid}</span> USD
              </div>
            </div>
            {auction.currentBid && (
              <div className="mkt-crt-bid">
                <span className="crnt-bid">Current Bid</span>
                <div className="mkt-currentBid-price">
                  <i className="fa-solid fa-dollar-sign"></i>
                  <span className="price">{auction.currentBid}</span> USD
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionCard;