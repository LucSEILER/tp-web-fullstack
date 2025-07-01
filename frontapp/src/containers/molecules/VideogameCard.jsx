import Button from "../atoms/Button";
import axios from "axios";
import { useState } from "react";
import { toaster } from "../../components/ui/toaster";
import { Link } from "react-router-dom";

const VideogameCard = ({ game, isAdded, mode = "home", ...props }) => {
  const [added, setAdded] = useState(isAdded);

  const gameId = game.appid || game.game_id;

  const handleAddToWishlist = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/videogame/wishlist",
        { gameId, name: game.name },
        { withCredentials: true }
      );
      setAdded(true);
      toaster.create({
        type: "success",
        description: response.data.message,
      });
    } catch (error) {
      console.error("Error adding videogame to wishlist:", error);
    }
  };

  const handleRemoveFromWishlist = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/videogame/wishlist/${gameId}`,
        { withCredentials: true }
      );
      setAdded(false);
      toaster.create({
        type: "success",
        description: response.data.message,
      });
    } catch (error) {
      console.error("Error removing videogame from wishlist:", error);
    }
  };

  const renderButton = () => {
    if (mode === "wishlist") {
      return (
        <Button
          onClick={handleRemoveFromWishlist}
          className="mt-auto"
          label="Remove from wishlist"
          backgroundColor="buttonPrimary"
          {...props}
        />
      );
    }

    return added ? (
      <Button
        onClick={handleRemoveFromWishlist}
        className="mt-auto"
        label="Remove from wishlist"
        backgroundColor="buttonPrimary"
        {...props}
      />
    ) : (
      <Button
        onClick={handleAddToWishlist}
        className="mt-auto"
        label="+ Add to wishlist"
        backgroundColor="buttonPrimary"
        {...props}
      />
    );
  };

  return (
    <div className="flex flex-col">
      <Link to={`/games/${gameId}`}>
        <img src={game.image} alt={game.name} />
        <h2 className="font-bold">{game.name}</h2>
        <p className="text-sm mb-4">{game.description}</p>
      </Link>
      {renderButton()}
    </div>
  );
};

export default VideogameCard;
