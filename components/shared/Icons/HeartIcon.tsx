interface HeartIconProps {
  variant?: 'active' | 'inactive';
}

export default function HeartIcon({ variant = 'active' }: HeartIconProps) {
  if (variant === 'inactive') {
    return (
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.05238 5.59961H9.83133H12.6103V8.39961H15.3892V5.59961H18.1682H20.9471V8.39961H23.7261V11.1996V13.9996H20.9471V16.7996H18.1682V19.5996H15.3892V22.3996H12.6103V19.5996H9.83133V16.7996H7.05238V13.9996H4.27344V11.1996V8.39961H7.05238V5.59961Z"
          fill="#F0F0F0"
        />
      </svg>
    );
  }

  return (
    <svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.05238 6.1001H9.83133H12.6103V8.9001H15.3892V6.1001H18.1682H20.9471V8.9001H23.7261V11.7001V14.5001H20.9471V17.3001H18.1682V20.1001H15.3892V22.9001H12.6103V20.1001H9.83133V17.3001H7.05238V14.5001H4.27344V11.7001V8.9001H7.05238V6.1001Z"
        fill="#FFD500"
      />
    </svg>
  );
}
