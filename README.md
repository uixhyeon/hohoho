# Lismy 프로젝트

Vue 3 + Vite 기반의 웹 애플리케이션입니다.

## 🚀 실행 방법

### 1. 의존성 설치
```bash
cd project_start
npm install
```

### 2. 개발 서버 실행
```bash
npm run dev
```

개발 서버가 실행되면 브라우저에서 `http://localhost:5173`으로 접속할 수 있습니다.

### 3. 프로덕션 빌드
```bash
npm run build
```

## 🔧 실행이 안 될 때 해결 방법

### 방법 1: node_modules 삭제 후 재설치
```bash
cd project_start
rm -rf node_modules
rm -f package-lock.json
npm install
npm run dev
```

### 방법 2: npm 캐시 클리어 후 재설치
```bash
cd project_start
npm cache clean --force
rm -rf node_modules
rm -f package-lock.json
npm install
npm run dev
```

### 방법 3: 포트가 이미 사용 중인 경우
기존에 실행 중인 프로세스를 종료하거나, 다른 포트로 실행합니다:
```bash
# 다른 포트로 실행 (예: 3000번 포트)
npm run dev -- --port 3000
```

### 방법 4: Node.js 버전 확인
Node.js 버전이 너무 낮으면 문제가 발생할 수 있습니다:
```bash
node --version
# Node.js 18.x 이상 권장
```

## 📁 프로젝트 구조
```
hohoho/
├── project_start/     # 메인 Vue 프로젝트
│   ├── src/          # 소스 코드
│   ├── public/       # 정적 파일
│   └── package.json  # 프로젝트 설정
└── code-archive/     # 아카이브 코드
```

## 🛠️ 사용 가능한 명령어
```bash
npm run dev      # 개발 서버 실행
npm run build    # 프로덕션 빌드
npm run preview  # 빌드된 파일 미리보기
```
