import { CreateMeetingParams } from '@/types/createMeeting';

import axiosInstance from '../api';

const createMeeting = async (meetingData: CreateMeetingParams) => {
  const formData = new FormData();

  const lightening = {
    title: meetingData.title,
    summary: meetingData.summary,
    address: meetingData.address,
    city: meetingData.city,
    town: meetingData.town,
    category: meetingData.category,
    targetAt: meetingData.targetAt,
    endAt: meetingData.endAt,
    capacity: meetingData.capacity,
    minCapacity: meetingData.minCapacity,
    placeName: meetingData.placeName,
    latitude: meetingData.latitude,
    longitude: meetingData.longitude,
  };
  const blob = new Blob([JSON.stringify(lightening)], { type: 'application/json' });
  formData.append('lightening', blob);

  if (meetingData.image) {
    formData.append('image', meetingData.image);
  }

  const response = await axiosInstance.post(`/api/v1/lightenings`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export default createMeeting;
