interface ReviewHeartSelectableProps {
  count: number;
  onSelect: (count: number) => void;
}

export default function ReviewHeartSelectable({ count, onSelect }: ReviewHeartSelectableProps) {
  const handleClick = (selectedCount: number) => {
    onSelect(selectedCount);
  };

  return (
    <div className="flex cursor-pointer gap-1">
      {[1, 2, 3, 4, 5].map((value) => (
        <svg
          key={value}
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => handleClick(value)}
          className="transition-transform duration-200 active:scale-90"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.05238 5.59961H9.83133H12.6103V8.39961H15.3892V5.59961H18.1682H20.9471V8.39961H23.7261V11.1996V13.9996H20.9471V16.7996H18.1682V19.5996H15.3892V22.3996H12.6103V19.5996H9.83133V16.7996H7.05238V13.9996H4.27344V11.1996V8.39961H7.05238V5.59961Z"
            fill={count >= value ? '#FFD500' : '#F0F0F0'}
          />
        </svg>
      ))}
    </div>
  );
}
