## 추후 삭제할 파일

### hooks 폴더
React Query 기반으로 CSR에서 상태 관리 및 API 호출을 담당
- 클라이언트에서 React Query를 사용할 때 useQuery, useMutation을 감싸서 비즈니스 로직을 포함한 훅을 정의
- API 요청을 직접 다루지 않고, api/의 API 요청 함수를 호출
- 상태 관리 (예: useAuth.ts에서 로그인/로그아웃 상태 관리)
