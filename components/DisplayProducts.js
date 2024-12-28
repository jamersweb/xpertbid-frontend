import Link from "next/link";
import CountdownTimer from "./countdown";

export default function DisplayProducts({ products }) {
    return (
        <div className="row makt-parent">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="col-sm-6 mkt-child" key={product.id}>
              <div className="market-card">
                <div className="mkt-img">
                  <img
                    src={`https://violet-meerkat-830212.hostingersite.com/public/${product.image}`}
                    alt={product.name}
                  />
                  <CountdownTimer startDate={product.start_date} endDate={product.end_date} />
                </div>
                <div className="mkt-body">
                  <div className="mkt-pro-head">
                    <h3>{product.title}</h3>
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
                      <Link href={`/product/${product.id}`}>Place Bid</Link>
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
  