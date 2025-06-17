# 테토/에겐 테스트 웹 애플리케이션

성별을 반영한 테스토스테론/에스트로겐 성향 테스트 애플리케이션입니다.

## 🚀 배포 링크
- **프론트엔드**: Cloudflare Pages
- **백엔드**: Render.com

## 🔧 기술 스택
- **Frontend**: React 18 + Vite + Tailwind CSS
- **Backend**: FastAPI + SQLite
- **Deploy**: Cloudflare Pages + Render.com

## 🏗️ 로컬 개발 환경 설정

### 백엔드 실행
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload

### 프론트엔드 실행
cd frontend
npm install
npm run dev

🚀 배포 방법
1. GitHub 레포지토리 생성

GitHub에서 새 레포지토리 생성
이 코드를 업로드

2. Render.com 백엔드 배포

Render.com 가입 후 로그인
"New Web Service" 선택
GitHub 레포지토리 연결
Root Directory: backend
Build Command: pip install -r requirements.txt
Start Command: uvicorn app.main:app --host 0.0.0.0 --port $PORT

3. Cloudflare Pages 프론트엔드 배포

Cloudflare Pages 가입 후 로그인
"Create a project" 선택
GitHub 레포지토리 연결
Build settings:

Framework preset: React
Build command: cd frontend && npm run build
Build output directory: frontend/dist


Environment variables:

VITE_API_URL: Render.com 백엔드 URL


📱 주요 기능

닉네임 + 성별 입력
친근한 반말 질문 (20개)
INTP 페르소나 결과 분석
모바일 Web Share API
Canvas 기반 결과 이미지 생성
반응형 모바일 UI

🎨 특징

질문 말투: "~이야?" 친근한 반말
결과 말투: INTP 쿨찐병 스타일 + 'ㅋㅋ'
성별 반영: 레전드테토남/녀, 에겐남/녀 등
모바일 최적화: Chrome/Safari 완벽 지원
