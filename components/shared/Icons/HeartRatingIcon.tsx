import Icon from '../Icon';

interface HeartRatingProps {
  score: number;
}

export default function HeartRating({ score }: HeartRatingProps) {
  const maxHearts = 5;

  return (
    <div className="flex">
      {Array.from({ length: maxHearts }, (_, i) => (
        <span key={i} className="text-2xl text-orange-600">
          {i < score ? (
            <Icon path="review/heart_full.svg" />
          ) : (
            <Icon path="review/heart_empty.svg" />
          )}
        </span>
      ))}
    </div>
  );
}
