// api/data/mockMyPageMeetings.ts
import { Meeting } from '@/types/meeting.types';

import mockMeetings from './mockMeetings';

const MOCK_USER_ID = 'user1';

interface MyPageMeeting extends Meeting {
participants: string[];
createdBy: string;
}

const mockMyPageMeetings: MyPageMeeting[] = mockMeetings.map((meeting) => ({
...meeting,
participants: ['user1', 'user2', 'user3'],
// parseInt를 사용하여 문자열 ID를 숫자로 변환 후 계산
createdBy: parseInt(meeting.id) % 2 === 0 ? MOCK_USER_ID : 'user2',
}));

export default mockMyPageMeetings;
