import VideogameCard from "../../containers/molecules/VideogameCard";

const VideogameList = ({ gameList, isLoading, userWishlist }) => {
  return (
    <>
      <h1>Video Game List</h1>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
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
