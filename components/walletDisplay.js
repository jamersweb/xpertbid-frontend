import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
const WalletBalance = () => {
  const [balance, setBalance] = useState(0);
  const { data: session } = useSession();
 
  useEffect(() => {
    const fetchBalance = async () => {
      //console.log('ra',getCsrfToken());
      //console.log('get',getSession());
      //console.log('session',session.user.token);
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/wallet", {
          headers: { Authorization: `Bearer ${session.user.token}`,'Cache-Control': 'no-store' },
        });
        setBalance(response.data.balance);
      } catch (error) {
        console.error("Error fetching wallet balance", error);
      }
    };

    fetchBalance();
  
  }, [session]);
  
  return balance;
};

export default WalletBalance;
