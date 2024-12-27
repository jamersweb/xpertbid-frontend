import axios from "axios";
//import { useSession } from "next-auth/react";

export default async function handler(req, res) {
    //const { data: session } = useSession();
  if (req.method === "POST") {
    try {
//alert(req.body);
      const { amount } = req.body;
      const {token} = req.body;
      // Validate input
      if (!amount || isNaN(amount)) {
        return res.status(400).json({ error: "Invalid amount" });
      }
      //console.log(session);
      // Forward the request to the Laravel backend
      const laravelResponse = await axios.post(
        "http://127.0.0.1:8000/api/paypal-payment",
        { amount },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //alert(laravelResponse);
      return res.status(200).json(laravelResponse.data);
    } catch (error) {
      console.error("Error in API:", error);
      return res.status(500).json({ error: error });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
