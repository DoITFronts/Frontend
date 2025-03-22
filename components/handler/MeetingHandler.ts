// 카테고리 핸들러
export const handleCategoryClick = (
  category: string,
  setSelectedCategory: (category: string) => void,
  updateSearchParams: (key: string, value: string) => void,
) => {
  setSelectedCategory(category);
  updateSearchParams("category", category === "전체" ? "" : category);
};

// 첫 번째 지역 핸들러
export const handleSelectFirstLocation = (
  selected: string,
  selectedSecondLocation: string,
  router: any,
  searchParams: URLSearchParams,
  defaultFirstOption: string,
  regions: Record<string, string[]>,
) => {
  const params = new URLSearchParams(searchParams.toString());

  if (selected === defaultFirstOption) {
    params.delete("location_1");
    params.delete("location_2");
  } else {
    params.set("location_1", selected);

    const validSecondLocations = regions[selected] || [];
    if (!validSecondLocations.includes(selectedSecondLocation)) {
      params.delete("location_2");
    }
  }

  router.push(`?${params.toString()}`, { scroll: false });
};

// 두 번째 지역 핸들러
export const handleSelectSecondLocation = (
  selected: string,
  setSelectedSecondLocation: (value: string) => void,
  updateSearchParams: (key: string, value: string) => void,
) => {
  setSelectedSecondLocation(selected);
  updateSearchParams("location_2", selected);
};

// 날짜 확정 핸들러
export const handleDateConfirm = (
  tempDate: Date | null,
  setSelectedDate: (date: Date | null) => void,
  updateSearchParams: (key: string, value: string) => void,
) => {
  setSelectedDate(tempDate);

  if (tempDate) {
    const fixedDate = new Date(tempDate);
    fixedDate.setHours(12, 0, 0, 0); // UTC 보정
    updateSearchParams(
      "targetAt",
      `${fixedDate.toISOString().split("T")[0]}T00:00:00`,
    );
  }
};

// 필터 핸들러
export const handleSelectFilter = (
  selected: string,
  setSelectedFilter: (value: string) => void,
  updateSearchParams: (key: string, value: string) => void,
) => {
  setSelectedFilter(selected);
  updateSearchParams("order", selected);
};

// 날짜 필터링 초기화 클릭 핸들러
export const handleResetDate = (
  setSelectedDate: (value: null) => void,
  setTempDate: (value: null) => void,
  updateSearchParams: (key: string, value: string) => void,
) => {
  setSelectedDate(null);
  setTempDate(null);
  updateSearchParams("targetAt", "");
};

// 마감 임박, 참여 인원 필터링 초기화 클릭 핸들러
export const handleResetFilter = (
  setSelectedFilter: (value: string) => void,
  updateSearchParams: (key: string, value: string) => void,
) => {
  setSelectedFilter("");
  updateSearchParams("order", "");
};
