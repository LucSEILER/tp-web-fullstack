import { useState } from "react";
import axios from "axios";
import { toaster } from "../ui/toaster";
import Button from "../../containers/atoms/Button";

const GameDetails = ({ game }) => {
  const [added, setAdded] = useState(false);
  const [message, setMessage] = useState("");

  const handleAddToWishlist = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/videogame/games/wichlist",
        { gameId: game.steam_appid, name: game.name },
        { withCredentials: true }
      );
      const { message } = response.data;
      
      setAdded(true);
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
    <div className="max-w-5xl text-left mx-auto p-4 textPrimary">
      <h1 className="text-4xl font-bold mb-2 text-center">{game.name}</h1>
      <Button
        onClick={handleAddToWishlist}
        className="mt-auto"
        label={added ? "✔ To your playlist" : "Add to wishlist"}
        backgroundColor="buttonPrimary"
        disabled={added}
      />
      <img
        src={game.header_image}
        alt={game.name}
        className="w-full rounded-lg mb-6"
      />

      <p className="text-lg mb-4">{game.short_description}</p>

      <div className="flex gap-2 text-sm text-white">
        {game.platforms.windows && (
          <span className="bg-blue-600 px-2 py-1 rounded">Windows</span>
        )}
        {game.platforms.mac && (
          <span className="bg-gray-600 px-2 py-1 rounded">Mac</span>
        )}
        {game.platforms.linux && (
          <span className="bg-green-600 px-2 py-1 rounded">Linux</span>
        )}
      </div>

      {game.genres && (
        <div className="mt-4">
          <strong className="text-lg">Genres:</strong>
          <ul className="">
            {game.genres.map((genre) => (
              <li key={genre.id}>{genre.description}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-4">
        <strong className="text-lg">Supported Languages:</strong>
        <div
          className="mt-1 text-sm text-gray-700"
          dangerouslySetInnerHTML={{ __html: game.supported_languages }}
        />
      </div>

      {game.developers && game.developers.length > 0 && (
        <div className="mt-4">
          <strong className="text-lg">Developers:</strong>{" "}
          {game.developers.join(", ")}
        </div>
      )}

      {game.publishers && game.publishers.length > 0 && (
        <div className="mt-4">
          <strong className="text-lg">Publishers:</strong>{" "}
          {game.publishers.join(", ")}
        </div>
      )}

      <div className="mt-4">
        <strong className="text-lg">Price:</strong>{" "}
        {game.price_overview ? game.price_overview.final_formatted : "N/A"}{" "}
        {game.price_overview?.discount_percent > 0 && (
          <span className="line-through ml-2 text-gray-500">
            {game.price_overview.initial_formatted}
          </span>
        )}
      </div>

      <div className="mt-6">
        <strong className="text-lg">PC Requirements:</strong>
        <div
          dangerouslySetInnerHTML={{ __html: game.pc_requirements.minimum }}
          className="text-sm mt-1"
        />
      </div>

      <div className="mt-4">
        <strong className="text-lg">Mac Requirements:</strong>
        <p className="text-sm mt-1">{game.mac_requirements.minimum}</p>
      </div>

      <div className="mt-4">
        <strong className="text-lg">Linux Requirements:</strong>
        <p className="text-sm mt-1">{game.linux_requirements.minimum}</p>
      </div>

      {game.screenshots?.length > 0 && (
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">Screenshots</h3>
          <div className="flex overflow-x-auto space-x-4 pb-2 scrollbar-thin scrollbar-thumb-gray-400">
            {game.screenshots.map((screenshot) => (
              <div
                key={screenshot.id}
                className="flex-shrink-0 transform transition duration-300 hover:scale-105"
              >
                <img
                  src={screenshot.path_thumbnail}
                  alt={`Screenshot ${screenshot.id}`}
                  className="w-56 h-auto rounded-lg shadow-lg border border-gray-200"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GameDetails;
