interface CheckIconProps {
  size?: 'sm' | 'lg';
  variant?: 'default' | 'filled-yellow' | 'filled-dark';
}

export default function CheckIcon({ size = 'sm', variant = 'default' }: CheckIconProps) {
  const dimensions = size === 'sm' ? 16 : 20;

  if (variant === 'filled-yellow') {
    return (
      <svg
        width={dimensions}
        height={dimensions}
        viewBox="0 0 20 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="10" cy="10.8711" r="7.5" fill="#FFD500" />
        <path
          d="M7.08398 10.7245L9.17459 12.8151L12.7856 9.2041"
          stroke="white"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (variant === 'filled-dark') {
    return (
      <svg
        width={dimensions}
        height={dimensions}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="9" fill="#111827" />
        <path
          d="M8.5 11.8245L11.0087 14.3333L15.342 10"
          stroke="#F97316"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg
      width={dimensions}
      height={dimensions}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 7.24558L7.08767 10.3333L12.4209 5"
        stroke="#F97316"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
