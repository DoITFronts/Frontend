function Spinner() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="mb-4 size-10 animate-spin rounded-full border-4 border-yellow-300 border-t-yellow-500" />
      <p className="font-pretandard text-lg font-medium">번개 불러오는 중...</p>
    </div>
  );
}

export default Spinner;
