// components/TopBid.js

export default function TopBid() {
    // Mock data for table rows
    const bids = Array(3).fill({
      name: "Lisa Larson",
      description: "Sculpture, Gustavsberg, stoneware, globular on loose plinth, polychrome glazed decoration against gold background.",
      highestBid: 175,
      endIn: "4 Days"
    });
  
    return (
      <section className="topbid">
        <div className="container-fluid">
          <div className="main-heading"><h2>Top Bids</h2></div>
          <div className="table-parent">
            <table id="topbid" className="table table-striped" style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th>Bid Name</th>
                  <th>Highest Bid</th>
                  <th>End Bid</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {bids.map((bid, index) => (
                  <tr key={index}>
                    <td className="bid-card-parent">
                      <div className="bid-card">
                        <div className="bid-parent-table">
                          <div className="bid-image">
                            <img src="/assets/images/hero-prodcut1.jpg" alt="" />
                          </div>
                          <div className="bid-info">
                            <h2>{bid.name}</h2>
                            <p>{bid.description}</p>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="highest-bid-rank">
                      <p className="bid-rank">highest Bid</p>
                      <div className="bid-price">
                        <i className="fa-solid fa-dollar-sign"></i><span>{bid.highestBid}</span> USD
                      </div>
                    </td>
                    <td className="bid-end-time">
                      <p className="bid-end">End In</p>
                      <div className="bid-date">{bid.endIn}</div>
                    </td>
                    <td className="bid-btn-parent">
                      <div className="bid-place-btn">
                        <a href="/product-details.html">Place Bid</a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    );
  }
  