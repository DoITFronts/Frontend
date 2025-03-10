import categoryMap from '@/types/categoryMap';
import cityMap from '@/types/cityMap';
import orderMap from '@/types/orderMap';

const fetchReview = async ({
  category = '술',
  city,
  town,
  targetAt,
  page,
  size,
  order,
}: {
  category?: string;
  city: string;
  town: string;
  targetAt: Date | null;
  page?: number;
  size?: number;
  order?: string;
}) => {
  const queryParams = new URLSearchParams();

  // category가 빈 문자열인 경우 기본값으로 설정
  const finalCategory = !category || category.trim() === '' ? '술' : category;

  queryParams.append('category', categoryMap[finalCategory] ?? finalCategory);

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

  if (order) {
    queryParams.append('order', orderMap[order] ?? order);
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/reviews/all?${queryParams.toString()}`,
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

export default fetchReview;
