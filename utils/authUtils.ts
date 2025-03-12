// isUserLoggedIn() (로컬 스토리지에서 로그인 여부 확인

const isUserLoggedIn = () => {
  const token = localStorage.getItem('accessToken');
  return !!token;
};

export default isUserLoggedIn;
