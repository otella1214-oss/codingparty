"use client";

import React, { useState } from "react";
import { Terminal, Shield, Menu, X, Cpu } from "lucide-react";

/**
 * Navbar 컴포넌트
 * - 사이버펑크 해커 스타일의 상단 네비게이션 바
 * - 로고, 네비게이션 메뉴, 시스템 연결 상태 표시
 */
export const Navbar: React.FC = () => {
  // 모바일 메뉴 열림/닫힘 상태 관리
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-green-500/30 bg-black/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        
        {/* 1. 사이버펑크 서비스 로고 */}
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-green-500/50 bg-green-950/40 text-green-400 glow-border-green">
            <Terminal className="h-5 w-5 animate-pulse" />
          </div>
          <a href="#" className="flex flex-col">
            <span className="font-mono text-lg font-bold tracking-widest text-green-400 glow-text-green">
              EDU_CYBER_LAB<span className="animate-blink text-pink-500">_</span>
            </span>
            <span className="font-mono text-[10px] tracking-wider text-green-600">
              v1.0.0 // EDU_OS
            </span>
          </a>
        </div>

        {/* 2. 데스크탑 네비게이션 바 메뉴 */}
        <nav className="hidden items-center space-x-8 md:flex">
          <a
            href="#hero"
            className="font-mono text-sm font-medium text-gray-300 transition-colors hover:text-green-400 hover:glow-text-green"
          >
            [01. 메인]
          </a>
          <a
            href="#features"
            className="font-mono text-sm font-medium text-gray-300 transition-colors hover:text-green-400 hover:glow-text-green"
          >
            [02. 모듈]
          </a>
          <a
            href="#about"
            className="font-mono text-sm font-medium text-gray-300 transition-colors hover:text-green-400 hover:glow-text-green"
          >
            [03. 소개]
          </a>
        </nav>

        {/* 3. 우측 상태 표시등 (Vercel Ready / Online Badge) */}
        <div className="hidden items-center space-x-3 sm:flex">
          <div className="flex items-center space-x-2 rounded-full border border-green-500/40 bg-black/60 px-3 py-1 text-xs text-green-400">
            <Cpu className="h-3.5 w-3.5 animate-spin text-green-400" />
            <span className="font-mono">SYSTEM: ONLINE</span>
            <span className="h-2 w-2 rounded-full bg-green-500 animate-ping" />
          </div>
        </div>

        {/* 모바일 전용 토글 버튼 */}
        <div className="flex md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-md border border-green-500/40 p-2 text-green-400 hover:bg-green-950/30"
            aria-label="메뉴 열기"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* 모바일 드롭다운 네비게이션 메뉴 */}
      {isMenuOpen && (
        <div className="border-b border-green-500/30 bg-black/95 px-4 py-4 md:hidden">
          <div className="flex flex-col space-y-4 font-mono text-sm">
            <a
              href="#hero"
              onClick={() => setIsMenuOpen(false)}
              className="text-green-400 hover:text-pink-400"
            >
              &gt; 01. 메인
            </a>
            <a
              href="#features"
              onClick={() => setIsMenuOpen(false)}
              className="text-green-400 hover:text-pink-400"
            >
              &gt; 02. 모듈
            </a>
            <a
              href="#about"
              onClick={() => setIsMenuOpen(false)}
              className="text-green-400 hover:text-pink-400"
            >
              &gt; 03. 소개
            </a>
            <div className="flex items-center space-x-2 pt-2 border-t border-gray-800 text-xs text-green-500">
              <Shield className="h-4 w-4" />
              <span>SECURITY LEVEL: 100%</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
