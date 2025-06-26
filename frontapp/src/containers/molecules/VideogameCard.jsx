import Button from "../atoms/Button";

const VideogameCard = ({ game, ...props }) => {
  return (
    <div className="flex flex-col">
      <div>
        <img src={game.image} alt={game.name} />
        <h2 className="font-bold">{game.name}</h2>
        <p>{game.description}</p>
      </div>
      <Button className="mt-auto" label="+ Wishlist" backgroundColor="buttonPrimary" {...props} />
    </div>
  );
};

export default VideogameCard;
