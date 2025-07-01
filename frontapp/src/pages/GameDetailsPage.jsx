import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toaster } from "../components/ui/toaster";
import GameDetails from "../components/organisms/GameDetails";
import { Input, Textarea } from "@chakra-ui/react";
import Button from "../containers/atoms/Button";
import ReviewList from "../components/organisms/ReviewList";

const GameDetailsPage = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [message, setMessage] = useState("");
  const [gameReviews, setGameReviews] = useState([]);
  const [rating, setRating] = useState(20);
  const [review, setReview] = useState("");

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/videogame/games/details/${id}`,
          { withCredentials: true }
        );
        const { data, message } = response.data;

        setMessage(message);
        setGame(data.data);
      } catch (err) {
        console.error("Failed to fetch game", err);
      }
    };

    fetchGame();
  }, [id]);

  useEffect(() => {
    fetchGameReviews();
  }, [id]);

  const fetchGameReviews = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/videogame/reviews/${id}`,
        { withCredentials: true }
      );
      const { data, message } = response.data;

      setMessage(message);
      setGameReviews(data);
    } catch (err) {
      console.error("Failed to fetch game", err);
    }
  };

  const handleAddReview = async () => {
    try {
      const response = await axios.post(
        `http://localhost:4000/videogame/reviews`,
        { rating, review, gameId: id, name: game.name },
        { withCredentials: true }
      );
      const { data, message } = response.data;

      setMessage(message);

      toaster.create({
        type: "success",
        description: message,
        duration: 3000,
      });

      fetchGameReviews();
    } catch (err) {
      console.error("Failed to fetch game", err);
      toaster.create({
        type: "error",
        description: 'Failed to add review',
        duration: 3000,
      });
    }
  };

  if (!game) return <p>Loading...</p>;

  return (
    <div>
      <GameDetails game={game} />

      <h2 className="text-2xl font-bold mt-10 mb-6">User Reviews</h2>

      <ReviewList reviews={gameReviews} />

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Add Your Review</h3>

        <div className="flex flex-col gap-4">
          <Input
            type="number"
            placeholder="Rating (0 to 20)"
            min={1}
            max={20}
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="border border-gray-300 rounded px-3 py-2"
          />

          <Textarea
            type="text"
            placeholder="Write your review..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          />

          <Button
            backgroundColor="buttonPrimary"
            onClick={handleAddReview}
            label="Add Review"
          />
        </div>
      </div>
    </div>
  );
};

export default GameDetailsPage;
