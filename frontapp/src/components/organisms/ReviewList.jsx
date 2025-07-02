const ReviewList = ({ reviews = [] }) => {
  if (!reviews.length) {
    return (
      <p className="text-gray-500">
        No reviews yet. Be the first to leave one!
      </p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-4 mb-10">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="border border-gray-200 rounded-lg p-4 shadow-sm"
        >
          <div className="flex justify-between items-center mb-1">
            <p className="font-semibold">{review.username}</p>
            <span className="text-yellow-500 font-medium">
              {review.rating}/20
            </span>
          </div>
          <p className="text-left textPrimary">{review.review}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
