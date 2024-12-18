// components/MarketplaceSection.js

export default function MarketplaceSection() {
    const products = Array(6).fill({
      title: "GUNNAR ANDER",
      currentBid: 175,
      timeLeft: { hour: "08h", min: "09m", sec: "22s" }
    });
  
    return (
      <section className="marketplace">
        <div className="container-fluid">
          <div className="mkt-plc-hdig">
            <h2>Explore Marketplace</h2>
          </div>
          <div className="row makt-parent">
            {products.map((prod, i) => (
              <div className="col-lg-4 col-md-6 mkt-child" key={i}>
                <div className="market-card">
                  <div className="mkt-img">
                    <img src="/assets/images/hero-prodcut1.jpg" alt="" />
                    <div className="counter">
                      <span className="hour">{prod.timeLeft.hour}</span>
                      <span className="minutes">{prod.timeLeft.min}</span>
                      <span className="seconds">{prod.timeLeft.sec}</span>
                    </div>
                  </div>
                  <div className="mkt-body">
                    <div className="mkt-pro-head">
                      <h3>{prod.title}</h3>
                    </div>
                    <div className="mkt-detail">
                      <div className="mkt-crt-bid">
                        <span className="crnt-bid">Current Bid</span>
                        <div className="mkt-bid-price">
                          <i className="fa-solid fa-dollar-sign"></i>
                          <span className="price">{prod.currentBid}</span> USD
                        </div>
                      </div>
                      <div className="mkt-bid-btn">
                        <a href={`/product/${prod.title}`}>Place Bid</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  