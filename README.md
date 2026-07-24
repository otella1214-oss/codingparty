# 🚀 EDU_CYBER_LAB - Next.js 교육용 웹앱 보일러플레이트

> **사이버펑크 해커 테마**로 디자인된 초등/중등/고등 교육용 웹 서비스를 위한 최적의 Next.js App Router 보일러플레이트입니다. Vercel 배포 안정성을 극대화하여 빌드 에러 없이 즉시 배포할 수 있습니다.

---

## 🛠️ 주요 특징

1. **Vercel 배포 준비 완료**: TypeScript 엄격 모드 적용 및 미사용 변수 제로 설정
2. **사이버펑크 디자인**: 완전한 다크 모드(`bg-black`), 형광 그린/마젠타 네온 글루 효과, 터미널 애니메이션
3. **JetBrains Mono 폰트**: 개발자 및 정보 수업에 특화된 가독성 뛰어난 모노스페이스 폰트
4. **확장성 용이**: 선생님과 초보 개발자가 새로운 기능을 쉽게 추가할 수 있도록 상세한 주석 포함

---

## 🚀 빠른 시작 (Local Development)

```bash
# 1. 패키지 설치
npm install

# 2. 개발 서버 실행
npm run dev

# 3. 로컬 확인: http://localhost:3000
```

---

## 📦 Vercel 배포 안내

이 프로젝트는 Vercel 배포에 맞춰 빌드 에러가 발생하지 않도록 완벽히 테스트되었습니다.

```bash
# 빌드 검증 명령어
npm run build
```

---

## 📂 폴더 구조

```text
├── app/
│   ├── globals.css      # 사이버펑크 네온 효과 및 그리드 배경 CSS
│   ├── layout.tsx       # 전체 레이아웃 (JetBrains Mono 폰트, Header, Footer)
│   └── page.tsx         # 메인 페이지
├── components/
│   ├── Navbar.tsx       # 네온 로고 및 네비게이션 헤더
│   ├── Hero.tsx         # 터미널 창 프레임 & 가짜 기능 추가 버튼 메인 세션
│   └── Footer.tsx       # 사이버펑크 하단 푸터 & 시스템 상태
├── tailwind.config.ts   # 사이버펑크 네온 색상 및 키프레임 애니메이션
└── package.json         # 의존성 패키지 명세
```
