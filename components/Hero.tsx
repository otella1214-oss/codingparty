"use client";

import React, { useState } from "react";
import { Terminal, PlusCircle, CheckCircle2, Code2, Sparkles, HelpCircle, Laptop, Grid, Database } from "lucide-react";
import Link from "next/link";

/**
 * Hero 컴포넌트 (메인 화면)
 * - 사이버펑크 터미널 창 컨셉의 환영 메인 구역
 * - 선생님 및 학습자를 위한 핵심 문구와 인터랙티브 가짜(Placeholder) 버튼 포함
 */
export const Hero: React.FC = () => {
  // 가짜 버튼 클릭 횟수 및 모달 상태 관리
  const [clickCount, setClickCount] = useState<number>(0);
  const [showNotification, setShowNotification] = useState<boolean>(false);

  // 버튼 클릭 핸들러 (선생님들이 이 함수 안에 원하는 동작을 추가할 수 있습니다)
  const handleAddFeatureClick = () => {
    setClickCount((prev) => prev + 1);
    setShowNotification(true);

    // 3초 후 알림 자동 닫기
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  return (
    <section id="hero" className="relative py-12 md:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
        {/* 1. 터미널 창 스타일 카카오/해커 프레임 */}
        <div className="overflow-hidden rounded-xl border border-green-500/40 bg-black/90 shadow-[0_0_30px_rgba(34,197,94,0.15)] glow-border-green">
          
          {/* 터미널 상단 컨트롤 바 */}
          <div className="flex items-center justify-between border-b border-green-500/30 bg-cyber-card px-4 py-2.5">
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 rounded-full bg-red-500/80" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <div className="h-3 w-3 rounded-full bg-green-500/80" />
            </div>
            <div className="flex items-center space-x-2 font-mono text-xs text-green-500/70">
              <Terminal className="h-3.5 w-3.5" />
              <span>root@edu-cyber-lab:~$ ./init_app.sh</span>
            </div>
            <div className="font-mono text-[10px] text-gray-500">UTF-8</div>
          </div>

          {/* 터미널 본문 세션 */}
          <div className="p-6 md:p-10 font-mono">
            
            {/* 상단 태그 및 Vercel 안정성 배지 */}
            <div className="mb-4 inline-flex items-center space-x-2 rounded-md border border-green-500/30 bg-green-950/30 px-3 py-1 text-xs text-green-400">
              <Sparkles className="h-3.5 w-3.5 text-pink-400" />
              <span>VERCEL BUILD STABILITY: 100% READY</span>
            </div>

            {/* 메인 타이틀: "나만의 교육용 웹앱 만들기" */}
            <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              <span className="text-green-400 glow-text-green">나만의 교육용</span>{" "}
              <br className="hidden sm:inline" />
              <span className="text-pink-500 glow-text-pink">웹앱 만들기</span>
              <span className="animate-blink text-green-400">_</span>
            </h1>

            {/* 서브 설명 문구 */}
            <p className="mb-8 max-w-2xl text-sm leading-relaxed text-gray-300 sm:text-base">
              개발자 및 정보 수업 타겟의 <span className="text-green-400 font-semibold">사이버펑크 미래지향적 보일러플레이트</span>입니다. 
              Vercel 플랫폼에 에러 없이 즉시 배포할 수 있으며, 아래 버튼을 활용하여 교실에서 필요한 다양한 학습 모듈을 확장해 보세요!
            </p>

            {/* 가짜 알림 (버튼 클릭 시 발동) */}
            {showNotification && (
              <div className="mb-6 flex items-center space-x-3 rounded-lg border border-pink-500/60 bg-pink-950/40 p-4 text-pink-300 glow-border-pink">
                <CheckCircle2 className="h-5 w-5 text-pink-400 flex-shrink-0" />
                <div className="text-xs sm:text-sm">
                  <span className="font-bold">[SUCCESS]</span> 새로운 기능 이벤트 실행됨! (누적 클릭 횟수: <span className="text-white font-mono font-bold">{clickCount}</span>회)
                </div>
              </div>
            )}

            {/* 인터랙티브 액션 버튼 (Placeholder 버튼) */}
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              {/* 핵심 필수 요구사항: 에라토스테네스의 체 게임 링크 버튼 */}
              <Link
                href="/sieve"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg border border-green-500 bg-green-950/50 px-6 py-3.5 font-mono text-sm font-semibold text-green-400 transition-all hover:bg-green-500 hover:text-black hover:shadow-[0_0_20px_rgba(34,197,94,0.8)] active:scale-95"
              >
                <PlusCircle className="mr-2 h-4 w-4 transition-transform group-hover:rotate-90" />
                <span>⚡ 에라토스테네스의 체 플레이</span>
              </Link>

              {/* 수학 학습 진도 기록 링크 버튼 */}
              <Link
                href="/math-progress"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg border border-pink-500 bg-pink-950/50 px-6 py-3.5 font-mono text-sm font-semibold text-pink-400 transition-all hover:bg-pink-500 hover:text-black hover:shadow-[0_0_20px_rgba(236,72,153,0.8)] active:scale-95"
              >
                <Database className="mr-2 h-4 w-4 text-pink-400 transition-transform group-hover:scale-110 group-hover:text-black" />
                <span>📊 수학 학습 진도 기록</span>
              </Link>

              {/* 보조 안내 버튼 */}
              <a
                href="#features"
                className="inline-flex items-center justify-center rounded-lg border border-gray-700 bg-gray-900/60 px-6 py-3.5 font-mono text-sm font-medium text-gray-300 transition-all hover:border-gray-500 hover:text-white"
              >
                <Code2 className="mr-2 h-4 w-4 text-green-400" />
                <span>모듈 구조 보기</span>
              </a>
            </div>

            {/* CLI 상태 하단 안내 */}
            <div className="mt-8 border-t border-gray-800/80 pt-4 text-xs text-gray-500">
              <span className="text-green-500">&gt; NOTE:</span> 선생님들은 <code className="text-pink-400">components/Hero.tsx</code> 파일에서 위 버튼의 이벤트를 수정하여 퀴즈, 게임, 과제 제출 기능을 바로 연결할 수 있습니다.
            </div>

          </div>
        </div>

        {/* 2. 교육용 기능 모듈 프리뷰 카드 섹션 */}
        <div id="features" className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          
          {/* 카드 1: 라이브 코딩/실습 모듈 */}
          <div className="rounded-xl border border-green-500/30 bg-cyber-card p-6 transition-all hover:border-green-500/70 hover:shadow-[0_0_15px_rgba(34,197,94,0.2)]">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-green-500/40 bg-green-950/30 text-green-400">
              <Laptop className="h-5 w-5" />
            </div>
            <h3 className="mb-2 font-mono text-lg font-bold text-white">01. 파이썬/JS 코딩 실습</h3>
            <p className="font-mono text-xs text-gray-400 leading-relaxed">
              학생들이 직접 브라우저에서 코드를 작성하고 결과를 터미널 형태로 확인할 수 있는 실습 모듈을 추가해 보세요.
            </p>
          </div>

          {/* 카드 2: 퀴즈 & 게임 모듈 */}
          <div className="rounded-xl border border-pink-500/30 bg-cyber-card p-6 transition-all hover:border-pink-500/70 hover:shadow-[0_0_15px_rgba(236,72,153,0.2)]">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-pink-500/40 bg-pink-950/30 text-pink-400">
              <HelpCircle className="h-5 w-5" />
            </div>
            <h3 className="mb-2 font-mono text-lg font-bold text-white">02. 사이버 퀴즈 엔진</h3>
            <p className="font-mono text-xs text-gray-400 leading-relaxed">
              객관식/주관식 컴퓨팅 사고력 퀴즈를 생성하고 점수를 실시간으로 계산하는 인터랙티브 모듈입니다.
            </p>
          </div>

          {/* 카드 3: Vercel 배포 시스템 */}
          <div className="rounded-xl border border-cyan-500/30 bg-cyber-card p-6 transition-all hover:border-cyan-500/70 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-500/40 bg-cyan-950/30 text-cyan-400">
              <Code2 className="h-5 w-5" />
            </div>
            <h3 className="mb-2 font-mono text-lg font-bold text-white">03. 1초 Vercel 배포</h3>
            <p className="font-mono text-xs text-gray-400 leading-relaxed">
              GitHub 저장소와 연동하여 커밋 후 푸시하면 Vercel에서 즉시 자동으로 최신 웹앱이 배포됩니다.
            </p>
          </div>

          {/* 카드 4: 에라토스테네스의 체 게임 (신규 모듈) */}
          <Link href="/sieve" className="group rounded-xl border border-yellow-500/30 bg-cyber-card p-6 transition-all hover:border-yellow-500/70 hover:shadow-[0_0_15px_rgba(234,179,8,0.2)]">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-yellow-500/40 bg-yellow-950/30 text-yellow-400 group-hover:animate-pulse">
              <Grid className="h-5 w-5" />
            </div>
            <h3 className="mb-2 font-mono text-lg font-bold text-white">04. 에라토스테네스의 체</h3>
            <p className="font-mono text-xs text-gray-400 leading-relaxed">
              가장 작은 소수를 찾아 순차적으로 클릭하며 배수를 지워나가는 시각적 컴퓨팅 사고력 게임입니다.
            </p>
          </Link>

          {/* 카드 5: 수학 학습 진도 기록 (신규 모듈) */}
          <Link href="/math-progress" className="group rounded-xl border border-cyan-500/30 bg-cyber-card p-6 transition-all hover:border-cyan-500/70 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] sm:col-span-2 lg:col-span-1">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-500/40 bg-cyan-950/30 text-cyan-400 group-hover:animate-pulse">
              <Database className="h-5 w-5" />
            </div>
            <h3 className="mb-2 font-mono text-lg font-bold text-white">05. 수학 학습 진도 기록</h3>
            <p className="font-mono text-xs text-gray-400 leading-relaxed">
              학생들의 수학 학습 과목, 단원, 진도율, 학습 시간 및 상태를 Supabase DB에 안전하게 기록하고 대시보드로 확인합니다.
            </p>
          </Link>

        </div>

      </div>
    </section>
  );
};
