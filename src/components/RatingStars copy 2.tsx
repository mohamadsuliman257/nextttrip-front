interface RatingStarsProps {
  rating: number; // مثال: 4.3
}

export function RatingStars({ rating }: RatingStarsProps) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1 text-yellow-500">
      {"★".repeat(fullStars)}
      {halfStar && "☆"}
      {"☆".repeat(emptyStars)}

      <span className="text-gray-600 text-sm ml-2">
        ({rating.toFixed(1)})
      </span>
    </div>
  );
}
