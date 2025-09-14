# CDRI Books 프로젝트 구현 계획

## 프로젝트 개요
카카오 도서 검색 API를 사용한 책 검색 서비스

### 핵심 기능
- 도서 검색 (검색어 입력)
- 검색 결과 리스트 표시
- 페이지네이션
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

### Phase 2: 순수 UI 컴포넌트 개발 (Bottom-up)

**모든 컴포넌트 폴더는 index.ts barrel export 파일을 포함합니다**

#### 2.1 Icons (SVG 아이콘 컴포넌트)
- **위치**: `/components/icons/`
- **필요한 아이콘** (디자인 파일 기준):
  ```
  /components/icons/
    ├── search.tsx         # 돋보기 아이콘
    ├── heart.tsx          # 빈 하트
    ├── heart-filled.tsx   # 채워진 하트
    ├── arrow-left.tsx     # 페이지네이션 이전
    ├── arrow-right.tsx    # 페이지네이션 다음
    └── index.ts
  ```

#### 2.2 Button 컴포넌트
- **위치**: `/components/button/`
- **파일**: `button.tsx`, `button.stories.tsx`, `button.test.tsx`
- **Props**:
  - children: React.ReactNode
  - variant: 'primary' | 'outline'
  - size: 'sm' | 'md' | 'full'
  - disabled: boolean
  - onClick: () => void
  - className: string (optional)
- **디자인 파일 기준 변형**:
  - Primary 파란 버튼 (구매하기)
  - Outline 테두리 버튼 (상세보기)
  - 검색 버튼

#### 2.3 Input 컴포넌트
- **위치**: `/components/input/`
- **파일**: `input.tsx`, `input.stories.tsx`, `input.test.tsx`
- **Props**:
  - value: string
  - onChange: (value: string) => void
  - placeholder: string
  - disabled: boolean
  - onEnter: () => void (optional)
  - className: string (optional)
- **스타일**: 디자인 파일 기준 회색 테두리, 둥근 모서리

#### 2.4 Search Input 컴포넌트
- **위치**: `/components/search-input/`
- **파일**: `search-input.tsx`, `search-input.stories.tsx`, `search-input.test.tsx`
- **Props**:
  - value: string
  - onChange: (value: string) => void
  - onSearch: () => void
  - placeholder: string
- **구성**: Input + 돋보기 아이콘

#### 2.5 Card 컴포넌트
- **위치**: `/components/card/`
- **파일**: `card.tsx`, `card.stories.tsx`, `card.test.tsx`
- **Props**:
  - children: React.ReactNode
  - className: string (optional)
- **스타일**: 흰색 배경, 그림자, 둥근 모서리

#### 2.6 Book Thumbnail 컴포넌트
- **위치**: `/components/book-thumbnail/`
- **파일**: `book-thumbnail.tsx`, `book-thumbnail.stories.tsx`, `book-thumbnail.test.tsx`
- **Props**:
  - src: string
  - alt: string
  - className: string (optional)
- **스타일**: 고정 비율, fallback 이미지

#### 2.7 Tab 컴포넌트
- **위치**: `/components/tab/`
- **파일**: `tab.tsx`, `tab.stories.tsx`, `tab.test.tsx`
- **Props**:
  - tabs: Array<{ id: string; label: string }>
  - activeTab: string
  - onTabChange: (id: string) => void
- **스타일**: 하단 보더 활성화 표시 (디자인 파일 기준)

#### 2.8 Pagination 컴포넌트
- **위치**: `/components/pagination/`
- **파일**: `pagination.tsx`, `pagination.stories.tsx`, `pagination.test.tsx`
- **Props**:
  - currentPage: number
  - totalPages: number
  - onPageChange: (page: number) => void
- **구성**: 이전/다음 화살표, 페이지 번호

#### 2.9 Spinner 컴포넌트
- **위치**: `/components/spinner/`
- **파일**: `spinner.tsx`, `spinner.stories.tsx`, `spinner.test.tsx`
- **Props**:
  - size: 'sm' | 'md' | 'lg'
  - className: string (optional)

#### 2.10 Empty State 컴포넌트
- **위치**: `/components/empty-state/`
- **파일**: `empty-state.tsx`, `empty-state.stories.tsx`, `empty-state.test.tsx`
- **Props**:
  - title: string
  - description: string
  - icon: React.ReactNode
- **사용**: 검색 결과 없음, 찜한 책 없음

#### 2.11 Dropdown 컴포넌트 (상세 검색용)
- **위치**: `/components/dropdown/`
- **파일**: `dropdown.tsx`, `dropdown.stories.tsx`, `dropdown.test.tsx`
- **Props**:
  - options: Array<{ value: string; label: string }>
  - value: string
  - onChange: (value: string) => void
  - placeholder: string

#### 2.12 Popover 컴포넌트
- **위치**: `/components/popover/`
- **파일**: `popover.tsx`, `popover.stories.tsx`, `popover.test.tsx`
- **Props**:
  - isOpen: boolean
  - onClose: () => void
  - children: React.ReactNode
  - trigger: React.ReactNode
  - placement: 'bottom' | 'top' (default: 'bottom')
- **특징**: 트리거 요소 아래/위에 팝오버 표시

### Phase 3: 도메인 컴포넌트 개발

#### 3.1 Book Card 컴포넌트
- **위치**: `/features/book-search/components/book-card/`
- **구성** (디자인 파일 기준):
  - 책 썸네일 (왼쪽)
  - 책 정보 (오른쪽):
    - 제목
    - 저자
    - 출판사
    - 정가/할인가
  - 하트 아이콘 (우측 상단)
  - 구매하기/상세보기 버튼 (하단)

#### 3.2 Book List 컴포넌트
- **위치**: `/features/book-search/components/book-list/`
- **구성**: BookCard 리스트 (세로 나열)
- **특징**:
  - TanStack Virtual로 가상 스크롤 구현
  - 무한 스크롤 (Intersection Observer)
  - 대량 데이터 렌더링 최적화

#### 3.3 Search Bar 컴포넌트
- **위치**: `/features/book-search/components/search-bar/`
- **구성**:
  - SearchInput
  - 검색 버튼
  - 상세검색 버튼

#### 3.4 Search Filter Popover (상세 검색)
- **위치**: `/features/book-search/components/search-filter/`
- **구성** (디자인 파일 기준):
  - 검색창 아래 팝오버로 표시
  - 검색 대상 드롭다운 (전체, 제목, ISBN, 출판사, 인명)
  - 검색어 입력창
  - 정렬 드롭다운 (정확도순, 최신순)
  - 검색/취소 버튼
- **특징**: 상세검색 버튼 클릭 시 아래로 펼쳐짐

#### 3.5 Favorite Button 컴포넌트
- **위치**: `/features/favorites/components/favorite-button/`
- **구성**: Heart/HeartFilled 아이콘 토글

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