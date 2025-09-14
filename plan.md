# CDRI Books 프로젝트 구현 계획

## 프로젝트 개요
카카오 도서 검색 API를 사용한 책 검색 서비스

### 핵심 기능
- 도서 검색 (검색어 입력)
- 검색 결과 리스트 표시 (무한 스크롤)
- 상세 정보 보기
- 찜하기 기능

## 기술 스택
- React 19 + TypeScript + Vite
- Tailwind CSS v4
- Zustand (상태 관리) + persist (localStorage)
- TanStack Query (서버 상태)
- TanStack Virtual (가상 스크롤)
- Kakao Search API

## 프로젝트 구조 (kebab-case)
```
src/
├── components/            # 순수 UI 컴포넌트
│   ├── button/
│   ├── input/
│   ├── search-input/
│   ├── card/
│   ├── book-thumbnail/
│   ├── tab/
│   ├── pagination/
│   ├── spinner/
│   ├── empty-state/
│   ├── dropdown/
│   └── icons/
├── features/              # 도메인별 기능
│   ├── book-search/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── services/
│   └── favorites/
│       ├── components/
│       ├── hooks/
│       └── store/
├── pages/                 # 페이지 컴포넌트
├── services/              # API 서비스
├── stores/                # Zustand 스토어
├── hooks/                 # 공통 hooks
├── types/                 # TypeScript 타입
└── utils/                 # 유틸리티 함수
```

## 개발 순서

### Phase 1: 환경 설정 ✅
- 프로젝트 초기 설정
- Tailwind CSS v4 설정
- ESLint, Prettier 설정
- Storybook 설정
- 경로 별칭(@) 설정
- vite-plugin-svgr 설정

### Phase 2: UI 컴포넌트 개발 (SVG 디자인 파일 기준)

**모든 컴포넌트는 `.design/elements-detail/` 폴더의 SVG 파일을 기준으로 개발합니다**
**각 컴포넌트 폴더는 index.ts barrel export 파일을 포함합니다**

#### 2.1 Button 컴포넌트
- **디자인 파일**: `.design/elements-detail/Button.svg`
- **위치**: `/components/button/`
- **파일**: `button.tsx`, `button.stories.tsx`, `button.test.tsx`, `index.ts`
- **구현 완료**: 115×48px, 16px 폰트, 디자인 100% 일치

#### 2.2 Header 컴포넌트
- **디자인 파일**: `.design/elements-detail/Header.svg`
- **위치**: `/components/header/`
- **파일**: `header.tsx`, `header.stories.tsx`, `header.test.tsx`, `index.ts`
- **구성**: 로고, 네비게이션 탭

#### 2.3 SearchBox 컴포넌트
- **디자인 파일**: `.design/elements-detail/SearchBox.svg`
- **위치**: `/components/search-box/`
- **파일**: `search-box.tsx`, `search-box.stories.tsx`, `search-box.test.tsx`, `index.ts`
- **구성**: 검색 입력창, 검색 버튼, 상세검색 버튼

#### 2.4 SearchCountText 컴포넌트
- **디자인 파일**: `.design/elements-detail/SearchCountText.svg`
- **위치**: `/components/search-count-text/`
- **파일**: `search-count-text.tsx`, `search-count-text.stories.tsx`, `search-count-text.test.tsx`, `index.ts`
- **구성**: 검색 결과 개수 텍스트

#### 2.5 BookListItem 컴포넌트
- **디자인 파일**: `.design/elements-detail/BookListItem.svg`
- **위치**: `/components/book-list-item/`
- **파일**: `book-list-item.tsx`, `book-list-item.stories.tsx`, `book-list-item.test.tsx`, `index.ts`
- **구성**: 책 정보 카드 (기본 상태)

#### 2.6 BookListItemDetail 컴포넌트
- **디자인 파일**: `.design/elements-detail/BookListItemDetail.svg`
- **위치**: `/components/book-list-item-detail/`
- **파일**: `book-list-item-detail.tsx`, `book-list-item-detail.stories.tsx`, `book-list-item-detail.test.tsx`, `index.ts`
- **구성**: 책 정보 카드 (상세 정보 펼친 상태)

#### 2.7 NoData 컴포넌트
- **디자인 파일**: `.design/elements-detail/N_oData.svg`
- **위치**: `/components/no-data/`
- **파일**: `no-data.tsx`, `no-data.stories.tsx`, `no-data.test.tsx`, `index.ts`
- **구성**: 데이터 없음 표시

