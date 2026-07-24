"use client";

import React, { useState } from "react";
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Info, 
  Clock, 
  User, 
  BookOpen, 
  Award,
  Terminal,
  Cpu
} from "lucide-react";

// 프로그램 정보 인터페이스
interface ProgramInfo {
  id: string;
  name: string;
  target: string;
  description: string;
  content: string[];
  color: string; // Tailwind color class prefix (e.g., 'pink', 'cyan')
}

// 일정 이벤트 인터페이스
interface ScheduleEvent {
  id: string;
  date: string; // YYYY-MM-DD
  programId: string;
  time: string;
  location: string;
}

export const ProgramSchedule: React.FC = () => {
  // 현재 보고 있는 연월 상태 (2026년 7월 기본값)
  const [currentDate, setCurrentDate] = useState<Date>(new Date(2026, 6, 24)); // 2026년 7월 (month는 0-indexed)
  const [selectedDate, setSelectedDate] = useState<string>("2026-07-28"); // 기본 선택일

  // 1. 프로그램 정보 데이터
  const programs: ProgramInfo[] = [
    {
      id: "p1",
      name: "초등사고력수학체험교실",
      target: "초등학교 3 ~ 6학년",
      description: "구체물 조작과 퍼즐, 게임을 통해 수학의 기본 원리를 감각적으로 익히고 창의적 문제 해결 능력을 키우는 신나는 체험식 수업입니다.",
      content: [
        "스트링 아트와 기하 도형 만들기",
        "수학 퍼즐과 펜토미노 맞추기",
        "보드게임을 활용한 전략적 컴퓨팅 사고"
      ],
      color: "pink"
    },
    {
      id: "p2",
      name: "수학소프트웨어탐구교실",
      target: "초등 5학년 ~ 중고등학생",
      description: "알지오매스(AlgeoMath) 및 지오지브라(GeoGebra) 등 교육용 수학 소프트웨어를 직접 다루며 기하와 대수학적 대상을 코딩과 기하 도구로 구현해보는 IT 융합 교실입니다.",
      content: [
        "지오지브라를 이용한 정다각형 디자인",
        "알지오매스 블록코딩으로 함수 그래프 그리기",
        "3D 입체도형 단면 탐색 및 모델링"
      ],
      color: "cyan"
    },
    {
      id: "p3",
      name: "수학학습코칭",
      target: "초중고 학생 및 학부모",
      description: "개인별 수학 학습 성향과 취약점을 분석하고 1:1 맞춤형 피드백을 제공하여 자기주도학습 습관과 수학 흥미를 극대화하는 맞춤형 클리닉 코칭입니다.",
      content: [
        "수학 불안감 해소 및 마인드셋 설계",
        "효율적인 오답노트 작성법 및 개념 복습 훈련",
        "개인 학습 스케줄러 설계 및 피드백"
      ],
      color: "yellow"
    },
    {
      id: "p4",
      name: "수학탐구교실",
      target: "중학생 ~ 고등학생",
      description: "교과서에 나오는 수학 개념을 넘어서 수학사 속 역사적 대제들과 실생활 속 수학을 심도 있게 분석하는 토론 및 심화 탐구 수업입니다.",
      content: [
        "황금비와 피보나치 수열의 비밀",
        "암호학(RSA)과 소수의 수학적 의의",
        "실생활 미적분과 인공지능 속 수학 원리"
      ],
      color: "green"
    }
  ];

  // 2. 가상 일정 이벤트 데이터 (2026년 7월 / 8월 / 9월 중심)
  const events: ScheduleEvent[] = [
    // 7월 일정
    { id: "e1", date: "2026-07-25", programId: "p1", time: "10:00 ~ 12:00", location: "체험동 1층 아르키메데스실" },
    { id: "e2", date: "2026-07-28", programId: "p3", time: "14:00 ~ 16:00", location: "체험동 2층 학습코칭룸" },
    { id: "e3", date: "2026-07-29", programId: "p2", time: "15:00 ~ 17:00", location: "본관 3층 정보화탐구실" },
    { id: "e4", date: "2026-07-31", programId: "p4", time: "10:00 ~ 12:30", location: "본관 2층 오일러세미나실" },

    // 8월 일정
    { id: "e5", date: "2026-08-01", programId: "p1", time: "10:00 ~ 12:00", location: "체험동 1층 아르키메데스실" },
    { id: "e6", date: "2026-08-04", programId: "p3", time: "14:00 ~ 16:00", location: "체험동 2층 학습코칭룸" },
    { id: "e7", date: "2026-08-05", programId: "p2", time: "15:00 ~ 17:00", location: "본관 3층 정보화탐구실" },
    { id: "e8", date: "2026-08-08", programId: "p4", time: "10:00 ~ 12:30", location: "본관 2층 오일러세미나실" },
    { id: "e9", date: "2026-08-11", programId: "p3", time: "14:00 ~ 16:00", location: "체험동 2층 학습코칭룸" },
    { id: "e10", date: "2026-08-12", programId: "p1", time: "10:00 ~ 12:00", location: "체험동 1층 아르키메데스실" },
    { id: "e11", date: "2026-08-14", programId: "p4", time: "10:00 ~ 12:30", location: "본관 2층 오일러세미나실" },
    { id: "e12", date: "2026-08-18", programId: "p3", time: "14:00 ~ 16:00", location: "체험동 2층 학습코칭룸" },
    { id: "e13", date: "2026-08-20", programId: "p2", time: "15:00 ~ 17:00", location: "본관 3층 정보화탐구실" },
    { id: "e14", date: "2026-08-22", programId: "p1", time: "10:00 ~ 12:00", location: "체험동 1층 아르키메데스실" },
    { id: "e15", date: "2026-08-26", programId: "p4", time: "10:00 ~ 12:30", location: "본관 2층 오일러세미나실" },

    // 9월 일정
    { id: "e16", date: "2026-09-02", programId: "p2", time: "15:00 ~ 17:00", location: "본관 3층 정보화탐구실" },
    { id: "e17", date: "2026-09-05", programId: "p1", time: "10:00 ~ 12:00", location: "체험동 1층 아르키메데스실" },
    { id: "e18", date: "2026-09-08", programId: "p3", time: "14:00 ~ 16:00", location: "체험동 2층 학습코칭룸" },
    { id: "e19", date: "2026-09-12", programId: "p4", time: "10:00 ~ 12:30", location: "본관 2층 오일러세미나실" }
  ];

  // 캘린더 연월 도우미
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0 ~ 11

  // 이전달 / 다음달 핸들러
  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };
  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // 캘린더 날짜 배치 계산
  const getCalendarDays = () => {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    
    const startDayOfWeek = firstDayOfMonth.getDay(); // 0(일요일) ~ 6(토요일)
    const totalDays = lastDayOfMonth.getDate();

    const daysArray: (Date | null)[] = [];

    // 빈 날짜 채우기 (이전달 몫)
    for (let i = 0; i < startDayOfWeek; i++) {
      daysArray.push(null);
    }

    // 현재달 날짜 채우기
    for (let day = 1; day <= totalDays; day++) {
      daysArray.push(new Date(year, month, day));
    }

    return daysArray;
  };

  const calendarDays = getCalendarDays();

  // 특정 날짜 포맷 (YYYY-MM-DD)
  const formatDateStr = (d: Date): string => {
    const yy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yy}-${mm}-${dd}`;
  };

  // 현재 선택된 날짜의 이벤트 목록
  const selectedDateEvents = events.filter(ev => ev.date === selectedDate);

  // 이벤트에 속한 프로그램 컬러 구하기
  const getProgramBadgeStyle = (progId: string) => {
    const prog = programs.find(p => p.id === progId);
    if (!prog) return "border-gray-500 text-gray-400 bg-gray-900/30";
    
    switch (prog.color) {
      case "pink":
        return "border-pink-500/50 text-pink-400 bg-pink-950/20";
      case "cyan":
        return "border-cyan-500/50 text-cyan-400 bg-cyan-950/20";
      case "yellow":
        return "border-yellow-500/50 text-yellow-400 bg-yellow-950/20";
      case "green":
        return "border-green-500/50 text-green-400 bg-green-950/20";
      default:
        return "border-gray-500 text-gray-400 bg-gray-900/30";
    }
  };

  // 프로그램 정보 헬퍼
  const getProgram = (progId: string) => {
    return programs.find(p => p.id === progId);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 font-mono">
      {/* 타이틀 프레임 */}
      <div className="overflow-hidden rounded-xl border border-green-500/40 bg-black/90 shadow-[0_0_30px_rgba(34,197,94,0.15)] glow-border-green">
        
        {/* 상단 컨트롤 바 */}
        <div className="flex items-center justify-between border-b border-green-500/30 bg-cyber-card px-4 py-2.5">
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 rounded-full bg-red-500/80" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <div className="h-3 w-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex items-center space-x-2 font-mono text-xs text-green-500/70">
            <Terminal className="h-3.5 w-3.5" />
            <span>root@edu-cyber-lab:~/modules/center_schedule_viewer.exe</span>
          </div>
          <div className="flex items-center space-x-1.5 text-[10px] text-gray-500">
            <Cpu className="h-3.5 w-3.5 text-pink-500" />
            <span>SCHEDULER_OS v1.2</span>
          </div>
        </div>

        {/* 본문 */}
        <div className="p-6 md:p-8">
          
          <div className="mb-6 border-b border-gray-800 pb-4">
            <h2 className="text-2xl font-bold text-white glow-text-green">
              [03] 광주수학체험센터 프로그램 일정
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              월별 프로그램을 확인하고 일정을 클릭해 상세 강의실 및 교육 시간을 검토하십시오.
            </p>
          </div>

          {/* 2단 격자 레이아웃 (좌: 캘린더, 우: 상세 일정 확인 및 소개) */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            
            {/* 좌: 캘린더 그리드 영역 */}
            <div className="lg:col-span-7 flex flex-col space-y-4">
              
              {/* 캘린더 헤더 네비게이션 */}
              <div className="flex items-center justify-between rounded-lg border border-gray-800 bg-cyber-card p-3">
                <button
                  onClick={handlePrevMonth}
                  className="rounded border border-green-500/30 p-1.5 text-green-400 hover:border-green-500 hover:bg-green-950/40"
                  aria-label="이전 달"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <div className="flex items-center space-x-2 font-bold text-white sm:text-lg">
                  <CalendarIcon className="h-5 w-5 text-green-400" />
                  <span>{year}년 {month + 1}월</span>
                </div>
                <button
                  onClick={handleNextMonth}
                  className="rounded border border-green-500/30 p-1.5 text-green-400 hover:border-green-500 hover:bg-green-950/40"
                  aria-label="다음 달"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              {/* 달력 본판 */}
              <div className="rounded-xl border border-gray-800 bg-black/60 overflow-hidden">
                {/* 요일 행 */}
                <div className="grid grid-cols-7 border-b border-gray-800 bg-gray-950 text-center py-2 text-xs font-bold">
                  <div className="text-pink-500">일 (SUN)</div>
                  <div className="text-gray-400">월 (MON)</div>
                  <div className="text-gray-400">화 (TUE)</div>
                  <div className="text-gray-400">수 (WED)</div>
                  <div className="text-gray-400">목 (THU)</div>
                  <div className="text-gray-400">금 (FRI)</div>
                  <div className="text-cyan-400">토 (SAT)</div>
                </div>

                {/* 날짜 모눈 */}
                <div className="grid grid-cols-7 auto-rows-[90px] sm:auto-rows-[100px] divide-x divide-y divide-gray-900">
                  {calendarDays.map((day, idx) => {
                    if (!day) {
                      return <div key={`empty-${idx}`} className="bg-gray-950/20" />;
                    }

                    const dateStr = formatDateStr(day);
                    const dayEvents = events.filter(e => e.date === dateStr);
                    const isSelected = selectedDate === dateStr;
                    const isToday = dateStr === "2026-07-24"; // 가상 로컬 날짜 기준 링 표시
                    
                    return (
                      <button
                        key={dateStr}
                        onClick={() => setSelectedDate(dateStr)}
                        className={`p-1.5 sm:p-2 flex flex-col justify-between items-stretch text-left transition-all relative ${
                          isSelected 
                            ? "bg-green-950/25 border-2 border-green-500/80 z-10" 
                            : "hover:bg-gray-900/40"
                        }`}
                      >
                        {/* 날짜 숫자 표시 */}
                        <div className="flex justify-between items-center">
                          <span className={`text-xs font-bold ${
                            day.getDay() === 0 
                              ? "text-pink-500" 
                              : day.getDay() === 6 
                              ? "text-cyan-500" 
                              : "text-gray-300"
                          }`}>
                            {day.getDate()}
                          </span>

                          {/* 오늘 날짜 배지 */}
                          {isToday && (
                            <span className="rounded bg-pink-500 px-1 py-0.5 text-[8px] font-bold text-black animate-pulse">
                              TODAY
                            </span>
                          )}
                        </div>

                        {/* 이 날짜의 이벤트 목록 칩 */}
                        <div className="space-y-1 overflow-hidden mt-1 flex-grow flex flex-col justify-end">
                          {dayEvents.map(ev => {
                            const prog = getProgram(ev.programId);
                            if (!prog) return null;
                            
                            // 컬러 칩
                            let dotColor = "bg-green-500";
                            if (prog.color === "pink") dotColor = "bg-pink-500";
                            if (prog.color === "cyan") dotColor = "bg-cyan-500";
                            if (prog.color === "yellow") dotColor = "bg-yellow-500";

                            return (
                              <div
                                key={ev.id}
                                className={`text-[8px] sm:text-[9px] truncate border rounded px-1 py-0.5 leading-tight flex items-center ${getProgramBadgeStyle(ev.programId)}`}
                                title={prog.name}
                              >
                                <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1 ${dotColor}`} />
                                <span className="truncate">{prog.name}</span>
                              </div>
                            );
                          })}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* 우: 상세 일정 패널 및 소개 */}
            <div className="lg:col-span-5 flex flex-col space-y-6">
              
              {/* 선택된 날짜 상세 일정 */}
              <div className="rounded-xl border border-gray-800 bg-black/60 p-5">
                <div className="mb-4 flex items-center space-x-2 border-b border-gray-800 pb-2 text-pink-400">
                  <Info className="h-4.5 w-4.5" />
                  <h3 className="text-sm font-bold">선택 일정 상세 [SELECTED_DATE_INFO]</h3>
                </div>

                <div className="space-y-4">
                  <div className="text-xs text-gray-400">
                    선택된 날짜: <span className="font-bold text-white text-sm">{selectedDate}</span>
                  </div>

                  {selectedDateEvents.length === 0 ? (
                    <div className="rounded border border-gray-800/80 bg-gray-950/40 p-6 text-center text-xs text-gray-500">
                      이 날짜에는 예약된 체험교실 프로그램이 없습니다. 다른 날짜를 선택하십시오.
                    </div>
                  ) : (
                    selectedDateEvents.map(ev => {
                      const prog = getProgram(ev.programId);
                      if (!prog) return null;

                      return (
                        <div 
                          key={ev.id} 
                          className={`rounded border p-4 space-y-3 transition-all ${
                            prog.color === "pink" ? "border-pink-500/40 bg-pink-950/10" :
                            prog.color === "cyan" ? "border-cyan-500/40 bg-cyan-950/10" :
                            prog.color === "yellow" ? "border-yellow-500/40 bg-yellow-950/10" :
                            "border-green-500/40 bg-green-950/10"
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <h4 className="font-bold text-white text-sm">{prog.name}</h4>
                            <span className={`rounded border px-2 py-0.5 text-[9px] font-bold ${getProgramBadgeStyle(ev.programId)}`}>
                              {prog.target}
                            </span>
                          </div>
                          
                          <div className="space-y-1.5 text-xs text-gray-300">
                            <div className="flex items-center">
                              <Clock className="h-3.5 w-3.5 text-gray-500 mr-1.5 flex-shrink-0" />
                              <span>시간: {ev.time}</span>
                            </div>
                            <div className="flex items-center">
                              <BookOpen className="h-3.5 w-3.5 text-gray-500 mr-1.5 flex-shrink-0" />
                              <span>장소: {ev.location}</span>
                            </div>
                          </div>

                          <p className="text-[11px] text-gray-400 leading-relaxed border-t border-gray-800/60 pt-2">
                            {prog.description}
                          </p>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* 범례 및 안내 문구 */}
              <div className="rounded-lg border border-green-500/20 bg-green-950/5 p-4 text-[10px] sm:text-xs text-gray-400 space-y-2">
                <span className="font-bold text-green-400 block">&gt; 체험센터 안내 범례:</span>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-1.5">
                    <span className="h-2 w-2 rounded-full bg-pink-500" />
                    <span>초등사고력체험교실</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="h-2 w-2 rounded-full bg-cyan-500" />
                    <span>수학소프트웨어탐구교실</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="h-2 w-2 rounded-full bg-yellow-500" />
                    <span>수학학습코칭</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                    <span>수학탐구교실</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* 프로그램 개별 세부 정보 소개 (아래 가로 그리드 카드) */}
          <div className="mt-12 border-t border-gray-800 pt-8">
            <h3 className="mb-6 text-lg font-bold text-white flex items-center space-x-2">
              <Award className="h-5 w-5 text-green-400" />
              <span>[SYSTEM_ARCHIVE] 광주수학체험센터 4대 대표 프로그램 소개</span>
            </h3>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {programs.map(prog => {
                let borderTheme = "border-pink-500/30 hover:border-pink-500/70 hover:shadow-[0_0_15px_rgba(236,72,153,0.15)]";
                let badgeTheme = "text-pink-400 border-pink-500/40 bg-pink-950/20";
                let textTheme = "text-pink-400";
                
                if (prog.color === "cyan") {
                  borderTheme = "border-cyan-500/30 hover:border-cyan-500/70 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)]";
                  badgeTheme = "text-cyan-400 border-cyan-500/40 bg-cyan-950/20";
                  textTheme = "text-cyan-400";
                } else if (prog.color === "yellow") {
                  borderTheme = "border-yellow-500/30 hover:border-yellow-500/70 hover:shadow-[0_0_15px_rgba(234,179,8,0.15)]";
                  badgeTheme = "text-yellow-400 border-yellow-500/40 bg-yellow-950/20";
                  textTheme = "text-yellow-400";
                } else if (prog.color === "green") {
                  borderTheme = "border-green-500/30 hover:border-green-500/70 hover:shadow-[0_0_15px_rgba(34,197,94,0.15)]";
                  badgeTheme = "text-green-400 border-green-500/40 bg-green-950/20";
                  textTheme = "text-green-400";
                }

                return (
                  <div
                    key={prog.id}
                    className={`rounded-xl border bg-cyber-card p-5 flex flex-col justify-between transition-all ${borderTheme}`}
                  >
                    <div>
                      {/* 대상 배지 */}
                      <span className={`inline-block rounded border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider mb-3.5 ${badgeTheme}`}>
                        {prog.target}
                      </span>
                      
                      {/* 프로그램 이름 */}
                      <h4 className="text-base font-bold text-white mb-2 font-sans">
                        {prog.name}
                      </h4>
                      
                      {/* 프로그램 한줄 설명 */}
                      <p className="text-xs text-gray-400 leading-relaxed mb-4">
                        {prog.description}
                      </p>
                    </div>

                    {/* 커리큘럼 아카이브 목록 */}
                    <div className="border-t border-gray-900 pt-3.5 mt-2">
                      <span className={`text-[10px] font-bold block mb-2 ${textTheme}`}>
                        &gt; 주요 학습 커리큘럼
                      </span>
                      <ul className="space-y-1.5 text-[10px] text-gray-300">
                        {prog.content.map((item, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className={`mr-1.5 ${textTheme}`}>-</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
