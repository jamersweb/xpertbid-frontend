import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const { data: session } = useSession();
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }).format(date);
  }; 
  useEffect(() => {
    //console.log(session);
    const fetchTransactions = async () => {
      try {
        
        const response = await axios.get(
          "https://violet-meerkat-830212.hostingersite.com/public/api/wallet/transactions",
          {
            headers: {
              Authorization: `Bearer ${session.user.token}`,
            },
          }
        );
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions", error);
      }
    };

    fetchTransactions();
  }, [session]);

  return (
    
    <div>
      <table id="wallet" className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Transaction id</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.transaction_id}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.type}</td>
              <td>{transaction.status}</td>
              <td>{formatDate(transaction.created_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
  );
};

export default TransactionHistory;
