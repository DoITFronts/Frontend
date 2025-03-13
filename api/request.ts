import { getAuthHeaders } from '@/utils/auth/loginUtils';
import buildQueryParams from '@/utils/queryParams';

const fetchData = async (endpoint: string, params: any) => {
  try {
    const queryParams = buildQueryParams(params);
    const headers = getAuthHeaders();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}?${queryParams.toString()}`,
      {
        method: 'GET',
        headers,
        credentials: 'include',
      },
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    return null;
  }
};

export default fetchData;
