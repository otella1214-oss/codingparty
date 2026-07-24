import React from "react";
import { ProgramSchedule } from "@/components/ProgramSchedule";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "프로그램 일정 안내 - 광주수학체험센터",
  description: "광주수학체험센터의 월별 교육 프로그램 일정 캘린더 및 대표 프로그램을 상세 안내합니다.",
};

/**
 * 프로그램 일정 페이지 컴포넌트
 */
export default function SchedulePage() {
  return (
    <div className="pb-16 pt-6">
      <ProgramSchedule />
    </div>
  );
}
