import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toaster } from "../components/ui/toaster";
import GameDetails from "../components/organisms/GameDetails";

const GameDetailsPage = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/videogame/games/details/${id}`,
          { withCredentials: true }
        );
        const { data, message } = response.data;
        console.log(response);

        setMessage(message);
        setGame(data.data);

        toaster.create({
          type: "info",
          description: message,
          duration: 3000,
        });
      } catch (err) {
        console.error("Failed to fetch game", err);
      }
    };

    fetchGame();
  }, [id]);

  if (!game) return <p>Loading...</p>;

  return (
    <GameDetails game={game} />
  );
};

export default GameDetailsPage;
