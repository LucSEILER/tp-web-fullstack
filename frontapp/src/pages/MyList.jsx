import { useEffect, useState } from "react";
import api from "../helpers/request";
import VideogameList from "../components/organisms/VideogameList";

const MyList = () => {
  const [wishlistGames, setWishlistGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await api.get("/videogame/wishlist/my", {
          withCredentials: true,
        });
        const { data, message } = response.data;

        setWishlistGames(data);
        setMessage(message);
      } catch (error) {
        console.error("Erreur lors du chargement de la wishlist :", error);
        setMessage("Une erreur est survenue lors du chargement.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-center text-2xl font-bold mb-4">
        My playlist
      </h1>

      {isLoading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : wishlistGames.length === 0 ? (
        <p className="text-center text-gray-500">Your playlist is empty.</p>
      ) : (
        <VideogameList
          gameList={wishlistGames}
          userWishlist={wishlistGames.map((vg) => vg.game_id)}
        />
      )}
    </div>
  );
};

export default MyList;
