interface ProfileIconProps {
  theme: 'light' | 'dark';
  size?: number;
}

function ProfileIcon({ theme, size = 30 }: ProfileIconProps) {
  const backgroundColor = theme === 'dark' ? '#BFBFBF' : '#F0F0F0';
  const pathColor = theme === 'dark' ? '#F0F0F0' : '#BFBFBF';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="30" height="30" rx="15" fill={backgroundColor} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.34 5.89575H19.5326V7.1089H20.8243C20.7997 7.17318 20.7685 7.23559 20.7314 7.29625L16.5445 13.2254H20.4771V14.2552H21.4998C21.4739 14.4009 21.4114 14.5472 21.3044 14.6903L10.8904 24.1042V23.0978H10.1789L11.7587 16.2434H9.47256V15.2051H8.5C8.50855 15.1581 8.51966 15.109 8.53291 15.057L13.0481 7.1089H14.34V5.89575Z"
        fill={pathColor}
      />
    </svg>
  );
}

export default ProfileIcon;
