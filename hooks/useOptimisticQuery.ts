import { useMutation, useQueryClient, InfiniteData } from '@tanstack/react-query';
import { Meeting } from '@/types/meeting';

// 낙관적 업데이트를 위한 타입 정의
type UpdateFunction<T> = (item: T) => T;
type ApiFunction<T, P, R> = (params: P) => Promise<R>;

/**
 * 낙관적 업데이트를 위한 공용 훅
 * @param queryKey 캐시 키
 * @param apiFunction API 호출 함수
 * @param updateFunction 아이템 업데이트 함수
 * @param options 추가 옵션
 */

function useOptimisticMutation<T, P = any, R = T>(
  queryKey: string[],
  apiFunction: ApiFunction<T, P, R>,
  updateFunction: UpdateFunction<T>,
  options?: {
    findItem?: (item: T, params: P) => boolean;
    invalidateQueryKey?: string[];
  },
) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: apiFunction,
    retry: 2,
    retryDelay: 300,
    onMutate: async (params: P) => {
      // 진행 중인 쿼리 취소
      await queryClient.cancelQueries({ queryKey: ['meetings'] });

      // 모든 meetings 관련 쿼리 키 찾기
      const queryCache = queryClient.getQueryCache();
      const meetingsQueries = queryCache.findAll({
        queryKey: ['meetings'],
        exact: false,
      });

      const prevDataMap: Record<string, any> = {};

      // 각 쿼리에 대해 낙관적 업데이트 적용
      meetingsQueries.forEach((query) => {
        const queryKeyString = JSON.stringify(query.queryKey);
        prevDataMap[queryKeyString] = query.state.data;

        queryClient.setQueryData(query.queryKey, (oldData: any) => {
          if (!oldData) return oldData;

          const findItemFn = options?.findItem || ((item: any, params: any) => item.id === params);

          // 데이터 구조 확인
          if (oldData.pages && Array.isArray(oldData.pages)) {
            // 무한 쿼리 구조 (InfiniteData)
            return {
              ...oldData,
              pages: oldData.pages.map((page: any) => {
                // lighteningResponses가 있는 경우
                if (page.lighteningResponses && Array.isArray(page.lighteningResponses)) {
                  return {
                    ...page,
                    lighteningResponses: page.lighteningResponses.map((item: T) =>
                      findItemFn(item, params) ? updateFunction(item) : item,
                    ),
                  };
                }
                // 직접 배열인 경우
                else if (Array.isArray(page)) {
                  return page.map((item: T) =>
                    findItemFn(item, params) ? updateFunction(item) : item,
                  );
                }
                // 기타 경우
                return page;
              }),
            };
          }
          // 마이페이지 구조 (객체 내 lighteningResponses 배열)
          else if (oldData.lighteningResponses && Array.isArray(oldData.lighteningResponses)) {
            return {
              ...oldData,
              lighteningResponses: oldData.lighteningResponses.map((item: T) =>
                findItemFn(item, params) ? updateFunction(item) : item,
              ),
            };
          }
          // 직접 배열인 경우
          else if (Array.isArray(oldData)) {
            return oldData.map((item: T) =>
              findItemFn(item, params) ? updateFunction(item) : item,
            );
          }

          // 그 외 구조는 변경하지 않음
          return oldData;
        });
      });

      return { prevDataMap };
    },
    onError: (_err, _params, context) => {
      if (context?.prevDataMap) {
        Object.entries(context.prevDataMap).forEach(([queryKeyString, data]) => {
          const queryKey = JSON.parse(queryKeyString);
          queryClient.setQueryData(queryKey, data);
        });
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['meetings'] });
    },
  });

  return mutation;
}
// 좋아요 토글을 위한 특화된 훅
export function useToggleLikeMutation(toggleLikeApi: (meetingId: string) => Promise<any>) {
  return useOptimisticMutation<Meeting, string>(
    ['meetings'],
    toggleLikeApi,
    (meeting) => ({ ...meeting, isLiked: !meeting.isLiked }),
    {
      findItem: (meeting, meetingId) => meeting.id === meetingId,
    },
  );
}

// 미팅 참여/취소를 위한 특화된 훅
export function useToggleJoinMutation(toggleJoinApi: (meetingId: string) => Promise<boolean>) {
  return useOptimisticMutation<Meeting, string, boolean>(
    ['meetings'],
    toggleJoinApi,
    (meeting) => ({ ...meeting, isJoined: !meeting.isJoined }),
    {
      findItem: (meeting, meetingId) => meeting.id === meetingId,
    },
  );
}

export default useOptimisticMutation;
