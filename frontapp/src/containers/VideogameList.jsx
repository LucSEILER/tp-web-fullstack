import { useState, useEffect } from "react";
import api from "../helpers/request";

const VideogameList = () => {
    const [videogames, setVideogames] = useState([]);

    useEffect(() => {
        const fetchVideogames = async () => {
            try {
                const response = await api.get("/videogame");
                const data = response.data;
                console.log(data);
                setVideogames(data);
            } catch (error) {
                console.error("Error fetching videogames:", error);
            }
        };

        fetchVideogames();
    }, []);

    return (
        <>
            <h1>Video Game List</h1>
            <ul>
                {videogames.map((vg) => (
                    <li key={vg.id}>{vg.name}</li>
                ))}
            </ul>
        </>
    );
};

export default VideogameList;
