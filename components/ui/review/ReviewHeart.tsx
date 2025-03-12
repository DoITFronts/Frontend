interface ReviewHeartProps {
  fillPercentage?: number;
}

export default function ReviewHeart({ fillPercentage = 100 }: ReviewHeartProps) {
  return (
    <div style={{ position: 'relative', width: '28px', height: '28px' }}>
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.05238 5.59961H9.83133H12.6103V8.39961H15.3892V5.59961H18.1682H20.9471V8.39961H23.7261V11.1996V13.9996H20.9471V16.7996H18.1682V19.5996H15.3892V22.3996H12.6103V19.5996H9.83133V16.7996H7.05238V13.9996H4.27344V11.1996V8.39961H7.05238V5.59961Z"
          fill="#F0F0F0"
        />
      </svg>
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          clipPath: `inset(0 ${100 - fillPercentage}% 0 0)`,
        }}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.05238 5.59961H9.83133H12.6103V8.39961H15.3892V5.59961H18.1682H20.9471V8.39961H23.7261V11.1996V13.9996H20.9471V16.7996H18.1682V19.5996H15.3892V22.3996H12.6103V19.5996H9.83133V16.7996H7.05238V13.9996H4.27344V11.1996V8.39961H7.05238V5.59961Z"
          fill="#FFD500"
        />
      </svg>
    </div>
  );
}
