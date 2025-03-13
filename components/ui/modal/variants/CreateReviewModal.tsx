'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';

import createReview from '@/api/review/createReview';
import Button from '@/components/ui/button/Button';
import ReviewHeartSelectable from '@/components/ui/review/ReviewHeartSelectable'; // 새로운 별점 컴포넌트
import Icon from '@/components/utils/Icon';
import useModalStore from '@/store/useModalStore';

interface CreateReviewModalProps {
  meetingId: string;
}

export default function CreateReviewModal({ meetingId }: CreateReviewModalProps) {
  const { closeModal } = useModalStore();
  const [score, setScore] = useState(0);
  const [content, setContent] = useState('');
  const maxLength = 50;

  const handleSubmit = async () => {
    if (score === 0) {
      toast.error('별점을 선택해주세요!');
      return;
    }
    if (!content.trim()) {
      toast.error('리뷰 내용을 입력해주세요!');
      return;
    }

    try {
      await createReview(meetingId, content, score);
      toast.success('리뷰가 등록되었습니다!');
      closeModal();
    } catch (error) {
      toast.error('리뷰 등록에 실패했습니다.');
    }
  };

  return (
    <div className="flex max-h-[95vh] w-[400px] flex-col rounded-xl border border-black bg-white p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <span className="font-dunggeunmo text-xl text-black">{'< 리뷰쓰기 >'}</span>
        <button type="button" onClick={closeModal}>
          <Icon path="X" width="24" height="24" />
        </button>
      </div>
      <div className="mt-6">
        <h2 className="text-base font-bold">만족스러운 번개였나요?</h2>
        <ReviewHeartSelectable count={score} onSelect={setScore} />
      </div>
      <div className="mt-4">
        <label htmlFor="review-content" className="text-base font-bold">
          번개에 대해 남겨주세요.
          <textarea
            id="review-content"
            className="h-24 w-full resize-none rounded-md border border-gray-300 p-2 placeholder:text-gray-500"
            placeholder="남겨주신 리뷰는 다음 번개에 큰 도움이 될 거예요 :)"
            maxLength={maxLength}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </label>

        <div className="text-right text-sm text-gray-400">
          {content.length}/{maxLength}
        </div>
      </div>
      <div className="mt-6 flex justify-between gap-2">
        <Button color="white" type="button" size="sm" className="w-full" onClick={closeModal}>
          취소
        </Button>
        <Button color="filled" type="button" className="w-full" onClick={handleSubmit}>
          완료
        </Button>
      </div>
    </div>
  );
}
