const ProductDetails = ({ product }) => (
    <div className="col-md-7">
      <div className="product-details-brief-parent">
        <h2 className="product-heading">{product.name}</h2>
        <div className="owned-by-and-favoruite">
          <div className="owned">
            <img
              className="customer-profile"
              src={product.ownerImage}
              alt={product.ownerName}
            />
            <div className="customer-name">
              <span className="owner">Owned By</span>
              <p className="name">{product.ownerName}</p>
            </div>
          </div>
          <div className="favourite">
            <button className="fav-btn">
              <i className="fa-regular fa-heart"></i>
            </button>
          </div>
        </div>
        <div className="bid-rank-and-time">
          <div className="bid-price-and-rank">
            <span className="rank">Highest Bid</span>
            <div className="price">
              <i className="fa-solid fa-dollar-sign"></i>
              <span className="price-no">{product.highestBid}</span>USD
            </div>
          </div>
          <div className="bid-time-and-date">
            <span className="endin">End in</span>
            <p className="date">{product.endDate}</p>
          </div>
        </div>
        <div className="currency-and-price">
          <p className="currency-price">{product.currentPrice}</p>
          <p className="currency">USD</p>
        </div>
        <div className="bid-place-button">
          <button className="place-bid">Place Bid</button>
        </div>
        <div className="min-bid-and-estimate">
          <div className="minimum-bid">
            Minimum bid: <span className="bid-no">{product.minimumBid}</span> USD.
          </div>
          <div className="estimate-bid">
            Estimate: <span className="bid-esti-no1">{product.reserve_price}</span> -
            <span className="bid-esti-no2">{product.reserve_price}</span> EUR.
          </div>
        </div>
      </div>
    </div>
  );  
export default ProductDetails;