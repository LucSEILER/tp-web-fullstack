const VideogameCard = ({ game, ...props }) => {
  return (
    <div>
      <div>
        {/* <img src={game.background_image} alt={game.name} /> */}
        <h2>{game.name}</h2>
        {/* <p>{game.released}</p> */}
        {/* <p>{game.rating}</p> */}
      </div>
    </div>
  );
};

export default VideogameCard;
