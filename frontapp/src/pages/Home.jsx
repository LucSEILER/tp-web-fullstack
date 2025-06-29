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

  useEffect(() => {
    const fetchVideogames = async () => {
      try {
        const response = await api.get("/videogame/games");
        const { data, message } = response.data;

        setVideogames(data.results);
        setMessage(message);
      } catch (error) {
        console.error("Error fetching videogames:", error);
        setMessage("Une erreur est survenue.");
      } finally {
        setIsVideoLoading(false);
      }
    };

    fetchVideogames();
  }, []);

  useEffect(() => {
    const fetchUserWishlist = async () => {
      try {
        const response = await api.get("/videogame/games/wichlist/my", {
          withCredentials: true,
        });
        const { data, message } = response.data;
        const ids = data.map((vg) => vg.game_id);

        setUserWishlist(ids);
        setMessage(message);
      } catch (error) {
        console.error("Error fetching videogames:", error);
        setMessage("Une erreur est survenue.");
      } finally {
        setIsUserLoading(false);
      }
    };

    fetchUserWishlist();
  }, []);

  videogames.map((vg) => {
    for (let i = 0; i < userWishlist.length; i++) {
      if (vg.appid === userWishlist[i]) {
        vg.isAdded = true;
      }
    }
  });

  return (
    <div>
      <h1>Home</h1>
      <h1 className="text-center text-xl font-bold mb-4">
        Recherche de jeux Steam
      </h1>
      <SteamSearchBar />
      {isVideoLoading || isUserLoading ? (
        <p>Loading...</p>
      ) : (
        <VideogameList gameList={videogames} userWishlist={userWishlist} />
      )}
    </div>
  );
};

export default Home;