#### 2.8 Image 컴포넌트
- **디자인 파일**: `.design/elements-detail/Images.svg`
- **위치**: `/components/image/`
- **파일**: `image.tsx`, `image.stories.tsx`, `image.test.tsx`, `index.ts`
- **특징**:
  - Lazy loading 구현
  - Skeleton UI 표시
  - 이미지 로드 실패 시 fallback

#### 2.9 Icons 컴포넌트
- **위치**: `/components/icons/`
- **구현 완료**:
  - search, heart, heart-filled 아이콘
  - chevron-up, chevron-down, chevron-detail (상세보기용)
  - arrow-left, arrow-right

### Phase 3: 기능 통합 및 페이지 구성

#### 3.1 Book List Container
- **위치**: `/features/book-search/components/book-list/`
- **역할**: BookListItem 컴포넌트들을 관리하는 컨테이너
- **특징**:
  - TanStack Virtual로 가상 스크롤 구현
  - 무한 스크롤 (Intersection Observer)
  - 대량 데이터 렌더링 최적화
  - BookListItem/BookListItemDetail 토글 관리

#### 3.2 Search Filter Popover (상세 검색)
- **위치**: `/features/book-search/components/search-filter/`
- **구성**:
  - SearchBox 아래 팝오버로 표시
  - 검색 대상 드롭다운 (전체, 제목, ISBN, 출판사, 인명)
  - 검색어 입력창
  - 정렬 드롭다운 (정확도순, 최신순)
  - 검색/취소 버튼
- **특징**: 상세검색 버튼 클릭 시 아래로 펼쳐짐

### Phase 4: API 및 상태 관리

#### 4.1 타입 정의
```typescript
// types/book.ts
interface Book {
  title: string
  authors: string[]
  publisher: string
  thumbnail: string
  price: number
  sale_price: number
  isbn: string
  datetime: string
  contents: string
  url: string
  status: string
}

interface SearchResponse {
  meta: {
    total_count: number
    pageable_count: number
    is_end: boolean
  }
  documents: Book[]
}
```

#### 4.2 Kakao API Service
- searchBooks(query, page, size, target, sort)

#### 4.3 Zustand Store
- **searchStore**: 검색 상태 관리
  - 검색어
  - 검색 필터
  - 정렬 옵션
- **favoriteStore**: 찜하기 상태 관리
  - zustand/middleware persist 사용
  - localStorage에 자동 저장/복원
  - 찜한 책 목록 (Book[])
  - 찜하기 토글 메서드

#### 4.4 React Query Hooks
- **useBookSearch**: 책 검색
  - 검색 API 호출
  - 캐싱 및 재시도 로직
- **useInfiniteBookSearch**: 무한 스크롤
  - useInfiniteQuery 사용
  - 페이지네이션 자동 처리
  - TanStack Virtual과 연동

### Phase 5: 페이지 구현

#### 5.1 Main Page
- 탭 네비게이션 (도서 검색 / 내가 찜한 책)
- 검색 페이지
- 찜한 책 페이지

### Phase 6: 통합 및 최적화
1. React Query 설정
2. 에러 처리
3. 로딩 상태
4. 반응형 디자인

## 디자인 시스템 (Style.svg 기준)

### 색상
- Primary: #4880EE (메인 파란색)
- Primary Light: #EAF3FE (연한 파란 배경)
- Error: #E84118 (빨간색)
- Gray Scale:
  - #F2F4F6 (배경)
  - #DADADA (테두리)
  - #8D94A0 (placeholder)
  - #6D7582 (보조 텍스트)
  - #353C49 (진한 텍스트)
  - #222222 (메인 텍스트)

### Typography
- 제목: 18px, 600
- 본문: 14px, 400
- 캡션: 12px, 400

### Spacing
- 컴포넌트 간격: 16px
- 카드 패딩: 16px
- 버튼 패딩: 8px 16px (sm), 12px 24px (md)

## 체크리스트

### 컴포넌트 개발 시
- [ ] TypeScript 타입 정의
- [ ] Props interface 정의
- [ ] Storybook 스토리 작성
- [ ] 단위 테스트 작성
- [ ] 접근성 (키보드 네비게이션)

### 네이밍 규칙
- 파일명: kebab-case
- 컴포넌트명: PascalCase
- Props 타입: ComponentNameProps