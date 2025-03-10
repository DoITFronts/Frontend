'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import chatApi from '@/api/chat/chatApi';
import createMeeting from '@/api/meeting/createMeeting';
import Icon from '@/components/shared/Icon';
import Button from '@/components/ui/Button';
import PlaceSearch from '@/components/ui/modal/SearchPlace';
import useModalStore from '@/store/useModalStore';
import { CreateMeetingParams, MeetingCategory } from '@/types/meeting';

import CustomDatePicker from '../datePicker';

const meetingCategories = Object.values(MeetingCategory);

export default function CreateMeetingModal() {
  const { closeModal } = useModalStore();
  const [meetingName, setMeetingName] = useState('');
  const [meetingSummary, setMeetingSummary] = useState('');
  const [meetingPlace, setMeetingPlace] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [meetingDate, setMeetingDate] = useState(new Date());
  const [deadlineDate, setDeadlineDate] = useState(new Date());
  const [meetingType, setMeetingType] = useState<MeetingCategory | null>(null);
  const [participantCount, setParticipantCount] = useState('');
  const [minParticipants, setMinParticipants] = useState('');
  const [selectedPlace, setSelectedPlace] = useState<{
    latitude: string;
    longitude: string;
    placeName: string;
    address: string;
    city: string;
    town: string;
  } | null>(null);
  // TODO: 추후에 데이터 연결 시 보내는 postData.
  useEffect(() => {
    console.log(selectedPlace);
    console.log(deadlineDate);
    console.log(imageFile?.size);
  }, [selectedPlace]);

  const router = useRouter();

  const handleMeetingName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (/^[가-힣a-zA-Z0-9\s]*$/.test(value)) {
      setMeetingName(value);
    }
  };

  const handleMeetingSummary = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setMeetingSummary(value);
  };

  // TODO?: 따로 행정구역(~도 ~시)파일을 만들어서 지역을 검색했을 때 자동 완성 되는 기능을 넣어볼까 합니다.
  const handlePlaceSelect = (place: {
    placeName: string;
    address: string;
    city: string;
    town: string;
    latitude: string;
    longitude: string;
  }) => {
    setSelectedPlace(place);
    setMeetingPlace(place.placeName); // 기존 상태 업데이트
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleMeetingType = (type: MeetingCategory) => {
    setMeetingType((prev) => (prev === type ? null : type));
  };

  const handleMeetingDateChange = (date: Date | null) => {
    if (date) {
      setMeetingDate(date);
    }
  };
  const handleDeadlineDateChange = (date: Date | null) => {
    if (date) {
      setDeadlineDate(date);
    }
  };

  const handleParticipantChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    // 숫자만 입력되도록
    if (/^\d*$/.test(value)) {
      setParticipantCount(value);
    }
  };

  const handleMinParticipantsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (/^\d*$/.test(value)) {
      setMinParticipants(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!meetingType) {
      console.error('모임 유형을 선택해주세요');
      return;
    }

    if (!selectedPlace) {
      console.error('장소를 선택해주세요');
      return;
    }

    if (imageFile && imageFile.size > 5 * 1024 * 1024) {
      toast.error('이미지 크기는 5MB를 초과할 수 없습니다.', { autoClose: 900 });
      return;
    }

    const meetingData: CreateMeetingParams = {
      title: meetingName,
      summary: meetingSummary,
      address: selectedPlace.address,
      city: selectedPlace.city,
      town: selectedPlace.town,
      placeName: selectedPlace.placeName,
      latitude: selectedPlace.latitude,
      longitude: selectedPlace.longitude,
      category: meetingType,
      targetAt: meetingDate.toISOString(),
      endAt: deadlineDate.toISOString(),
      capacity: parseInt(participantCount, 10),
      minCapacity: parseInt(minParticipants, 10) || 1,
      ...(imageFile && { image: imageFile }),
    };

    try {
      const response = await createMeeting(meetingData);

      if (response.id) {
        router.push(`/meeting/detail/${response.id}`);
        toast.success('모임 만들기에 성공했습니다!', { autoClose: 900 });
        await chatApi(meetingData.title);
        closeModal();
      }
    } catch (error) {
      toast.error('에러가 발생했습니다.', { autoClose: 900 });
      console.error('Error: ', error);
    }
  };

  const isFormValid =
    !!meetingName &&
    meetingName.length >= 2 &&
    meetingName.length <= 30 &&
    !!meetingSummary &&
    !!meetingPlace &&
    !!meetingDate &&
    !!deadlineDate &&
    deadlineDate <= meetingDate &&
    !!meetingType &&
    !!participantCount;

  return (
    <div className="oveflow-hidden inline-flex max-h-[95vh] w-[520px] flex-col items-start justify-start gap-2.5 rounded-xl border border-black bg-white p-6 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
      <div className="flex h-auto w-full flex-col gap-6 overflow-y-auto [&::-webkit-scrollbar]:hidden">
        <div className="flex w-full justify-between ">
          <span className="font-dunggeunmo text-xl text-black">{'< 모임 만들기 >'}</span>
          <button onClick={closeModal}>
            <Icon path="X" width="24" height="24" />
          </button>
        </div>
        <form className="flex h-auto w-full flex-col gap-6" onSubmit={handleSubmit}>
          <div className="flex w-full flex-col gap-3">
            <label htmlFor="meetingName" className="font-dunggeunmo text-base text-black-11">
              모임 이름
            </label>
            <input
              type="text"
              id="meetingName"
              placeholder="모임 이름을 작성해 주세요."
              onChange={handleMeetingName}
              className="w-full rounded-[12px] bg-black-2 px-4 py-2.5 text-black-8 placeholder:text-black-6"
            />
          </div>
          <div className="flex w-full flex-col gap-3">
            <label htmlFor="meetingSummary" className="font-dunggeunmo text-base text-black-11">
              모임 소개글
            </label>
            <input
              type="text"
              placeholder="모임 소개글을 작성해 주세요."
              onChange={handleMeetingSummary}
              className="w-full rounded-[12px] bg-black-2 px-4 py-2.5 text-black-8 placeholder:text-black-6"
            />
          </div>
          <div className="flex w-full flex-col gap-3">
            <label htmlFor="meetingPlace" className="font-dunggeunmo text-base text-black-11">
              장소
            </label>
            <PlaceSearch onPlaceSelect={handlePlaceSelect} />
            {selectedPlace && (
              <div className="mt-2 rounded-[12px] bg-black-2 p-2">
                <p className="text-sm text-black-8">{selectedPlace.address}</p>
              </div>
            )}
          </div>

          {/* TODO: 파일명 제출 버튼 위치 바꾸기 */}
          <div className="flex w-full flex-col gap-3">
            <span className="font-dunggeunmo text-base text-black-11">이미지</span>
            <div className="relative flex w-full justify-between">
              <input
                type="file"
                id="image"
                onChange={handleImageChange}
                accept="image/*"
                className="absolute w-[360px] cursor-pointer opacity-0 file:hidden "
              />
              <div
                className={`w-[360px] rounded-[12px] bg-black-2 px-4 py-2.5  ${imageFile ? 'text-black-8' : 'text-black-6'}`}
              >
                {imageFile ? imageFile.name : '이미지를 첨부해 주세요'}
              </div>
              <label
                htmlFor="image"
                className={`flex h-auto w-[100px] cursor-pointer items-center justify-center rounded-[12px] border py-2.5 text-sm font-semibold  ${imageFile ? 'border-black text-black' : 'border-black-6 text-black-6'}`}
              >
                파일 찾기
              </label>
            </div>
          </div>
          <div className="flex w-full flex-col gap-3">
            <span className="text-blac-11k font-dunggeunmo text-base">카테고리</span>
            <div className="flex w-full justify-between gap-3">
              {meetingCategories.map((type) => (
                <div
                  key={type}
                  className={`flex w-full cursor-pointer items-center rounded-[12px] border border-black-6 py-2 pl-[6px] pr-2.5 ${meetingType === type ? 'border-black-10 bg-black-10' : ''}`}
                  onClick={() => handleMeetingType(type)}
                >
                  <div className="flex w-full items-center justify-between">
                    <div className="flex size-[24px] items-center justify-center">
                      <div className="flex size-4 items-center justify-center rounded-[5px] border border-black-6 bg-white">
                        {meetingType === type ? (
                          <svg
                            width="10"
                            height="7"
                            viewBox="0 0 10 7"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1.00004 2.5L4.50009 6C6.98524 3.21054 6.46948 3.78946 8.95464 1"
                              stroke="#595959"
                              strokeWidth="1.4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                    <div
                      className={`text-sm ${meetingType === type ? 'text-white' : 'text-black-6'}`}
                    >
                      {type}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex w-full justify-between gap-2">
            <div className="flex h-[72px] w-[217px] flex-col gap-2">
              <CustomDatePicker
                label="모임 날짜"
                selected={meetingDate}
                onChange={handleMeetingDateChange}
              />
            </div>
            <div className="flex h-[72px] w-[217px] flex-col gap-2">
              <CustomDatePicker
                label="마감 날짜"
                selected={deadlineDate}
                onChange={handleDeadlineDateChange}
              />
            </div>
          </div>
          <div className="flex w-full flex-col gap-3">
            <label htmlFor="모집 정원" className="font-dunggeunmo text-base text-black-11">
              모집 정원
            </label>
            <input
              type="text"
              className="w-full rounded-[12px] bg-black-2 px-4 py-2.5 text-black-8 placeholder:text-black-6"
              placeholder="최대 인원을 입력해 주세요."
              onChange={handleParticipantChange}
              value={participantCount}
            />
          </div>
          <div className="flex w-full flex-col gap-3">
            <label htmlFor="최소 인원" className="font-dunggeunmo text-base text-black-11">
              최소 인원
            </label>
            <input
              type="text"
              placeholder="최소 인원을 입력해 주세요."
              className="w-full rounded-[12px] bg-black-2 px-4 py-2.5 text-black-8 placeholder:text-black-6"
              onChange={handleMinParticipantsChange}
              value={minParticipants}
            />
          </div>
        </form>
        <div className="mt-4 flex w-full justify-center">
          {/* TODO: form value 모두 작성 시, 버튼 활성화 로직 추가 */}
          <Button
            color="filled"
            size="lg"
            disabled={!isFormValid}
            className="w-full"
            onClick={handleSubmit}
          >
            확인
          </Button>
        </div>
      </div>
    </div>
  );
}
