# 📚 Code Archive

리퀴드텍스트 스타일의 코드 아카이브 - 코드와 메모를 시각적으로 연결하여 학습 내용을 정리하는 React 앱

## ✨ 주요 기능

- **2분할 레이아웃**: 왼쪽에 코드, 오른쪽에 메모
- **라인별 메모**: 특정 코드 라인에 메모를 추가하고 시각적으로 연결
- **Firebase 인증**: 로그인/회원가입으로 개인 아카이브 관리
- **Firestore 저장**: 클라우드에 안전하게 저장
- **검색 기능**: 제목과 카테고리로 빠르게 검색
- **코드 하이라이팅**: 문법 강조 지원
- **카테고리 분류**: React, JavaScript, CSS 등으로 분류

## 🚀 시작하기

### 1. 프로젝트 실행

```bash
cd code-archive
npm run dev
```

브라우저에서 http://localhost:5173 열기

### 2. Firebase 설정 (중요!)

현재는 임시 설정값이 들어있습니다. 실제로 사용하려면 본인의 Firebase 프로젝트가 필요해요.

#### Firebase 프로젝트 만들기

1. https://console.firebase.google.com 접속
2. "프로젝트 추가" 클릭
3. 프로젝트 이름 입력 (예: code-archive)
4. Google 애널리틱스는 선택사항 (안 해도 됨)
5. 프로젝트 생성 완료!

#### Firebase 설정값 가져오기

1. Firebase Console에서 프로젝트 선택
2. 좌측 메뉴에서 ⚙️ (설정) → 프로젝트 설정
3. "내 앱" 섹션에서 웹 앱 추가 (`</>` 아이콘)
4. 앱 닉네임 입력 (예: code-archive-web)
5. "Firebase SDK snippet" → "구성" 선택
6. `firebaseConfig` 객체 복사

#### Authentication 활성화

1. Firebase Console 좌측 메뉴 → Authentication
2. "시작하기" 클릭
3. "Sign-in method" 탭
4. "이메일/비밀번호" 활성화
5. 저장

#### Firestore 데이터베이스 생성

1. Firebase Console 좌측 메뉴 → Firestore Database
2. "데이터베이스 만들기" 클릭
3. "테스트 모드로 시작" 선택 (나중에 규칙 변경 가능)
4. 지역 선택 (asia-northeast3 - 서울 추천)
5. 완료!

#### 설정값 적용

`src/config/firebase.js` 파일을 열고 복사한 설정값으로 교체하세요.

### 3. 사용법

1. **회원가입/로그인**
   - 첫 실행시 이메일로 회원가입
   - 이후 로그인하여 사용

2. **새 아카이브 만들기**
   - "새 아카이브" 버튼 클릭
   - 제목, 카테고리, 설명 입력
   - 코드 작성 화면으로 이동

3. **코드 & 메모 작성**
   - 왼쪽: 코드 입력
   - 특정 라인 클릭 → 오른쪽에서 메모 추가
   - 메모 색상 변경 가능
   - 💾 저장 버튼으로 저장

4. **아카이브 관리**
   - 목록에서 검색, 보기, 수정, 삭제 가능
   - 카테고리별로 정리

## 📦 기술 스택

- **React** - UI 프레임워크
- **Vite** - 빌드 도구
- **Firebase Authentication** - 사용자 인증
- **Firestore** - 데이터베이스
- **React Router** - 페이지 라우팅
- **CodeMirror** - 코드 에디터
- **CSS3** - 스타일링

## 📁 프로젝트 구조

```
code-archive/
├── src/
│   ├── components/       # 재사용 컴포넌트
│   │   └── CodeEditor.jsx    # 코드 에디터 (2분할 레이아웃)
│   ├── pages/           # 페이지 컴포넌트
│   │   ├── Login.jsx        # 로그인/회원가입
│   │   ├── Home.jsx         # 아카이브 목록
│   │   ├── CreateArchive.jsx # 생성/수정
│   │   └── ViewArchive.jsx  # 보기 (읽기 전용)
│   ├── hooks/           # 커스텀 훅
│   │   └── useAuth.js       # 인증 훅
│   ├── config/          # 설정
│   │   └── firebase.js      # Firebase 설정
│   └── App.jsx          # 메인 앱 & 라우팅
└── package.json
```

## 🎯 앞으로 추가할 기능 (학습하면서)

- [ ] 실제 라인 연결 시각화 (SVG 선 개선)
- [ ] 마크다운 지원
- [ ] 코드 복사 버튼
- [ ] 다크모드/라이트모드 토글
- [ ] 태그 기능
- [ ] 내보내기 (PDF, Markdown)
- [ ] 공유 기능

## 💡 학습 포인트

이 프로젝트를 만들면서 배울 수 있는 것들:

1. **React 기본**: 컴포넌트, state, props, hooks
2. **React Router**: 페이지 라우팅, 보호된 라우트
3. **Firebase**: 인증, Firestore CRUD
4. **비동기 처리**: async/await, Promise
5. **레이아웃**: CSS Grid, Flexbox
6. **커스텀 훅**: 재사용 가능한 로직
7. **폼 처리**: 입력, 유효성 검사

## 🐛 문제 해결

### Firebase 에러 발생시
- Firebase 설정값이 올바른지 확인
- Authentication과 Firestore가 활성화되었는지 확인

### 라이브러리 에러 발생시
```bash
rm -rf node_modules
npm install
```

### 포트 충돌시
vite.config.js에서 포트 변경 가능

## 📝 라이센스

학습용 프로젝트입니다. 자유롭게 수정하고 사용하세요!
