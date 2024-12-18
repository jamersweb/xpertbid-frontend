const OtherItems = ({ items }) => (
    <section className="featured-product">
      <div className="container-fluid">
        <div className="product-detail">
          <h2>Other items of interest</h2>
        </div>
        <div className="swiper-featured-product">
          <div className="swiper-wrapper">
            {items.map((item, index) => (
              <div className="swiper-slide" key={index}>
                <div className="pro-image">
                  <img src={item.image} alt={item.name} />
                  <div className="counter">
                    <span className="hour">{item.timer.hours}h</span>
                    <span className="minutes">{item.timer.minutes}m</span>
                    <span className="seconds">{item.timer.seconds}s</span>
                  </div>
                </div>
                <div className="pro-title">
                  <h2>{item.name}</h2>
                </div>
                <div className="pro-meta">
                  <div className="pro-price">
                    <span>Current Bid</span>
                    <p className="price">
                      <i className="fa-solid fa-dollar-sign"></i>
                      {item.currentBid} USD
                    </p>
                  </div>
                  <div className="pro-buy-btn">
                    <div className="pro-bid-btn">
                      <a href="#">Place Bid</a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
  export default OtherItems;