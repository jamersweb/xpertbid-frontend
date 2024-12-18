// components/FeaturedProducts.js

export default function FeaturedProducts() {
    return (
      <section className="featured-product">
        <div className="container-fluid">
          <div className="featured-heading"><h2>Featured Listing</h2></div>
          <div className="swiper-featured-product">
            <div className="swiper-wrapper">
              {/* Repeat slides as needed */}
              {[...Array(5)].map((_, index) => (
                <div className="swiper-slide" key={index}>
                  <div className="pro-image">
                    <img src="/assets/images/hero-prodcut1.jpg" alt="" />
                    <div className="counter">
                      <span className="hour">08h</span>
                      <span className="minutes">09m</span>
                      <span className="seconds">22s</span>
                    </div>
                  </div>
                  <div className="pro-title">
                    <h2>Gunnar Ander</h2>
                  </div>
                  <div className="pro-meta">
                    <div className="pro-price">
                      <span>Current Bid</span>
                      <p className="price"><i className="fa-solid fa-dollar-sign"></i>175 USD</p>
                    </div>
                    <div className="pro-buy-btn">
                      <div className="pro-bid-btn">
                        <a href="/product-details.html">Place Bid</a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="swiper-arrows">
              <div className="swiper-button-prev"><i className="fa-solid fa-arrow-left"></i></div>
              <div className="swiper-button-next"><i className="fa-solid fa-arrow-right"></i></div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  