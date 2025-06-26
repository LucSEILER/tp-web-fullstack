// import { useState, useEffect } from "react";
// import api from "../helpers/request";

// const VideogameList = () => {
//     const [videogames, setVideogames] = useState([]);

//     useEffect(() => {
//         const fetchVideogames = async () => {
//             try {
//                 const response = await api.get("/videogame/games");
//                 const data = response.data;
//                 console.log(data);
//                 setVideogames(data);
//             } catch (error) {
//                 console.error("Error fetching videogames:", error);
//             }
//         };

//         fetchVideogames();
//     }, []);

//     return (
//         <>
//             <h1>Video Game List</h1>
//             <pre>
//                 <code>{JSON.stringify(videogames.data.results, null, 2)}</code>
//             </pre>
//             <p>{videogames.message}</p>
//             <ul>
//                 {videogames?.data?.results?.map((vg) => (
//                     // <li key={vg.id}>{vg.name}</li>
//                     <li>{vg.name}</li>
//                 ))}
//             </ul>
//         </>
//     );
// };

// export default VideogameList;
import { useState, useEffect } from "react";
import api from "../helpers/request";

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
        <p>Chargement...</p>
      ) : (
        <>
          <p>{message}</p>
          {/* 
                    <pre>
                        <code>{JSON.stringify(videogames, null, 2)}</code>
                    </pre> */}

          <ul>
            {videogames.map((vg) => (
              <li key={vg.appid}>{vg.name}</li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default VideogameList;
