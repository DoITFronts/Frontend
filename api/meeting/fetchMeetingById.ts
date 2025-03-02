const fetchMeetingById = async (id: string) => {
  if (!id) {
    throw new Error('Invalid event ID');
  }

  const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const apiUrl = `${baseURL}/api/meeting/detail/${id}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const jsonData = await response.json();
    // console.log('Fetched Data:', jsonData);
    // console.log(' jsonData[0]?.result:', jsonData[0]?.result);
    // console.log('jsonData[0]?.result?.data:', jsonData[0]?.result?.data);
    const meetingData = jsonData[0]?.result?.data || jsonData?.result?.data;
    if (!meetingData) {
      console.error('Invalid response structure:', jsonData);
      throw new Error('Invalid response format');
    }

    return meetingData;
  } catch (error) {
    console.error('Error fetching meeting details:', error);
    throw error;
  }
};

export default fetchMeetingById;
