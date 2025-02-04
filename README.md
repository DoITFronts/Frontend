```aiignore
📦 프로젝트 루트
├── 📂 app
│   ├── 📂 user            # 인증 관련 페이지
│   │   ├── 📂 login         # 로그인 페이지
│   │   ├── 📂 register      # 회원가입 페이지
│   ├── 📂 meeting      # 모임 (로그인 후 접근 가능) --
│   │   ├── 📂 list     # 모임 목록
│   │   ├── 📂 detail       # 모임 상세 --
|    |--- 📂my-page        # 마이페이지
│   ├── 📂 chatting          # 준기 개발용
│   │   ├── 📂 chatlist          # 채팅 목록
│   │   ├── 📂 chatdetail         # 채팅방 --
│   ├── layout.tsx           # 메인 레이아웃
│   ├── page.tsx             # 기본 페이지 (홈)
├── 📂 components            # 재사용 가능한 UI 컴포넌트
│   ├── 📂 ui                # 버튼, 모달, 카드 등 UI 요소
│   ├── 📂 form              # 입력 폼 관련 컴포넌트
│   ├── 📂 layout            # 네비게이션 바, 푸터 등
├── 📂 hooks                 # 커스텀 훅
│   ├── useAuth.ts           # 로그인 상태 확인
│   ├── useMeetings.ts       # 모임 관련 API 요청
├── 📂 lib                   # 유틸리티 및 API 요청 관리
│   ├── api.ts               # API 요청 함수 (fetcher)
│   ├── auth.ts              # 인증 관련 로직 (JWT 관리 등)
│   ├── helpers.ts           # 공통 함수 ---
├── 📂 store                 # Zustand (상태 관리)
│   ├── authStore.ts         # 인증 관련 상태
│   ├── meetingStore.ts      # 모임 관련 상태
├── 📂 styles                # Tailwind 확장 스타일
│   ├── globals.css          # 전역 스타일
│   ├── theme.ts             # Tailwind 테마 설정 ---
├── 📂 middleware            # API 미들웨어
│   ├── authMiddleware.ts    # 인증 미들웨어
├── 📂 types
├── tailwind.config.ts       # Tailwind 설정
├── next.config.mjs          # Next.js 설정
├── tsconfig.json            # TypeScript 설정
├── package.json             # 패키지 목록
```