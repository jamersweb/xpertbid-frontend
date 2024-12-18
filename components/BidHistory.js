const BidHistory = ({ bids }) => (
    <div className="bid-history-parent">
      <h2 className="description">Bid History</h2>
      {bids.map((bid, index) => (
        <div className="history-user parent" key={index}>
          <div className="history-user-profile">
            <img
              src={bid.userImage}
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
      ))}
    </div>
  );
  export default BidHistory;