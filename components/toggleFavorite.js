import { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

const FavoriteIcon = ({ auctionId, isFavorite }) => {
  const [favorite, setFavorite] = useState(isFavorite);
  const { data: session } = useSession();
  const handleToggleFavorite = async () => {
    try {
      const response = await toggleFavorite(auctionId);
      setFavorite(!favorite); // Toggle favorite state
      //alert(response.message); // Show success message
    } catch (error) {
      //alert("An error occurred while updating favorites.");
    }
  };
  const toggleFavorite = async (auctionId) => {
    //console.log(auctionId)
    try {
      const response = await axios.post(
        "https://violet-meerkat-830212.hostingersite.com/public/api/favorites/add",
        { auction_id: auctionId, user_id: session.user.id },
        {
          headers: {
            Authorization: `Bearer ${session.user.token}`, // Assuming you store the token here
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error toggling favorite:", error);
      throw error;
    }
  };

  const checkFavorite = async (auctionId) => {
    //console.log(auctionId)
    try {
      const response = await axios.post(
        "https://violet-meerkat-830212.hostingersite.com/public/api/favorites/check",
        { auction_id: auctionId, user_id: session.user.id },
        {
          headers: {
            Authorization: `Bearer ${session.user.token}`, // Assuming you store the token here
          },
        }
      );
      console.log(response.data.success)
      if(response.data.success == true){
        setFavorite(favorite);
      }
      return response.data;
    } catch (error) {
      console.error("Error toggling favorite:", error);
      throw error;
    }
  };
  checkFavorite(auctionId);
  return (
    <button className="fav-btn" onClick={handleToggleFavorite} style={{ cursor: "pointer" }}>
      <i
        className={`fa-regular fa-heart ${favorite ? "text-danger" : "text-muted"}`}
      ></i>
    </button>
  );
};

export default FavoriteIcon;
