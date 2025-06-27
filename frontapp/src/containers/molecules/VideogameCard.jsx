import Button from "../atoms/Button";
import axios from "axios";
import { useState } from "react";
import { toaster } from "../../components/ui/toaster";

const VideogameCard = ({ game, isAdded, ...props }) => {
  const [userGames, setUserGames] = useState([]);
  const [message, setMessage] = useState("");

  const handleAddToWishlist = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/videogame/games/wichlist",
        { gameId: game.appid, name: game.name },
        { withCredentials: true }
      );

      const { message } = response.data;
      setUserGames((prev) => [...prev, game.appid]);
      setMessage(message);

      toaster.create({
        type: "success",
        description: message,
      });
    } catch (error) {
      console.error("Error adding videogame to wishlist:", error);
    }
  };

  return (
    <div className="flex flex-col">
      <div>
        <img src={game.image} alt={game.name} />
        <h2 className="font-bold">{game.name}</h2>
        <p className="text-sm mb-4">{game.description}</p>
      </div>
      <Button
        onClick={handleAddToWishlist}
        className="mt-auto"
        label={isAdded ? "✔ Added" : "Add to wishlist"}
        backgroundColor="buttonPrimary"
        disabled={isAdded}
        {...props}
      />
    </div>
  );
};

export default VideogameCard;
