import { useState, useEffect } from "react";
import api from "../../helpers/request";
import VideogameCard from "../../containers/molecules/VideogameCard";

const VideogameList = ({ gameList, isLoading, userWishlist}) => {
  const [videogames, setVideogames] = useState([]);
  const [message, setMessage] = useState("");
  // const [isLoading, setIsLoading] = useState(true);
  // const [userWishlist, setUserWishlist] = useState([]);

  // useEffect(() => {
  //   const fetchVideogames = async () => {
  //     try {
  //       const response = await api.get("/videogame/games");
  //       const { data, message } = response.data;

  //       setVideogames(data.results);
  //       setMessage(message);        
  //     } catch (error) {
  //       console.error("Error fetching videogames:", error);
  //       setMessage("Une erreur est survenue.");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchVideogames();
  // }, []);

  // useEffect(() => {
  //   const fetchUserWishlist = async () => {
  //     try {
  //       const response = await api.get("/videogame/games/wichlist/my", {
  //         withCredentials: true,
  //       });
  //       const { data, message } = response.data;
  //       const ids = data.map((vg) => vg.game_id);

  //       setUserWishlist(ids);
  //       setMessage(message);
  //     } catch (error) {
  //       console.error("Error fetching videogames:", error);
  //       setMessage("Une erreur est survenue.");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchUserWishlist();
  // }, []);


  // videogames.map((vg) => {
  //   for (let i = 0; i < userWishlist.length; i++) {
  //     if (vg.appid === userWishlist[i].appid) {
  //       vg.isAdded = true;
  //     }
  //   }
  // });

  return (
    <>
      <h1>Video Game List</h1>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
          <>
          <div className="grid grid-cols-3 gap-4">
            {gameList.map((vg) => (
              <VideogameCard
                key={vg.appid}
                game={vg}
                isAdded={userWishlist.includes(vg.appid)}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default VideogameList;
