import VideogameCard from "../../containers/molecules/VideogameCard";

const VideogameList = ({
  gameList,
  isLoading,
  userWishlist,
  mode = "home",
}) => {
  return (
    <>
      <h1>Video Game List</h1>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {gameList.map((vg) => (
            <VideogameCard
              key={vg.appid || vg.game_id}
              game={vg}
              isAdded={userWishlist.includes(vg.appid || vg.game_id)}
              mode={mode}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default VideogameList;
