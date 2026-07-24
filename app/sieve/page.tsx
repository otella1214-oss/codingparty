import React from "react";
import { SieveGame } from "@/components/SieveGame";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "에라토스테네스의 체 | EDU_CYBER_LAB",
  description: "사이버펑크 테마로 구현된 에라토스테네스의 체 소수 찾기 게임입니다.",
};

export default function SievePage() {
  return (
    <div className="space-y-8 pb-16 pt-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 font-mono text-sm text-green-400 hover:text-pink-400 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>[SYSTEM_RETURN] 메인 시스템으로 복귀</span>
        </Link>
      </div>

      <SieveGame />
    </div>
  );
}
