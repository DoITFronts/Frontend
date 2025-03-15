import { joinLightning, leaveLightning } from '@/api/meeting/joinMeeting';
import { Meeting } from '@/types/meeting';
import { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';
import { LIGHTNING_CANCEL_SUCCESS, LIGHTNING_JOIN_SUCCESS } from '@/constants/successText';
import { REQUEST_ERROR } from '@/constants/errorText';

export default function useMeetingToggle(setMeetings: Dispatch<SetStateAction<Meeting[]>>) {
  const toggleMeeting = async (meeting: Meeting): Promise<boolean> => {
    setMeetings((prevMeetings) =>
      prevMeetings.map((m) => (m.id === meeting.id ? { ...m, isJoined: !m.isJoined } : m)),
    );

    try {
      if (meeting.isJoined) {
        await leaveLightning(meeting.id);
        toast.success(LIGHTNING_CANCEL_SUCCESS);
      } else {
        await joinLightning(meeting.id);
        toast.success(LIGHTNING_JOIN_SUCCESS);
      }
      return true;
    } catch (error) {
      setMeetings((prevMeetings) =>
        prevMeetings.map((m) => (m.id === meeting.id ? { ...m, isJoined: m.isJoined } : m)),
      );
      toast.error(REQUEST_ERROR);
      return false;
    }
  };
  return { toggleMeeting };
}
