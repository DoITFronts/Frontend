const fetchDetailReview = async (meetingId: string) => {
    const response = await fetch(`/api/v1/meeting/${meetingId}/reviews`);
    return response.json() || [
        {
            id: '1',
            writer: '귀여운 사슴',
            profileImage: 'https://coen.store/api/portraits/men/3.jpg',
            content: '너무 좋은 번개이었어요! 다시 참여하고 싶어요.',
            date: '2025-02-11',
            count: 4,
        },
        {
            id: '2',
            writer: '씩씩한 고양이',
            profileImage: 'https://coen.store/api/portraits/men/5.jpg',
            content: '책을 읽으면서 대화하는 시간이 너무 좋았어요.',
            date: '2025-02-11',
            count: 3,
        },
        {
            id: '3',
            writer: '느긋한 거북이',
            profileImage: 'https://coen.store/api/portraits/men/7.jpg',
            content: '다들 너무 친절하고 좋은 분들이었어요.',
            date: '2025-02-11',
            count: 5,
        },
        {
            id: '4',
            writer: '고민 많은 판다',
            profileImage: 'https://coen.store/api/portraits/w/4.jpg',
            content: '책을 읽으면서 대화하는 시간이 너무 좋았어요.',
            date: '2025-02-11',
            count: 3,
        },
        {
            id: '5',
            writer: '장난꾸러기 다람쥐',
            profileImage: 'https://coen.store/api/portraits/w/5.jpg',
            content: '다들 너무 친절하고 좋은 분들이었어요.',
            date: '2025-02-11',
            count: 5,
        },
        {
            id: '6',
            writer: '생각 깊은 올빼미',
            profileImage: 'https://coen.store/api/portraits/w/6.jpg',
            content: '책을 읽으면서 대화하는 시간이 너무 좋았어요.',
            date: '2025-02-11',
            count: 3,
        },
        {
            id: '7',
            writer: '조용한 나무늘보',
            profileImage: 'https://coen.store/api/portraits/w/1.jpg',
            content: '다들 너무 친절하고 좋은 분들이었어요.',
            date: '2025-02-11',
            count: 5,
        },
    ];
}

