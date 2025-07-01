import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import { Link } from "react-router-dom";

const SteamSearchBar = () => {
  const [query, setQuery] = useState("");
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchGames = async (search) => {
    if (!search) return setGames([]);

    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:4000/videogame/games/search",
        {
          params: { name: search },
        }
      );
      const { data } = response.data;

      setGames(data || []);
    } catch (error) {
      console.error("Erreur lors de la recherche Steam:", error);
      setGames([]);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useCallback(debounce(fetchGames, 500), []);

  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <input
        type="text"
        value={query}
        placeholder="Rechercher un jeu Steam..."
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 border rounded shadow"
      />

      {loading && <p className="mt-2 text-gray-500">Loading...</p>}

      {!loading && games.length > 0 && (
        <ul className="mt-4 flex flex-col gap-2">
          {games.map((game) => (
            <li
              key={game.appid}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow duration-300"
            >
              <Link
                to={`/games/${game.appid}`}
                className="flex"
              >
                <img
                  src={game.logo}
                  alt={game.name}
                  className="w-16 object-cover"
                />
                <div className="p-4 flex-1 flex items-center justify-center text-center">
                  <h4 className="text-gray-800 dark:text-gray-100 font-semibold text-lg">
                    {game.name}
                  </h4>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {!loading && query && games.length === 0 && (
        <p className="mt-2 text-gray-500">No results found.</p>
      )}
    </div>
  );
};

export default SteamSearchBar;
