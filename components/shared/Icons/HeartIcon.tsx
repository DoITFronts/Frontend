interface HeartIconProps {
  variant?: 'active' | 'inactive';
}

export default function HeartIcon({ variant = 'active' }: HeartIconProps) {
  if (variant === 'inactive') {
    return (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.5">
          <rect width="4" height="4" transform="translate(10 8)" fill="white" />
          <rect width="4" height="4" transform="translate(14 8)" fill="white" />
          <rect width="4" height="4" transform="translate(22 8)" fill="white" />
          <rect width="4" height="4" transform="translate(26 8)" fill="white" />
          <rect width="4" height="4" transform="translate(6 12)" fill="white" />
          <rect width="4" height="4" transform="translate(10 12)" fill="white" />
          <rect width="4" height="4" transform="translate(14 12)" fill="white" />
          <rect width="4" height="4" transform="translate(18 12)" fill="white" />
          <rect width="4" height="4" transform="translate(22 12)" fill="white" />
          <rect width="4" height="4" transform="translate(26 12)" fill="white" />
          <rect width="4" height="4" transform="translate(30 12)" fill="white" />
          <rect width="4" height="4" transform="translate(6 16)" fill="white" />
          <rect width="4" height="4" transform="translate(10 16)" fill="white" />
          <rect width="4" height="4" transform="translate(14 16)" fill="white" />
          <rect width="4" height="4" transform="translate(18 16)" fill="white" />
          <rect width="4" height="4" transform="translate(22 16)" fill="white" />
          <rect width="4" height="4" transform="translate(26 16)" fill="white" />
          <rect width="4" height="4" transform="translate(30 16)" fill="white" />
          <rect width="4" height="4" transform="translate(10 20)" fill="white" />
          <rect width="4" height="4" transform="translate(14 20)" fill="white" />
          <rect width="4" height="4" transform="translate(18 20)" fill="white" />
          <rect width="4" height="4" transform="translate(22 20)" fill="white" />
          <rect width="4" height="4" transform="translate(26 20)" fill="white" />
          <rect width="4" height="4" transform="translate(14 24)" fill="white" />
          <rect width="4" height="4" transform="translate(18 24)" fill="white" />
          <rect width="4" height="4" transform="translate(22 24)" fill="white" />
          <rect width="4" height="4" transform="translate(18 28)" fill="white" />
        </g>
      </svg>
    );
  }

  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="4" height="4" transform="translate(10 8)" fill="#FFD500" />
      <rect width="4" height="4" transform="translate(14 8)" fill="#FFD500" />
      <rect width="4" height="4" transform="translate(22 8)" fill="#FFD500" />
      <rect width="4" height="4" transform="translate(26 8)" fill="#FFD500" />
      <rect width="4" height="4" transform="translate(6 12)" fill="#FFD500" />
      <rect width="4" height="4" transform="translate(10 12)" fill="#FFD500" />
      <rect width="4" height="4" transform="translate(14 12)" fill="#FFD500" />
      <rect width="4" height="4" transform="translate(18 12)" fill="#FFD500" />
      <rect width="4" height="4" transform="translate(22 12)" fill="#FFD500" />
      <rect width="4" height="4" transform="translate(26 12)" fill="#FFD500" />
      <rect width="4" height="4" transform="translate(30 12)" fill="#FFD500" />
      <rect width="4" height="4" transform="translate(6 16)" fill="#FFD500" />
      <rect width="4" height="4" transform="translate(10 16)" fill="#FFD500" />
      <rect width="4" height="4" transform="translate(14 16)" fill="#FFD500" />
      <rect width="4" height="4" transform="translate(18 16)" fill="#FFD500" />
      <rect width="4" height="4" transform="translate(22 16)" fill="#FFD500" />
      <rect width="4" height="4" transform="translate(26 16)" fill="#FFD500" />
      <rect width="4" height="4" transform="translate(30 16)" fill="#FFD500" />
      <rect width="4" height="4" transform="translate(10 20)" fill="#FFD500" />
      <rect width="4" height="4" transform="translate(14 20)" fill="#FFD500" />
      <rect width="4" height="4" transform="translate(18 20)" fill="#FFD500" />
      <rect width="4" height="4" transform="translate(22 20)" fill="#FFD500" />
      <rect width="4" height="4" transform="translate(26 20)" fill="#FFD500" />
      <rect width="4" height="4" transform="translate(14 24)" fill="#FFD500" />
      <rect width="4" height="4" transform="translate(18 24)" fill="#FFD500" />
      <rect width="4" height="4" transform="translate(22 24)" fill="#FFD500" />
      <rect width="4" height="4" transform="translate(18 28)" fill="#FFD500" />
    </svg>
  );
}
