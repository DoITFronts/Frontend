import categoryMap from '@/types/categoryMap';
import orderMap from '@/types/orderMap';
import { cityMap } from '@/types/regions';

const buildQueryParams = ({
  category,
  city,
  town,
  targetAt,
  page,
  size,
  order,
}: {
  category: string;
  city: string;
  town: string;
  targetAt: Date | null;
  page?: number;
  size?: number;
  order?: string;
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
    const kstDate = new Date(targetAt.getTime() + 9 * 60 * 60 * 1000);
    queryParams.append('targetAt', `${kstDate.toISOString().split('T')[0]}T00:00:00`);
  }

  if (page) {
    queryParams.append('page', page.toString());
  }

  if (size) {
    queryParams.append('size', size.toString());
  }

  if (order) {
    queryParams.append('order', orderMap[order] ?? order);
  }

  return queryParams;
};

export default buildQueryParams;
