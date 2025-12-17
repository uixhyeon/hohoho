## 주요 기능

### 실용 코드 카테고리 (10개)
1. Components - 재사용 가능한 UI 컴포넌트
2. Hooks - Custom React Hooks
3. Utils - 유틸리티 함수
4. API/Services - API 호출 및 서비스 로직
5. Styles/CSS - 스타일 패턴 및 스니펫
6. Animations - 애니메이션 효과
7. Forms - 폼 관련 코드
8. State Management - 상태 관리 패턴
9. Patterns - 디자인 패턴
10. Snippets - 자주 쓰는 코드 조각

### 개념 정리 카테고리 (16개)
- JavaScript, TypeScript, HTML, CSS
- React, Vue, Next.js
- 알고리즘, 자료구조, 디자인 패턴
- Git, Webpack, Vite
- Web API, Browser, Performance

## 기술 스택

- **프론트엔드**: React + Vite
- **백엔드**: Firebase (Firestore)
- **스타일링**: SCSS
- **라우팅**: React Router

## 설치 및 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. Firebase 설정
`.env.example` 파일을 `.env`로 복사하고 Firebase 설정값을 입력하세요:

```bash
cp .env.example .env
```

`.env` 파일:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 3. 개발 서버 실행
```bash
npm run dev
```

### 4. 빌드
```bash
npm run build
```

## Firebase 설정 방법

1. [Firebase Console](https://console.firebase.google.com/)에서 새 프로젝트 생성
2. Firestore Database 활성화
3. 프로젝트 설정에서 웹 앱 추가
4. 설정값을 `.env` 파일에 입력

## 폴더 구조

```
src/
├── components/       # React 컴포넌트
├── pages/           # 페이지 컴포넌트
├── services/        # Firebase 서비스
├── config/          # Firebase 설정
├── constants/       # 상수 (카테고리 등)
├── hooks/           # Custom Hooks
└── styles/          # SCSS 스타일
```

## 사용 방법

1. **카테고리 선택**: 상단 탭에서 원하는 카테고리 선택
2. **새 아카이브 추가**: "+ 새 아카이브" 버튼 클릭
3. **코드 저장**: 제목, 설명, 코드, 태그 입력 후 저장
4. **코드 보기**: 카드에서 "코드 보기" 버튼으로 코드 확인
5. **검색**: 검색창에서 키워드로 아카이브 검색
6. **수정/삭제**: 각 카드의 수정/삭제 버튼 사용

## 라이선스

MIT
