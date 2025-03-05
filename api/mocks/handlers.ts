// API 요청을 가로채는 핸들러 정의
import { rest } from 'msw';

import mockMeetingDetail from '@/api/data/mockMeetingDetail.md';

// import mockMyPageReviews from '@/api/data/mockMyPageReviews';

// import mockMyPageMeetings from '../data/mockMyPageMeetings';

// const MOCK_USER_ID = 'user1';

const handlers = [
  rest.get('/api/meeting/detail/:id', (req, res, ctx) => {
    const { id } = req.params;

    if (!id) {
      return res(ctx.status(400), ctx.json({ error: 'Missing event ID' }));
    }

    console.log('handler Received ID:', id);

    return res(ctx.status(200), ctx.json({ ...mockMeetingDetail, id }));
  }),

  rest.put('/api/meetings/detail/:id/description', (req, res, ctx) => {
    const { id } = req.params;
    const { description } = req.body as { description: string };
    return res(
      ctx.status(200),
      ctx.json({
        id,
        description,
      }),
    );
  }),

  // rest.get('/api/mypage/meetings', (req, res, ctx) => {
  //   const category = req.url.searchParams.get('category') || '';
  //   const type = req.url.searchParams.get('type') || '나의 번개';

  //   let filteredMeetings = mockMyPageMeetings;

  //   if (type === '나의 번개') {
  //     filteredMeetings = mockMyPageMeetings.filter((meeting) =>
  //       meeting.participants.includes(MOCK_USER_ID),
  //     );
  //   } else if (type === '내가 만든 번개') {
  //     filteredMeetings = mockMyPageMeetings.filter((meeting) => meeting.createdBy === MOCK_USER_ID);
  //   }

  //   if (category) {
  //     filteredMeetings = filteredMeetings.filter((meeting) => meeting.category === category);
  //   }

  //   return res(
  //     ctx.status(200),
  //     ctx.json({
  //       meetings: filteredMeetings,
  //       totalCount: filteredMeetings.length,
  //     }),
  //   );
  // }),

  // rest.get('/api/mypage/reviews', (req, res, ctx) =>
  //   res(ctx.status(200), ctx.json(mockMyPageReviews)),
  // ),
];

export default handlers;
