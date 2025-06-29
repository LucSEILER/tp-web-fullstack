import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toaster } from "../components/ui/toaster";
import GameDetails from "../components/organisms/GameDetails";
import { Input } from "@chakra-ui/react";
import Button from "../containers/atoms/Button";

const GameDetailsPage = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [message, setMessage] = useState("");
  const [gameReviews, setGameReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

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

  useEffect(() => {
    fetchGameReviews();
  }, [id]);

  // juste avant les useEffect
  const fetchGameReviews = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/videogame/games/reviews/${id}`,
        { withCredentials: true }
      );
      const { data, message } = response.data;

      setMessage(message);
      setGameReviews(data);

      toaster.create({
        type: "info",
        description: message,
        duration: 3000,
      });
    } catch (err) {
      console.error("Failed to fetch game", err);
    }
  };

  const handleAddReview = async () => {
    try {
      const response = await axios.post(
        `http://localhost:4000/videogame/games/review`,
        { rating, review, gameId: id, name: game.name },
        { withCredentials: true }
      );
      const { data, message } = response.data;
      console.log(response);

      setMessage(message);
      // setGameReviews(data);

      toaster.create({
        type: "success",
        description: message,
        duration: 3000,
      });

      fetchGameReviews();
    } catch (err) {
      console.error("Failed to fetch game", err);
    }
  };

  if (!game) return <p>Loading...</p>;

  return (
    <div>
      <GameDetails game={game} />

      <h2>Reviews</h2>

      {!gameReviews ? (
        <p>Loading...</p>
      ) : (
        <div>
          {gameReviews.map((review) => (
            <div key={review.id}>
              <p>{review.username}</p>
              <p>{review.review}</p>
            </div>
          ))}
        </div>
      )}

      <div>
        <p>add reviews</p>

        <Input
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <Input
          type="text"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
      </div>

      <Button
        backgroundColor="buttonPrimary"
        onClick={handleAddReview}
        label="Add Review"
      />
    </div>
  );
};

export default GameDetailsPage;
