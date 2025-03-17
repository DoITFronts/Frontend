import { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';

import { joinLightning, leaveLightning } from '@/api/client/meeting/joinMeeting';
import { Meeting } from '@/types/meeting/meeting';

import {
  LIGHTNING_CANCEL_SUCCESS,
  LIGHTNING_JOIN_SUCCESS,
  REQUEST_ERROR,
} from '@/lib/constants/toast';

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
