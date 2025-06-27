import Button from "../atoms/Button";
import axios from "axios";
import { useState } from "react";

const VideogameCard = ({ game, isAdded, ...props }) => {
  const [added, setAdded] = useState(false);

  const handleAddToWishlist = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/videogame/games/wichlist",
        { gameId: game.appid, name: game.name },
        { withCredentials: true }
      );
      console.log("Videogame added to wishlist:", response.data);
      // setAdded(true);
      isAdded = true;
    } catch (error) {
      console.error("Error adding videogame to wishlist:", error);
    }
  };

  return (
    <div className="flex flex-col">
      <div>
        <img src={game.image} alt={game.name} />
        <h2 className="font-bold">{game.name}</h2>
        <p>{game.description}</p>
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
