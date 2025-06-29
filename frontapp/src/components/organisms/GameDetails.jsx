const GameDetails = ({ game }) => {
  return (
    <div className="max-w-5xl mx-auto p-4 text-gray-800">
      <h1 className="text-4xl font-bold mb-2">{game.name}</h1>
      <img
        src={game.header_image}
        alt={game.name}
        className="w-full rounded-lg mb-6"
      />

      <p className="text-lg mb-4">{game.short_description}</p>

      <div className="flex gap-2 text-sm text-white">
        {game.platforms.windows && (
          <span className="bg-blue-600 px-2 py-1 rounded">Windows</span>
        )}
        {game.platforms.mac && (
          <span className="bg-gray-600 px-2 py-1 rounded">Mac</span>
        )}
        {game.platforms.linux && (
          <span className="bg-green-600 px-2 py-1 rounded">Linux</span>
        )}
      </div>

      {game.genres && (
        <div className="mt-4">
          <strong className="text-lg">Genres:</strong>
          <ul className="list-disc ml-6">
            {game.genres.map((genre) => (
              <li key={genre.id}>{genre.description}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-4">
        <strong className="text-lg">Supported Languages:</strong>
        <div
          className="mt-1 text-sm text-gray-700"
          dangerouslySetInnerHTML={{ __html: game.supported_languages }}
        />
      </div>

      {game.developers && game.developers.length > 0 && (
        <div className="mt-4">
          <strong className="text-lg">Developers:</strong>
          <ul className="list-disc ml-6">
            {game.developers.map((developer) => (
              <li key={developer.id}>{developer.name}</li>
            ))}
          </ul>
        </div>
      )}

      {game.publishers && game.publishers.length > 0 && (
        <div className="mt-4">
          <strong className="text-lg">Publishers:</strong>{" "}
          {game.publishers.join(", ")}
        </div>
      )}

      <div className="mt-4">
        <strong className="text-lg">Price:</strong>{" "}
        {game.price_overview ? game.price_overview.final_formatted : "N/A"}{" "}
        {game.price_overview?.discount_percent > 0 && (
          <span className="line-through ml-2 text-gray-500">
            {game.price_overview.initial_formatted}
          </span>
        )}
      </div>

      {game.metacritic && (
        <div className="mt-4">
          <strong className="text-lg">Metacritic:</strong>{" "}
          <a
            href={game.metacritic.url}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline"
          >
            {game.metacritic.score}/100
          </a>
        </div>
      )}

      <div className="mt-6">
        <strong className="text-lg">PC Requirements:</strong>
        <div
          dangerouslySetInnerHTML={{ __html: game.pc_requirements.minimum }}
          className="text-sm mt-1"
        />
      </div>

      <div className="mt-4">
        <strong className="text-lg">Mac Requirements:</strong>
        <p className="text-sm mt-1">{game.mac_requirements.minimum}</p>
      </div>

      <div className="mt-4">
        <strong className="text-lg">Linux Requirements:</strong>
        <p className="text-sm mt-1">{game.linux_requirements.minimum}</p>
      </div>

      {game.screenshots && game.screenshots.length > 0 && (
        <div className="mt-6">
          <strong className="text-lg">Screenshots:</strong>
          <div className="flex overflow-x-auto gap-2 mt-2">
            {game.screenshots.map((screenshot) => (
              <img
                key={screenshot.id}
                src={screenshot.path_thumbnail}
                alt={`Screenshot ${screenshot.id}`}
                className="w-48 h-auto rounded shadow"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GameDetails;
