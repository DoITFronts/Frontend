import categoryMap from '@/types/categoryMap';
import { cityMap } from '@/types/regions';

const fetchReviews = async ({
  category,
  city,
  town,
  targetAt,
  page,
  size,
}: {
  category: string;
  city: string;
  town: string;
  targetAt: Date | null;
  page?: number;
  size?: number;
}) => {
  const queryParams = new URLSearchParams();

  if (category && category !== '전체') {
    queryParams.append('category', categoryMap[category] ?? category);
  }

  if (city && city !== '지역 전체') {
    queryParams.append('city', cityMap[city] ?? city);
  }

  if (town && town !== '동 전체') {
    queryParams.append('town', cityMap[town] ?? town);
  }

  if (targetAt) {
    const kstDate = new Date(targetAt.getTime() + 9 * 60 * 60 * 1000); // UTC + 9시간
    const dateString = kstDate.toISOString().split('T')[0]; // "2025-11-22"
    queryParams.append('targetAt', `${dateString}T00:00:00`);
  }

  if (page) {
    queryParams.append('page', page.toString());
  }

  try {
    // TODO: 실제 api 주소로 변경
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/lightenings?${queryParams.toString()}`,
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export default fetchReviews;
