import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// 1. Google Font (JetBrains Mono) 설정 - Vercel 서버 및 빌드 환경 안정성 보장
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

// 2. 검색엔진 최적화(SEO) 및 Vercel 메타데이터 설정
export const metadata: Metadata = {
  title: "EDU_CYBER_LAB - 광주수학체험센터",
  description: "선생님과 학생들이 Vercel을 통해 1초만에 배포할 수 있는 사이버펑크 해커 테마의 교육용 웹앱 보일러플레이트입니다.",
  keywords: ["교육용 웹앱", "Next.js", "TypeScript", "Tailwind CSS", "사이버펑크", "Vercel 배포"],
};

/**
 * RootLayout 컴포넌트
 * - 앱 전체에 공통으로 적용되는 최상위 레이아웃
 * - JetBrains Mono 폰트 및 사이버 격자 배경 적용
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${jetbrainsMono.variable} dark scroll-smooth`}>
      <body className="min-h-screen bg-black text-gray-100 antialiased selection:bg-green-500 selection:text-black">
        {/* 사이버펑크 그리드 배경 패턴 레이어 */}
        <div className="fixed inset-0 bg-cyber-grid pointer-events-none z-0 opacity-40" />

        {/* 최상위 앱 컨테이너 */}
        <div className="relative z-10 flex min-h-screen flex-col justify-between">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
