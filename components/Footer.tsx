"use client";

import React from "react";
import { Terminal, ExternalLink } from "lucide-react";

/**
 * Footer 컴포넌트
 * - 사이버펑크 해커 스타일 하단 푸터
 * - 카피라이트, 시스템 하트비트, Vercel 바로가기 안내
 */
export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-green-500/30 bg-black py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* 푸터 상단 라인 & 상태 */}
        <div className="flex flex-col items-center justify-between gap-4 border-b border-gray-800 pb-6 sm:flex-row font-mono text-xs">
          <div className="flex items-center space-x-2 text-green-400">
            <Terminal className="h-4 w-4" />
            <span className="font-bold">EDU_CYBER_LAB</span>
            <span className="text-gray-600">|</span>
            <span className="text-gray-400">Educational Web App Boilerplate</span>
          </div>

          <div className="flex items-center space-x-4 text-gray-400">
            <span className="flex items-center space-x-1">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-green-500">HEARTBEAT: OK</span>
            </span>
            <span className="text-gray-600">|</span>
            <span>BUILD: PASSING</span>
          </div>
        </div>

        {/* 푸터 하단 카피라이트 */}
        <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row font-mono text-xs text-gray-500">
          <div>
            © {new Date().getFullYear()} EDU_CYBER_LAB. Designed for Teachers & Students.
          </div>

          <div className="flex items-center space-x-1">
            <span>Built with Next.js & Tailwind CSS for</span>
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-green-400 hover:underline ml-1"
            >
              Vercel Deployment <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
