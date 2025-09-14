# 📚 CDRI BOOKS 프로젝트

카카오 도서 검색 API를 활용한 도서 검색 서비스입니다.

## 📋 프로젝트 개요

카카오 Search API를 활용하여 도서를 검색하고 관리할 수 있는 웹 애플리케이션입니다. 사용자는 책을 검색하고, 마음에 드는 책을 찜 목록에 저장하여 관리할 수 있습니다.

### 주요 기능
- 📖 **도서 검색**: 카카오 도서 검색 API를 통한 실시간 도서 검색
- 💾 **검색 히스토리**: 최근 검색어 자동 저장 및 빠른 재검색
- ❤️ **찜하기**: 관심 도서를 찜 목록에 저장 (최신 찜한 책이 상단 표시)
- 📱 **반응형 디자인**: 모바일, 태블릿, 데스크톱 환경 지원

## 🚀 실행 방법 및 환경 설정

### 사전 요구사항
- Node.js 18.0.0 이상
- pnpm 8.0.0 이상

### 설치 및 실행

1. **저장소 클론**
```bash
git clone https://github.com/[username]/cdri-books-yoohyojun.git
cd cdri-books-yoohyojun
```

2. **의존성 설치**
```bash
pnpm install
```

3. **환경 변수 설정**

프로젝트 루트에 `.env` 파일을 생성하고 다음 내용을 추가합니다:
```env
VITE_KAKAO_REST_API_KEY=your_kakao_rest_api_key
VITE_KAKAO_API_BASE_URL=https://dapi.kakao.com/v3/search/book
```

> ⚠️ **주의**: Kakao Developers에서 애플리케이션을 등록하고 REST API 키를 발급받아야 합니다.

4. **개발 서버 실행**
```bash
pnpm dev
```

5. **프로덕션 빌드**
```bash
pnpm build
pnpm preview  # 빌드된 결과물 미리보기
```

### 기타 명령어
```bash
pnpm test          # 테스트 실행
pnpm test:ui       # Vitest UI 실행
pnpm lint          # ESLint 실행
pnpm storybook     # Storybook 실행
```

## 📁 폴더 구조 및 주요 코드 설명

```
src/
├── components/           # 재사용 가능한 공통 컴포넌트
│   ├── button/          # 버튼 컴포넌트
│   ├── error-boundary/  # 에러 처리 컴포넌트
│   ├── header/          # 헤더 네비게이션
│   ├── icons/           # 아이콘 컴포넌트
│   ├── image/           # 이미지 컴포넌트
│   ├── no-data/         # 데이터 없음 표시
│   └── search-count-text/ # 검색 결과 카운트
│
├── features/            # 도메인별 기능 모듈
│   ├── book-list/       # 도서 목록 관련 기능
│   │   └── components/
│   │       ├── book-list/           # 도서 목록 컨테이너
│   │       ├── book-list-item/      # 도서 아이템
│   │       └── book-list-item-detail/ # 도서 상세 정보
│   └── book-search/     # 도서 검색 관련 기능
│       └── components/
│           └── search-box/           # 검색 입력 컴포넌트
│
├── hooks/               # 커스텀 React 훅
│   └── use-search-books.ts  # 도서 검색 훅 (React Query)
│
├── lib/                 # 유틸리티 및 설정
│   └── errors/
│       └── custom-errors.ts  # 커스텀 에러 클래스
│
├── pages/               # 페이지 컴포넌트
│   ├── books-search-page.tsx  # 도서 검색 페이지
│   └── favorite-books-page.tsx # 찜한 도서 페이지
│
├── providers/           # React Context Providers
│   └── query-provider.tsx  # React Query 설정
│
├── services/            # API 서비스
│   └── kakao-api.ts    # 카카오 도서 검색 API
│
├── stores/              # 전역 상태 관리 (Zustand)
│   ├── favorite-store.ts    # 찜하기 상태
│   └── search-history-store.ts # 검색 히스토리
│
└── types/               # TypeScript 타입 정의
    └── book.ts          # 도서 타입 정의
```


## 📚 라이브러리 선택 이유

### 핵심 라이브러리

#### **Vite**
- **선택 이유**: 빠른 개발 서버 구동과 HMR(Hot Module Replacement)
- **장점**: 번들 크기 최적화, ESM 기반 빠른 빌드

#### **Zustand**
- **선택 이유**: 간단하고 가벼운 클라이언트 상태 관리
- **장점**:
  - Redux 대비 적은 보일러플레이트
  - TypeScript 친화적
  - 로컬 스토리지 연동 용이

#### **Tailwind CSS**
- **선택 이유**: 빠른 UI 개발과 일관된 디자인 시스템
- **장점**:
  - 유틸리티 우선 접근법
  - 반응형 디자인 구현 용이
  - 번들 크기 최적화 (사용하지 않는 스타일 제거)

#### **Storybook**
- **선택 이유**: 컴포넌트 개발 및 문서화
- **장점**:
  - 독립적인 컴포넌트 개발 환경
  - 시각적 테스트 가능
  - 팀 협업 시 컴포넌트 카탈로그 역할

## ✨ 강조하고 싶은 기능

### 1. **Storybook 컴포넌트 문서화**
- 모든 주요 컴포넌트 스토리 작성
- 독립적인 컴포넌트 개발 환경 구축

### 2. **테스트 커버리지**
- 45개 테스트 케이스 작성
- 주요 비즈니스 로직 테스트 완료

### 3. **코드 스플리팅**
- vendor 코드 분리로 캐싱 최적화
- 재방문 시 로딩 속도 개선

### 4. **에러 처리**
- Error Boundary로 안정적인 에러 관리
- 사용자 친화적인 에러 UI

## 🔧 기술 스택

- **Frontend**: React 19, TypeScript 5
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 3
- **State Management**:
  - React Query (Server State)
  - Zustand (Client State)
- **Testing**: Vitest, React Testing Library
- **Documentation**: Storybook 8
- **Code Quality**: ESLint, Prettier