import { useState, useEffect } from "react";
import api from "../../helpers/request";
import { Card, Text, Button, Image } from "@chakra-ui/react";
import VideogameCard from "../../containers/molecules/VideogameCard";

const VideogameList = () => {
  const [videogames, setVideogames] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
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
        setIsLoading(false);
      }
    };

    fetchVideogames();
  }, []);

  useEffect(() => {
    const fetchUserWishlist = async () => {
      try {
        const response = await api.get("/videogame/games/wichlist/my", { withCredentials: true });
        
        console.log(response.data.data)

        const { data, message } = response.data;

        console.log(data)

        const ids = data.map((vg) => vg.game_id);
        setUserWishlist(ids);
        setMessage(message);
        // console.log('userWishlist', userWishlist)
      } catch (error) {
        console.error("Error fetching videogames:", error);
        setMessage("Une erreur est survenue.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserWishlist();
  }, []);

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

      {/* <pre>{JSON.stringify(userWishlist, null, 2)}</pre> */}

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* <p>{message}</p> */}

          {/* <div>
              {videogames.map((vg) => (
                <VideogameCard key={vg.appid} {...vg} />
              ))}
            </div> */}

          <div className="grid grid-cols-3 gap-4">
              {videogames.map((vg) => (
                // <p>{vg.name}</p>
                <VideogameCard
                key={vg.appid}
                game={vg}
                isAdded={userWishlist.includes(vg.appid)}
              />
            ))}
          </div>

          {/* <div>
            {videogames.map((vg) => (
              <div key={vg.appid}>{vg.name}</div>
            ))}
          </div> */}
        </>
      )}
    </>
  );
};

export default VideogameList;
