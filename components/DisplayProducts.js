export default function DisplayProducts({ products }) {
    return (
        <div className="row makt-parent">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="col-sm-6 mkt-child" key={product.id}>
              <div className="market-card">
                <div className="mkt-img">
                  <img
                    src={`http://127.0.0.1:8000${product.image}`}
                    alt={product.name}
                  />
                  {/* <div className="counter">
                    <span className="hour">{product.timeRemaining.hours}h</span>
                    <span className="minutes">{product.timeRemaining.minutes}m</span>
                    <span className="seconds">{product.timeRemaining.seconds}s</span>
                  </div> */}
                </div>
                <div className="mkt-body">
                  <div className="mkt-pro-head">
                    <h3>{product.name}</h3>
                  </div>
                  <div className="mkt-detail">
                    <div className="mkt-crt-bid">
                      <span className="crnt-bid">Current Bid</span>
                      <div className="mkt-bid-price">
                        <i className="fa-solid fa-dollar-sign"></i>
                        <span className="price">{product.currentBid}</span> USD
                      </div>
                    </div>
                    <div className="mkt-bid-btn">
                      <a href={`/product/${product.id}`}>Place Bid</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
      
    );
  }
  