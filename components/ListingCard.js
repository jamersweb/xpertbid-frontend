import React from "react";

const ListingCard = ({ listing }) => {
  return (
    <div className="listing-card col-12">
      <div className="row">
        <div className="col-lg-7 listing-detail">
          <div className="row">
            <div className="col-md-3">
              <div className="listing-img">
                <img src={listing.image} alt={listing.title} />
              </div>
            </div>
            <div className="col-md-9">
              <h3 className="listing-product-title">{listing.title}</h3>
              <div className="listing-product-bid-time">
                <div className="row">
                  <div className="col-sm-6 bid-and-price">
                    <p className="listing-bid-label">Highest Bid</p>
                    <p className="listingPrice">
                      <i className="fa-solid fa-dollar-sign"></i>
                      <span className="listingPriceNumber">
                        {listing.highestBid}
                      </span>
                      USD
                    </p>
                  </div>
                  <div className="col-sm-6 bid-and-time">
                    <p className="listing-bid-end-label">End in</p>
                    <p className="listingTime">
                      <span className="listingDate">{listing.endDate}</span> at{" "}
                      <span className="lisitngTime">{listing.endTime}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-5 edit-promote">
          <span className="listingPromote">
            <img src="./assets/images/flash.svg" alt="Promote" /> Promote
          </span>
          <button className="button-style-1 editListing">Edit Listing</button>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
