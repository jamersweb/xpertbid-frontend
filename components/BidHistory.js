 export default function BidHistory ({ bids }) {
  return (
    <div className="bid-history-parent">
      <h2 className="description">Bid History</h2>
      
      {bids && bids.length > 0 ? (
         bids.map((bid) => (
          <div className="history-user parent" key={bid.id}>
            <div className="history-user-profile">
              <img
                src={`http://127.0.0.1:8000${bid.userImage}`}
                alt={bid.userName}
                className="user-profile-history"
              />
              <div className="username-and-date">
                <p className="history-user-name">{bid.userName}</p>
                <span className="date">{bid.date}</span>
              </div>
            </div>
            <div className="history-user-payAmount">
              <p className="history-no">{bid.amount}</p>
              <p className="history-currency">USD</p>
            </div>
          </div>
        ))
        ) : (
        <p>No Bid History</p>
      )}
    </div>
);
}
//  export default BidHistory;