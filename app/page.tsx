import React from "react";
import { Hero } from "@/components/Hero";
import { Terminal, ShieldAlert, FileCode2, ArrowRight } from "lucide-react";

/**
 * Main Home Page 컴포넌트
 * - Hero 세션 및 선생님/학생을 위한 가이드 카드 제공
 * - Vercel 배포 시 빌드 에러가 나지 않도록 타입을 엄격히 준수합니다.
 */
export default function Home() {
  return (
    <div className="space-y-12 pb-16">
      {/* 1. 사이버펑크 터미널 메인 메인 화면 */}
      <Hero />

      {/* 2. 선생님/개발자를 위한 사용 및 기능 추가 방법 세션 */}
      <section id="about" className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-green-500/40 bg-cyber-card p-6 md:p-8">
          
          <div className="mb-6 flex items-center space-x-3 border-b border-gray-800 pb-4">
            <Terminal className="h-6 w-6 text-green-400" />
            <h2 className="font-mono text-xl font-bold text-white">
              [SYSTEM_GUIDE] 교육용 웹앱 확장 가이드
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            
            {/* 가이드 1 */}
            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-center space-x-2 text-pink-400 font-bold text-sm">
                <FileCode2 className="h-4 w-4" />
                <span>1. 새 모듈 컴포넌트 추가</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                <code className="text-green-400 font-bold">components/</code> 폴더에 새로운 <code className="text-pink-300">.tsx</code> 파일(예: QuizModule.tsx)을 생성하고 메인 페이지에 자유롭게 불러와 연결하세요.
              </p>
            </div>

            {/* 가이드 2 */}
            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-center space-x-2 text-green-400 font-bold text-sm">
                <ShieldAlert className="h-4 w-4" />
                <span>2. Vercel 배포 검증</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                터미널에서 <code className="text-green-400 font-bold">npm run build</code> 명령어를 실행하여 타입 에러가 없는지 미리 확인하면 Vercel 배포가 100% 성공합니다.
              </p>
            </div>

          </div>

          {/* 푸시 안내 바 */}
          <div className="mt-8 flex flex-col items-center justify-between rounded-lg border border-green-500/30 bg-green-950/20 p-4 sm:flex-row">
            <span className="font-mono text-xs text-green-400 mb-2 sm:mb-0">
              READY_TO_PUSH: 모든 뼈대 코드가 생성되었습니다. Git 커밋 후 푸시하세요!
            </span>
            <div className="flex items-center space-x-1 font-mono text-xs text-pink-400 font-bold">
              <span>git push origin main</span>
              <ArrowRight className="h-4 w-4 animate-pulse" />
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
