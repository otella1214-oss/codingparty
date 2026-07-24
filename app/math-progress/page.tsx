import React from "react";
import { MathProgress } from "@/components/MathProgress";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "수학 학습 진도 기록기 - EDU_CYBER_LAB",
  description: "사이버펑크 테마의 수학 학습 진도 모니터링 시스템입니다. 학습 현황을 Supabase 데이터베이스에 기록하고 추적합니다.",
};

/**
 * 수학 학습 진도 페이지 컴포넌트
 */
export default function MathProgressPage() {
  return (
    <div className="pb-16 pt-6">
      <MathProgress />
    </div>
  );
}
