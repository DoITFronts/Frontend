![Group 33981](https://github.com/user-attachments/assets/2afd98ae-6bf6-422c-95e1-c96ab9d8b4d9)


# 목차
1. [팀원 소개](#팀원-소개)
2. [프로젝트 소개](#프로젝트-소개)
3. [주요 기능](#주요-기능)
4. [기술 스택](#기술-스택)
5. [화면 설계](#화면-설계)
6. [API 명세서](#API-명세서)
7. [폴더 구조](#폴더-구조)
8. [구현 페이지](#구현-페이지)

# 팀원 소개
> **TEAM DOIT**<br>
> 깔쌈한 프론트엔드 개발자 단체 DOIT 입니다.
<table align="center">
 <tr>
    <td align="center"><a href="https://github.com/xeunnie"><img src="https://avatars.githubusercontent.com/u/138289674?v=4" width="150px;" alt="">
    <td align="center"><a href="https://github.com/Ocean423"><img src="https://avatars.githubusercontent.com/u/111185468?v=4" width="150px;" alt="">
    <td align="center"><a href="https://github.com/Oh-hong"><img src="https://avatars.githubusercontent.com/u/163826719?v=4" width="150px;" alt="">
    <td align="center"><a href="https://github.com/siggu"><img src="https://avatars.githubusercontent.com/u/106001755?v=4" width="150px;" alt="">
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/xeunnie"><b>최승은</b></td>
    <td align="center"><a href="https://github.com/Ocean423"><b>오소영</b></td>
    <td align="center"><a href="https://github.com/Oh-hong"><b>홍준기</b></td>
    <td align="center"><a href="https://github.com/siggu"><b>김정목</b></td>
  </tr>
  </table>
<br>

# 프로젝트 소개
### 번개처럼 빠르게! 새로운 사람들과 만나보세요. 번개팅!
번개팅은 빠르게 모임을 생성하고 참여할 수 있는 번개 모임 플랫폼으로, 실제 참여자들의 솔직한 리뷰를 통해 신뢰할 수 있는 만남을 제공합니다.
<br/>

# 주요 기능
### 1. 모임 조회
술자리, 보드게임, 카페, 맛집 등 다양한 번개 모임을 조회하고 즉시 참여할 수 있습니다.    
### 2. 모임 생성
모달을 통해 누구나 쉽고 빠르게 번개 모임을 생성할 수 있습니다.
### 3. 모임 참여
원하는 테마와 장소의 번개 모임에 참여할 수 있습니다.
### 4. 모임 상세보기
주최자 정보, 모임 상세 정보, 위치, 리뷰 등 모임에 대한 자세한 정보를 알 수 있습니다. 
### 5. 리뷰
실제 참여자들의 솔직한 리뷰를 제공합니다. 별점과 코멘트를 남길 수 있습니다.
### 6. 마이 페이지
내가 참여하고 만든 모임의 정보를 알 수 있고, 프로필을 수정할 수 있습니다.
### 7. 실시간 채팅
실시간 채팅을 통해 참가자 간 일정 조율 및 모임 정보를 공유할 수 있습니다.

# 기술 스택
#### 🎨 프론트엔드
<div style="flex">
 <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=white">
 <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=TypeScript&logoColor=white">
 <img src="https://img.shields.io/badge/Next.js-000000?style=flat&logo=Next.js&logoColor=white">
 <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=flat&logo=Tailwind CSS&logoColor=white">
 <img src="https://img.shields.io/badge/React Query-FF4154?style=flat&logo=React Query&logoColor=white">
 <img src="https://img.shields.io/badge/Zustand-000000?style=flat&logo=Zustand&logoColor=white">
</div>

#### 🤝 협업 & 버전 관리
<div style="flex">
 <img src="https://img.shields.io/badge/Jira-0052CC?style=flat&logo=Jira&logoColor=white">
 <img src="https://img.shields.io/badge/Figma-F24E1E?style=flat&logo=Figma&logoColor=white">
 <img src="https://img.shields.io/badge/Git-F05032?style=flat&logo=Git&logoColor=white">
 <img src="https://img.shields.io/badge/Github-181717?style=flat&logo=Github&logoColor=white">
</div>

#### ⚙️ 개발 도구
<div style="flex">
 <img src="https://img.shields.io/badge/Eslint-4B32C3?style=flat&logo=Eslint&logoColor=white">
 <img src="https://img.shields.io/badge/Prettier-F7B93E?style=flat&logo=Prettier&logoColor=white">
</div>

#### 🚀 CI/CD
<div style="flex">
 <img src="https://img.shields.io/badge/Netlify-00C7B7?style=flat&logo=Netlify&logoColor=white">
</div>



# 배포 주소
https://doitz.netlify.app/

# 화면 설계
<a href="https://www.figma.com/design/zvZ4WQR7gW7C72Mxo0oZGw/%EB%B2%88%EA%B0%9C%ED%8C%85?node-id=84-24401&p=f&t=5qYKX6gI25qwi3fz-0
">Figma 링크</a>

# API 명세서
<a href="https://harmless-gander-9c6.notion.site/API-191768e5758280a69a2acb4095ba7c31">API 명세서 (노션)</a>

# 폴더 구조
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

# 구현 페이지 
### 랜딩 페이지
번개팅에 대한 소개가 담긴 첫 페이지입니다

### 회원가입/로그인/로그아웃
계정 생성 및 로그인, 유효성 검사를 수행합니다

### 번개 조회
다른 유저와 함께 참여할 프로그램 모임 목록을 탐색할 수 있습니다

### 번개 생성
장소, 날짜, 모집 정원 등을 입력하여 새로운 모임을 생성할 수 있습니다

### 상세 페이지
모임에 대한 상세한 정보를 확인할 수 있습니다

### 찜한 번개 페이지
찜 해놓은 모임 목록을 확인할 수 있습니다

### 마이 페이지
내 프로필 관리 및 내가 신청한 모임 목록을 확인할 수 있습니다

### 리뷰 페이지
모임에 대한 리뷰를 확인할 수 있습니다






