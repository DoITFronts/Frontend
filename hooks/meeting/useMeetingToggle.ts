import { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';

import { joinLightning, leaveLightning } from '@/api/client/meeting/joinMeeting';
import { Meeting } from '@/types/meeting';

export default function useMeetingToggle(setMeetings: Dispatch<SetStateAction<Meeting[]>>) {
  const toggleMeeting = async (meeting: Meeting): Promise<boolean> => {
    setMeetings((prevMeetings) =>
      prevMeetings.map((m) => (m.id === meeting.id ? { ...m, isJoined: !m.isJoined } : m)),
    );

    try {
      if (meeting.isJoined) {
        await leaveLightning(meeting.id);
        toast.success('번개 참여가 취소되었습니다.', { autoClose: 900 });
      } else {
        await joinLightning(meeting.id);
        toast.success('번개 참여가 완료되었습니다!', { autoClose: 900 });
      }
      return true;
    } catch (error) {
      setMeetings((prevMeetings) =>
        prevMeetings.map((m) => (m.id === meeting.id ? { ...m, isJoined: m.isJoined } : m)),
      );
      toast.error(`요청에 실패했습니다.`, { autoClose: 900 });
      return false;
    }
  };
  return { toggleMeeting };
}
