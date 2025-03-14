interface IconButtonProps {
  status: 'default' | 'hover' | 'editing';
}

function EditingIcon({ status }: IconButtonProps) {
  const getIcon = () => {
    switch (status) {
      case 'default':
        return (
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="16" cy="16" r="15.1" fill="#FCFCFC" stroke="#F0F0F0" strokeWidth="1.8" />
            <path
              d="M16.0208 9.22574C16.2067 8.82492 16.6817 8.65204 17.0818 8.83958L20.525 10.4538C20.9251 10.6414 21.0987 11.1183 20.9128 11.5191L16.1461 21.7962C16.0555 21.9913 15.8904 22.1415 15.6878 22.2128L13.1831 23.094C12.7735 23.2381 12.3233 23.027 12.1698 22.6189L11.2312 20.1235C11.1554 19.9217 11.1636 19.698 11.2541 19.5028L16.0208 9.22574Z"
              fill="#D9D9D9"
            />
            <path d="M12.668 9.56641L22.2034 14.0401" stroke="#FCFCFC" />
          </svg>
        );
      case 'hover':
        return (
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="16" cy="16" r="15.1" fill="#FFF5C2" stroke="#FFD500" strokeWidth="1.8" />
            <path
              d="M16.0208 9.22574C16.2067 8.82492 16.6817 8.65204 17.0818 8.83958L20.525 10.4538C20.9251 10.6414 21.0987 11.1183 20.9128 11.5191L16.1461 21.7962C16.0555 21.9913 15.8904 22.1415 15.6878 22.2128L13.1831 23.094C12.7735 23.2381 12.3233 23.027 12.1698 22.6189L11.2312 20.1235C11.1554 19.9217 11.1636 19.698 11.2541 19.5028L16.0208 9.22574Z"
              fill="#FFD500"
            />
            <path d="M12.668 9.56641L22.2034 14.0401" stroke="#FFF5C2" />
          </svg>
        );
      case 'editing':
        return (
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="16" cy="16" r="16" fill="#FFD500" />
            <path
              d="M16.0208 9.22574C16.2067 8.82492 16.6817 8.65204 17.0818 8.83958L20.525 10.4538C20.9251 10.6414 21.0987 11.1183 20.9128 11.5191L16.1461 21.7962C16.0555 21.9913 15.8904 22.1415 15.6878 22.2128L13.1831 23.094C12.7735 23.2381 12.3233 23.027 12.1698 22.6189L11.2312 20.1235C11.1554 19.9217 11.1636 19.698 11.2541 19.5028L16.0208 9.22574Z"
              fill="white"
            />
            <path d="M12.668 9.56641L22.2034 14.0401" stroke="#FFD500" />
          </svg>
        );
      default:
        return null;
    }
  };

  return <div>{getIcon()}</div>;
}

export default EditingIcon;
