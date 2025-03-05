'use client';
import useModalStore from '@/store/useModalStore';
import { useEffect, useState } from 'react';
import CustomDatePicker from '../datePicker';
import Button from '@/components/ui/Button';
import Icon from '@/components/shared/Icon';
import { CreateMeetingParams } from '@/types/createMeeting';
import createMeeting from '@/api/meeting/createMeeting';
import PlaceSearch from '@/components/ui/modal/SearchPlace';
import { useRouter } from 'next/navigation';

type MeetingType = '술' | '카페' | '보드게임' | '맛집';
const meetingTypes: MeetingType[] = ['술', '카페', '보드게임', '맛집'];

const typeMapping: Record<MeetingType, CreateMeetingParams['category']> = {
  술: 'ALCOHOL',
  카페: 'CAFE',
  보드게임: 'BOARD_GAME',
  맛집: 'GOURMET',
};

export default function CreateMeetingModal() {
  const { closeModal } = useModalStore();
  const [meetingName, setMeetingName] = useState('');
  const [meetingSummary, setMeetingSummary] = useState('');
  const [meetingPlace, setMeetingPlace] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [meetingDate, setMeetingDate] = useState(new Date());
  const [deadlineDate, setDeadlineDate] = useState(new Date());
  const [meetingType, setMeetingType] = useState<MeetingType | null>(null);
  const [participantCount, setParticipantCount] = useState('');
  const [minParticipants, setMinParticipants] = useState('');
  const [selectedPlace, setSelectedPlace] = useState<{
    placeName: string;
    address: string;
    city: string;
    town: string;
  } | null>(null);
  // TODO: 추후에 데이터 연결 시 보내는 postData.
  useEffect(() => {
    console.log(selectedPlace);
    console.log(deadlineDate);
  }, [selectedPlace]);

  const router = useRouter();

  const handleMeetingName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^[가-힣a-zA-Z0-9\s]*$/.test(value)) {
      setMeetingName(value);
    }
  };

  const handleMeetingSummary = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMeetingSummary(value);
  };

  // TODO?: 따로 행정구역(~도 ~시)파일을 만들어서 지역을 검색했을 때 자동 완성 되는 기능을 넣어볼까 합니다.
  const handlePlaceSelect = (place: {
    placeName: string;
    address: string;
    city: string;
    town: string;
  }) => {
    setSelectedPlace(place);
    setMeetingPlace(place.placeName); // 기존 상태 업데이트
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleMeetingType = (type: MeetingType) => {
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
    const value = e.target.value;
    // 숫자만 입력되도록
    if (/^\d*$/.test(value)) {
      setParticipantCount(value);
    }
  };

  const handleMinParticipantsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
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

    const apiType = typeMapping[meetingType];

    const meetingData: CreateMeetingParams = {
      title: meetingName,
      summary: meetingSummary,
      address: selectedPlace.address,
      city: selectedPlace.city,
      town: selectedPlace.town,
      category: apiType,
      targetAt: meetingDate.toISOString(),
      endAt: deadlineDate.toISOString(),
      capacity: parseInt(participantCount),
      minCapacity: parseInt(minParticipants) || 1,
      ...(imageFile && { image: imageFile }),
    };

    try {
      const response = await createMeeting(meetingData);

      if (response.id) {
        router.push(`/api/v1/lightenings/${response.id}`);

        closeModal();
      }
    } catch (error) {
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
    <div className="w-[520px] max-h-[95vh] p-6 bg-white rounded-xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border border-black flex-col justify-start items-start gap-2.5 inline-flex oveflow-hidden">
      <div className="flex flex-col gap-6 w-full h-auto overflow-y-auto [&::-webkit-scrollbar]:hidden">
        <div className="w-full flex justify-between ">
          <span className="text-xl text-black font-dunggeunmo">{'< 모임 만들기 >'}</span>
          <button onClick={closeModal}>
            <Icon path="X" width="24" height="24" />
          </button>
        </div>
        <form className="w-full h-auto flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3 w-full">
            <label htmlFor="meetingName" className="font-dunggeunmo text-base text-black-11">
              모임 이름
            </label>
            <input
              type="text"
              placeholder="모임 이름을 작성해 주세요."
              onChange={handleMeetingName}
              className="text-black-8 w-full bg-black-2 px-4 py-2.5 rounded-[12px] placeholder:text-black-6"
            />
          </div>
          <div className="w-full flex flex-col gap-3">
            <label htmlFor="meetingSummary" className="font-dunggeunmo text-base text-black-11">
              모임 소개글
            </label>
            <input
              type="text"
              placeholder="모임 소개글을 작성해 주세요."
              onChange={handleMeetingSummary}
              className="text-black-8 w-full bg-black-2 px-4 py-2.5 rounded-[12px] placeholder:text-black-6"
            />
          </div>
          <div className="w-full flex flex-col gap-3">
            <label htmlFor="meetingPlace" className="font-dunggeunmo text-base text-black-11">
              장소
            </label>
            <PlaceSearch onPlaceSelect={handlePlaceSelect} />
            {selectedPlace && (
              <div className="mt-2 p-2 bg-black-2 rounded-[12px]">
                <p className="text-sm text-black-8">{selectedPlace.address}</p>
              </div>
            )}
          </div>

          {/* TODO: 파일명 제출 버튼 위치 바꾸기 */}
          <div className="w-full flex flex-col gap-3">
            <span className="font-dunggeunmo text-base text-black-11">이미지</span>
            <div className="relative flex justify-between w-full">
              <input
                type="file"
                id="image"
                onChange={handleImageChange}
                accept="image/*"
                className="absolute w-[360px] opacity-0 file:hidden cursor-pointer "
              />
              <div
                className={`bg-black-2 px-4 py-2.5 rounded-[12px] w-[360px]  ${imageFile ? 'text-black-8' : 'text-black-6'}`}
              >
                {imageFile ? imageFile.name : '이미지를 첨부해 주세요'}
              </div>
              <label
                htmlFor="image"
                className={`flex items-center justify-center w-[100px] cursor-pointer h-auto py-2.5 text-sm font-semibold rounded-[12px] border  ${imageFile ? 'text-black border-black' : 'text-black-6 border-black-6'}`}
              >
                파일 찾기
              </label>
            </div>
          </div>
          <div className="w-full flex flex-col gap-3">
            <span className="font-dunggeunmo text-base text-blac-11k">카테고리</span>
            <div className="w-full flex justify-between gap-3">
              {meetingTypes.map((type) => (
                <div
                  key={type}
                  className={`w-full border rounded-[12px] cursor-pointer border-black-6 pl-[6px] pr-2.5 py-2 flex items-center ${meetingType === type ? 'bg-black-10 border-black-10' : ''}`}
                  onClick={() => handleMeetingType(type)}
                >
                  <div className="w-full flex justify-between items-center">
                    <div className="size-[24px] flex items-center justify-center">
                      <div className="border border-black-6 w-4 h-4 rounded-[5px] bg-white flex items-center justify-center">
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
          <div className="w-full flex justify-between gap-2">
            <div className="w-[217px] h-[72px] flex flex-col gap-2">
              <CustomDatePicker
                label="모임 날짜"
                selected={meetingDate}
                onChange={handleMeetingDateChange}
              />
            </div>
            <div className="w-[217px] h-[72px] flex flex-col gap-2">
              <CustomDatePicker
                label="마감 날짜"
                selected={deadlineDate}
                onChange={handleDeadlineDateChange}
              />
            </div>
          </div>
          <div className="flex flex-col gap-3 w-full">
            <label htmlFor="모집 정원" className="text-black-11 font-dunggeunmo text-base">
              모집 정원
            </label>
            <input
              type="text"
              className="text-black-8 w-full bg-black-2 px-4 py-2.5 rounded-[12px] placeholder:text-black-6"
              placeholder="최대 인원을 입력해 주세요."
              onChange={handleParticipantChange}
              value={participantCount}
            />
          </div>
          <div className="flex flex-col gap-3 w-full">
            <label htmlFor="최소 인원" className="text-black-11 font-dunggeunmo text-base">
              최소 인원
            </label>
            <input
              type="text"
              placeholder="최소 인원을 입력해 주세요."
              className="text-black-8 w-full bg-black-2 px-4 py-2.5 rounded-[12px] placeholder:text-black-6"
              onChange={handleMinParticipantsChange}
              value={minParticipants}
            />
          </div>
        </form>
        <div className="w-full flex justify-center mt-4">
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
