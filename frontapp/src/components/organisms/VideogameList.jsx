import { useState, useEffect } from "react";
import api from "../../helpers/request";
import { Card, Text, Button, Image } from "@chakra-ui/react";
import VideogameCard from "../../containers/molecules/VideogameCard";

const VideogameList = () => {
  const [videogames, setVideogames] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <>
      <h1>Video Game List</h1>

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
              <VideogameCard key={vg.appid} game={vg} />
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
