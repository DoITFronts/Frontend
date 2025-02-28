const fetchMeeting = async ({
  category,
  location1,
  location2,
  date,
  page,
  per_page,
}: {
  category: string;
  location1: string;
  location2: string;
  date: Date | null;
  page: number | null;
  per_page: number;
}) => {
  const queryParams = new URLSearchParams();

  if (category !== '전체') queryParams.append('category', category);
  if (location1 !== '지역 전체') queryParams.append('location.region_1depth_name', location1);
  if (location2 !== '동 전체') queryParams.append('location.region_2depth_name', location2);
  if (date) queryParams.append('date', date.toISOString().split('T')[0]);

  queryParams.append('_page', page ? page.toString() : '1');
  queryParams.append('_per_page', per_page.toString());

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_JSON_SEVER_URL}meetings?${queryParams.toString()}`,
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return await response.json(); // ✅ JSON 데이터를 반환
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export default fetchMeeting;
