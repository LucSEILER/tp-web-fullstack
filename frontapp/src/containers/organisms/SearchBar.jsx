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
      const { data, message } = response.data;
      console.log(response);
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

      {loading && <p className="mt-2 text-gray-500">Recherche en cours...</p>}

      {!loading && games.length > 0 && (
        <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {games.map((game) => (
            <li
              key={game.appid}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow duration-300"
            >
              <Link
                to={`/games/${game.appid}`}
                // href={`https://store.steampowered.com/app/${game.appid}`}
                // target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col h-full"
              >
                <img
                  src={game.logo}
                  alt={game.name}
                  className="w-full h-32 object-cover"
                />
                <div className="p-4 flex-1 flex items-center justify-center text-center">
                  <h3 className="text-gray-800 dark:text-gray-100 font-semibold text-lg">
                    {game.name}
                  </h3>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {!loading && query && games.length === 0 && (
        <p className="mt-2 text-gray-500">Aucun jeu trouvé.</p>
      )}
    </div>
  );
};

export default SteamSearchBar;
