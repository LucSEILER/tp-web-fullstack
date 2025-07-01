import VideogameList from "../components/organisms/VideogameList";
import { useEffect, useState } from "react";
import api from "../helpers/request";
import SteamSearchBar from "../containers/organisms/SearchBar";

const Home = () => {
  const [videogames, setVideogames] = useState([]);
  const [message, setMessage] = useState("");
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [userWishlist, setUserWishlist] = useState([]);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const fetchVideogames = async (pageToFetch = 1) => {
    try {
      const response = await api.get(`/videogame/games?page=${pageToFetch}`);
      const { data, message } = response.data;

      if (pageToFetch === 1) {
        setVideogames(data.results);
      } else {
        setVideogames((prev) => [...prev, ...data.results]);
      }

      setMessage(message);

      if (!data.next) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching videogames:", error);
      setMessage("Une erreur est survenue.");
    } finally {
      setIsVideoLoading(false);
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchVideogames();
  }, []);

  useEffect(() => {
    const fetchUserWishlist = async () => {
      try {
        const response = await api.get("/videogame/games/wichlist/my", {
          withCredentials: true,
        });
        const { data, message } = response.data;
        const ids = data.map((vg) => vg.appid);

        setUserWishlist(ids);
        setMessage(message);
      } catch (error) {
        console.error("Error fetching user wishlist:", error);
        setMessage("Une erreur est survenue.");
      } finally {
        setIsUserLoading(false);
      }
    };

    fetchUserWishlist();
  }, []);

  videogames.forEach((vg) => {
    vg.isAdded = userWishlist.includes(vg.appid);
  });

  const loadMoreGames = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    setIsLoadingMore(true);
    fetchVideogames(nextPage);
  };

  return (
    <div>
      <h1 className="text-center text-xl font-bold mb-4">
        Search for a Steam game...
      </h1>
      <SteamSearchBar />

      {isVideoLoading || isUserLoading ? (
        <p className="text-center text-gray-500 mt-4">Loading...</p>
      ) : (
        <>
          <VideogameList gameList={videogames} userWishlist={userWishlist} />

          {hasMore && (
            <div className="flex justify-center mt-6">
              <button
                onClick={loadMoreGames}
                disabled={isLoadingMore}
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition disabled:opacity-50"
              >
                {isLoadingMore ? "Loading..." : "Load more"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
