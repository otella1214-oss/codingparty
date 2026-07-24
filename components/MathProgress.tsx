"use client";

import React, { useState, useEffect, useCallback } from "react";
import { 
  Terminal, 
  AlertTriangle, 
  CheckCircle2, 
  PlusCircle, 
  Trash2, 
  Search, 
  RefreshCw, 
  Clock, 
  TrendingUp, 
  BookOpen, 
  User,
  Database,
  FileText,
  AlertCircle,
  Edit2,
  Check,
  X
} from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";

// 수학 학습 기록 인터페이스
interface ProgressRecord {
  id: string;
  created_at: string;
  updated_at: string;
  student_name: string;
  subject: string;
  chapter: string;
  progress_percent: number;
  study_time_minutes: number;
  status: "in_progress" | "completed" | "review_needed";
  notes: string | null;
}

export const MathProgress: React.FC = () => {
  // DB 연동 상태
  const [records, setRecords] = useState<ProgressRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [dbConfigured, setDbConfigured] = useState<boolean>(true);

  // 알림 메시지 상태
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // 폼 입력 필드 상태
  const [studentName, setStudentName] = useState<string>("");
  const [subject, setSubject] = useState<string>("대수학");
  const [chapter, setChapter] = useState<string>("");
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [studyTimeMinutes, setStudyTimeMinutes] = useState<number>(0);
  const [status, setStatus] = useState<"in_progress" | "completed" | "review_needed">("in_progress");
  const [notes, setNotes] = useState<string>("");

  // 필터 및 검색 상태
  const [searchName, setSearchName] = useState<string>("");
  const [filterSubject, setFilterSubject] = useState<string>("ALL");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");

  // 수정 중인 레코드 상태
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingProgress, setEditingProgress] = useState<number>(0);
  const [editingStatus, setEditingStatus] = useState<"in_progress" | "completed" | "review_needed">("in_progress");

  // 과목 프리셋
  const subjectPresets = [
    "기초 산술",
    "대수학 (Algebra)",
    "기하학 (Geometry)",
    "미적분학 (Calculus)",
    "확률과 통계 (Probability & Stats)",
    "이산수학 (Discrete Math)",
    "선형대수학 (Linear Algebra)"
  ];

  // 에러 메시지 알림 헬퍼
  const showError = (msg: string) => {
    setErrorMsg(msg);
    setTimeout(() => setErrorMsg(null), 4000);
  };

  // 성공 메시지 알림 헬퍼
  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  // Supabase 데이터 로드 함수
  const fetchRecords = useCallback(async () => {
    if (!isSupabaseConfigured()) {
      setDbConfigured(false);
      return;
    }
    setDbConfigured(true);
    setIsLoading(true);

    try {
      const { data, error } = await supabase
        .from("math_progress")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      setRecords(data || []);
    } catch (err: any) {
      console.error("데이터 조회 에러:", err);
      showError(`[DB FETCH ERROR] 기록 로딩 실패: ${err.message || err}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 컴포넌트 마운트 시 데이터 조회
  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  // 새로운 기록 추가 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isSupabaseConfigured()) {
      showError("[CONFIG ERROR] Supabase 연결이 구성되지 않았습니다.");
      return;
    }

    if (!studentName.trim()) {
      showError("[VALIDATION ERROR] 학생 이름을 입력해 주세요.");
      return;
    }

    if (!chapter.trim()) {
      showError("[VALIDATION ERROR] 단원명을 입력해 주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase
        .from("math_progress")
        .insert([
          {
            student_name: studentName.trim(),
            subject,
            chapter: chapter.trim(),
            progress_percent: Number(progressPercent),
            study_time_minutes: Number(studyTimeMinutes),
            status,
            notes: notes.trim() || null
          }
        ])
        .select();

      if (error) {
        throw error;
      }

      showSuccess(`[SUCCESS] ${studentName} 학생의 진도 기록이 저장되었습니다!`);
      
      // 입력 폼 초기화 (이름은 연속 입력을 위해 유지, 단원 및 진도율 리셋)
      setChapter("");
      setProgressPercent(0);
      setStudyTimeMinutes(0);
      setStatus("in_progress");
      setNotes("");

      // 데이터 리로드
      fetchRecords();
    } catch (err: any) {
      console.error("기록 추가 에러:", err);
      showError(`[DB INSERT ERROR] 저장 실패: ${err.message || err}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 기록 삭제 핸들러
  const handleDelete = async (id: string) => {
    if (!window.confirm("정말 이 학습 진도 기록을 삭제하시겠습니까?")) {
      return;
    }

    try {
      const { error } = await supabase
        .from("math_progress")
        .delete()
        .eq("id", id);

      if (error) {
        throw error;
      }

      showSuccess("[SYSTEM INFO] 진도 기록이 성공적으로 삭제되었습니다.");
      fetchRecords();
    } catch (err: any) {
      console.error("기록 삭제 에러:", err);
      showError(`[DB DELETE ERROR] 삭제 실패: ${err.message || err}`);
    }
  };

  // 수정 시작 핸들러
  const startEditing = (record: ProgressRecord) => {
    setEditingId(record.id);
    setEditingProgress(record.progress_percent);
    setEditingStatus(record.status);
  };

  // 수정 취소
  const cancelEditing = () => {
    setEditingId(null);
  };

  // 수정 저장 핸들러
  const handleUpdate = async (id: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("math_progress")
        .update({
          progress_percent: Number(editingProgress),
          status: editingStatus
        })
        .eq("id", id);

      if (error) {
        throw error;
      }

      showSuccess("[SYSTEM INFO] 진도 정보가 성공적으로 변경되었습니다.");
      setEditingId(null);
      fetchRecords();
    } catch (err: any) {
      console.error("기록 수정 에러:", err);
      showError(`[DB UPDATE ERROR] 수정 실패: ${err.message || err}`);
    } finally {
      setIsLoading(false);
    }
  };

  // 통계 계산
  const totalMinutes = records.reduce((sum, r) => sum + r.study_time_minutes, 0);
  const totalHours = (totalMinutes / 60).toFixed(1);
  const avgProgress = records.length > 0 
    ? Math.round(records.reduce((sum, r) => sum + r.progress_percent, 0) / records.length)
    : 0;
  const completedCount = records.filter(r => r.status === "completed").length;

  // 필터링 적용된 기록들
  const filteredRecords = records.filter(record => {
    const matchesName = record.student_name.toLowerCase().includes(searchName.toLowerCase());
    const matchesSubject = filterSubject === "ALL" || record.subject === filterSubject;
    const matchesStatus = filterStatus === "ALL" || record.status === filterStatus;
    return matchesName && matchesSubject && matchesStatus;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 font-mono">
      {/* Supabase 설정 오류 경고창 */}
      {!dbConfigured && (
        <div className="mb-8 rounded-xl border border-yellow-500/60 bg-yellow-950/20 p-6 text-yellow-300 shadow-[0_0_15px_rgba(234,179,8,0.1)]">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="mt-0.5 h-6 w-6 text-yellow-400 flex-shrink-0" />
            <div className="space-y-2">
              <h3 className="font-bold text-lg">[CONFIG WARNING] Supabase 연결이 감지되지 않았습니다.</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                로컬 또는 Vercel 환경 설정에 <code className="text-yellow-400">NEXT_PUBLIC_SUPABASE_URL</code>와 <code className="text-yellow-400">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> 환경 변수가 누락되었을 수 있습니다.
              </p>
              <div className="text-xs text-gray-400">
                <p>로컬에서 테스트하려면 프로젝트 루트에 <code className="text-pink-400">.env.local</code> 파일을 생성하고 아래 형식을 기입하세요:</p>
                <pre className="mt-2 rounded bg-black/60 p-3 text-green-400 border border-gray-800">
{`NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 시스템 알림창 */}
      <div className="min-h-[50px] mb-4">
        {errorMsg && (
          <div className="flex items-center space-x-3 rounded-lg border border-red-500/60 bg-red-950/40 p-4 text-red-400 animate-pulse">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <span className="text-sm font-bold">{errorMsg}</span>
          </div>
        )}
        {successMsg && (
          <div className="flex items-center space-x-3 rounded-lg border border-green-500/60 bg-green-950/40 p-4 text-green-400">
            <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
            <span className="text-sm font-bold">{successMsg}</span>
          </div>
        )}
      </div>

      {/* 메인 대시보드 프레임 */}
      <div className="overflow-hidden rounded-xl border border-green-500/40 bg-black/90 shadow-[0_0_30px_rgba(34,197,94,0.15)] glow-border-green">
        
        {/* 터미널 타이틀 바 */}
        <div className="flex items-center justify-between border-b border-green-500/30 bg-cyber-card px-4 py-2.5">
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 rounded-full bg-red-500/80" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <div className="h-3 w-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex items-center space-x-2 font-mono text-xs text-green-500/70">
            <Terminal className="h-3.5 w-3.5" />
            <span>root@edu-cyber-lab:~/modules/math_progress_tracker.exe</span>
          </div>
          <div className="flex items-center space-x-2 text-[10px] text-gray-500">
            <Database className="h-3 w-3 text-green-400" />
            <span>SUPABASE_CONNECTED</span>
          </div>
        </div>

        {/* 메인 콘텐츠 영역 */}
        <div className="p-6 md:p-8">
          <div className="mb-6 flex flex-col justify-between border-b border-gray-800 pb-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-2xl font-bold text-white glow-text-green">
                [05] MATHEMATICS PROGRESS TRACKER
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                수학 학습 진도를 실시간으로 Supabase 데이터베이스에 기록하고 모니터링합니다.
              </p>
            </div>
            <button
              onClick={fetchRecords}
              disabled={isLoading || !dbConfigured}
              className="mt-3 flex items-center justify-center space-x-1.5 rounded border border-green-500/40 bg-green-950/20 px-3 py-1.5 text-xs text-green-400 hover:bg-green-500 hover:text-black transition-all sm:mt-0"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`} />
              <span>새로고침 [REFRESH]</span>
            </button>
          </div>

          {/* 대시보드 통계 카드 */}
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-cyan-500/30 bg-cyan-950/10 p-4">
              <div className="flex items-center justify-between text-cyan-400">
                <span className="text-xs font-bold uppercase tracking-wider">누적 학습 시간</span>
                <Clock className="h-5 w-5" />
              </div>
              <p className="mt-2 text-2xl font-bold text-white">
                {totalHours} <span className="text-xs text-gray-400 font-normal">시간</span>
              </p>
              <div className="text-[10px] text-gray-500 mt-1">총 {totalMinutes}분 학습 기록</div>
            </div>

            <div className="rounded-lg border border-pink-500/30 bg-pink-950/10 p-4">
              <div className="flex items-center justify-between text-pink-400">
                <span className="text-xs font-bold uppercase tracking-wider">평균 진도율</span>
                <TrendingUp className="h-5 w-5" />
              </div>
              <p className="mt-2 text-2xl font-bold text-white">
                {avgProgress} <span className="text-xs text-gray-400 font-normal">%</span>
              </p>
              <div className="relative mt-2 h-1.5 w-full rounded bg-gray-800 overflow-hidden">
                <div 
                  className="h-full bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.5)] transition-all duration-500" 
                  style={{ width: `${avgProgress}%` }}
                />
              </div>
            </div>

            <div className="rounded-lg border border-green-500/30 bg-green-950/10 p-4">
              <div className="flex items-center justify-between text-green-400">
                <span className="text-xs font-bold uppercase tracking-wider">완료된 단원</span>
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <p className="mt-2 text-2xl font-bold text-white">
                {completedCount} / {records.length} <span className="text-xs text-gray-400 font-normal">개</span>
              </p>
              <div className="text-[10px] text-gray-500 mt-1">완료율: {records.length > 0 ? Math.round((completedCount / records.length) * 100) : 0}%</div>
            </div>
          </div>

          {/* 메인 2단 격자 (좌: 폼, 우: 테이블 리스트) */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            
            {/* 좌측: 기록 입력 폼 */}
            <div className="lg:col-span-4 rounded-xl border border-gray-800 bg-black/60 p-5">
              <div className="mb-4 flex items-center space-x-2 border-b border-gray-800 pb-2 text-green-400">
                <PlusCircle className="h-4 w-4" />
                <h3 className="text-sm font-bold">진도 기록 입력 [INPUT_FORM]</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* 학생 이름 */}
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5 flex items-center">
                    <User className="h-3.5 w-3.5 text-green-400 mr-1" />
                    학생 이름
                  </label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="이름 입력 (예: 홍길동)"
                    required
                    className="w-full rounded border border-gray-800 bg-gray-900/50 p-2 text-sm text-white placeholder-gray-600 focus:border-green-500 focus:outline-none transition-colors"
                  />
                </div>

                {/* 과목 분류 */}
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5 flex items-center">
                    <BookOpen className="h-3.5 w-3.5 text-green-400 mr-1" />
                    수학 과목 분류
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full rounded border border-gray-800 bg-gray-900/50 p-2 text-sm text-white focus:border-green-500 focus:outline-none transition-colors"
                  >
                    {subjectPresets.map((preset) => (
                      <option key={preset} value={preset} className="bg-black text-white">
                        {preset}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 단원명 */}
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5 flex items-center">
                    <FileText className="h-3.5 w-3.5 text-green-400 mr-1" />
                    단원명
                  </label>
                  <input
                    type="text"
                    value={chapter}
                    onChange={(e) => setChapter(e.target.value)}
                    placeholder="단원명 (예: 일차방정식의 풀이)"
                    required
                    className="w-full rounded border border-gray-800 bg-gray-900/50 p-2 text-sm text-white placeholder-gray-600 focus:border-green-500 focus:outline-none transition-colors"
                  />
                </div>

                {/* 진도율 슬라이더 & 숫자 입력 */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-gray-400">진도율 (%)</label>
                    <span className="text-xs font-bold text-pink-400">{progressPercent}%</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={progressPercent}
                      onChange={(e) => setProgressPercent(Number(e.target.value))}
                      className="h-1.5 w-full cursor-pointer appearance-none rounded bg-gray-800 accent-pink-500"
                    />
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={progressPercent}
                      onChange={(e) => setProgressPercent(Math.min(100, Math.max(0, Number(e.target.value))))}
                      className="w-16 rounded border border-gray-800 bg-gray-900/50 p-1 text-center text-xs text-white focus:border-green-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* 학습 시간 (분) */}
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5 flex items-center">
                    <Clock className="h-3.5 w-3.5 text-green-400 mr-1" />
                    학습 시간 (분)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={studyTimeMinutes}
                    onChange={(e) => setStudyTimeMinutes(Math.max(0, Number(e.target.value)))}
                    className="w-full rounded border border-gray-800 bg-gray-900/50 p-2 text-sm text-white focus:border-green-500 focus:outline-none transition-colors"
                  />
                </div>

                {/* 학습 상태 */}
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5">학습 상태</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setStatus("in_progress")}
                      className={`rounded py-2 text-xs font-semibold border transition-all ${
                        status === "in_progress"
                          ? "border-cyan-500 bg-cyan-950/40 text-cyan-400 glow-border-cyan"
                          : "border-gray-800 bg-transparent text-gray-400 hover:border-gray-700"
                      }`}
                    >
                      진행 중
                    </button>
                    <button
                      type="button"
                      onClick={() => setStatus("completed")}
                      className={`rounded py-2 text-xs font-semibold border transition-all ${
                        status === "completed"
                          ? "border-green-500 bg-green-950/40 text-green-400 glow-border-green"
                          : "border-gray-800 bg-transparent text-gray-400 hover:border-gray-700"
                      }`}
                    >
                      완료
                    </button>
                    <button
                      type="button"
                      onClick={() => setStatus("review_needed")}
                      className={`rounded py-2 text-xs font-semibold border transition-all ${
                        status === "review_needed"
                          ? "border-pink-500 bg-pink-950/40 text-pink-400 glow-border-pink"
                          : "border-gray-800 bg-transparent text-gray-400 hover:border-gray-700"
                      }`}
                    >
                      복습 필요
                    </button>
                  </div>
                </div>

                {/* 학습 메모 */}
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5">학습 메모 / 특이사항</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="메모를 입력하세요..."
                    rows={3}
                    className="w-full rounded border border-gray-800 bg-gray-900/50 p-2 text-sm text-white placeholder-gray-600 focus:border-green-500 focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* 제출 버튼 */}
                <button
                  type="submit"
                  disabled={isSubmitting || !dbConfigured}
                  className="w-full group relative inline-flex items-center justify-center overflow-hidden rounded bg-green-500 py-3 font-semibold text-black transition-all hover:bg-green-400 hover:shadow-[0_0_20px_rgba(34,197,94,0.6)] active:scale-98 disabled:opacity-50 disabled:pointer-events-none"
                >
                  <PlusCircle className="mr-1.5 h-4.5 w-4.5" />
                  <span>진도 저장 [SAVE_RECORD]</span>
                </button>
              </form>
            </div>

            {/* 우측: 기록 필터링 및 리스트 */}
            <div className="lg:col-span-8 flex flex-col space-y-4">
              
              {/* 필터 조절 바 */}
              <div className="rounded-lg border border-gray-800 bg-black/40 p-4">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {/* 검색어 */}
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                    <input
                      type="text"
                      value={searchName}
                      onChange={(e) => setSearchName(e.target.value)}
                      placeholder="학생 이름 검색..."
                      className="w-full rounded border border-gray-800 bg-gray-900/40 py-2 pl-9 pr-3 text-xs text-white placeholder-gray-600 focus:border-green-500 focus:outline-none"
                    />
                  </div>

                  {/* 과목 필터 */}
                  <select
                    value={filterSubject}
                    onChange={(e) => setFilterSubject(e.target.value)}
                    className="w-full rounded border border-gray-800 bg-gray-900/40 p-2 text-xs text-white focus:border-green-500 focus:outline-none"
                  >
                    <option value="ALL">모든 과목 필터</option>
                    {subjectPresets.map((preset) => (
                      <option key={preset} value={preset} className="bg-black">
                        {preset}
                      </option>
                    ))}
                  </select>

                  {/* 상태 필터 */}
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full rounded border border-gray-800 bg-gray-900/40 p-2 text-xs text-white focus:border-green-500 focus:outline-none"
                  >
                    <option value="ALL">모든 상태 필터</option>
                    <option value="in_progress">진행 중</option>
                    <option value="completed">완료</option>
                    <option value="review_needed">복습 필요</option>
                  </select>
                </div>
              </div>

              {/* 기록 테이블 */}
              <div className="flex-grow rounded-xl border border-gray-800 bg-black/60 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-left text-xs">
                    <thead>
                      <tr className="border-b border-gray-800 bg-cyber-card text-gray-400 font-bold uppercase tracking-wider">
                        <th className="p-3">학생</th>
                        <th className="p-3">과목 / 단원</th>
                        <th className="p-3 text-center">학습시간</th>
                        <th className="p-3 text-center">진도율</th>
                        <th className="p-3 text-center">상태</th>
                        <th className="p-3 text-center">액션</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-900 text-gray-300">
                      {isLoading ? (
                        <tr>
                          <td colSpan={6} className="p-8 text-center text-gray-500">
                            <RefreshCw className="mx-auto h-6 w-6 animate-spin text-green-400 mb-2" />
                            <span>데이터베이스 통신 중...</span>
                          </td>
                        </tr>
                      ) : filteredRecords.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="p-8 text-center text-gray-500">
                            <span>등록된 진도 기록이 없습니다.</span>
                          </td>
                        </tr>
                      ) : (
                        filteredRecords.map((record) => {
                          const isEditing = editingId === record.id;

                          return (
                            <tr key={record.id} className="hover:bg-green-950/10 transition-colors">
                              {/* 학생 이름 */}
                              <td className="p-3 font-semibold text-white">
                                {record.student_name}
                              </td>

                              {/* 과목 및 단원 */}
                              <td className="p-3">
                                <div className="text-cyan-400 font-bold text-[10px]">{record.subject}</div>
                                <div className="text-white text-sm mt-0.5">{record.chapter}</div>
                                {record.notes && (
                                  <div className="text-gray-500 italic text-[10px] mt-1 line-clamp-1 hover:line-clamp-none max-w-xs transition-all">
                                    * {record.notes}
                                  </div>
                                )}
                              </td>

                              {/* 학습 시간 */}
                              <td className="p-3 text-center font-bold text-gray-200">
                                {record.study_time_minutes}분
                              </td>

                              {/* 진도율 */}
                              <td className="p-3 text-center">
                                {isEditing ? (
                                  <div className="flex flex-col items-center space-y-1">
                                    <input
                                      type="number"
                                      min="0"
                                      max="100"
                                      value={editingProgress}
                                      onChange={(e) => setEditingProgress(Math.min(100, Math.max(0, Number(e.target.value))))}
                                      className="w-14 rounded border border-green-500 bg-black p-1 text-center text-xs text-white"
                                    />
                                    <input
                                      type="range"
                                      min="0"
                                      max="100"
                                      value={editingProgress}
                                      onChange={(e) => setEditingProgress(Number(e.target.value))}
                                      className="w-16 h-1 accent-pink-500 cursor-pointer"
                                    />
                                  </div>
                                ) : (
                                  <div className="flex flex-col items-center">
                                    <span className="font-bold text-pink-400 mb-1">{record.progress_percent}%</span>
                                    <div className="h-1.5 w-16 rounded bg-gray-800 overflow-hidden">
                                      <div 
                                        className="h-full bg-pink-500" 
                                        style={{ width: `${record.progress_percent}%` }}
                                      />
                                    </div>
                                  </div>
                                )}
                              </td>

                              {/* 상태 */}
                              <td className="p-3 text-center">
                                {isEditing ? (
                                  <select
                                    value={editingStatus}
                                    onChange={(e) => setEditingStatus(e.target.value as any)}
                                    className="rounded border border-green-500 bg-black p-1 text-xs text-white focus:outline-none"
                                  >
                                    <option value="in_progress">진행 중</option>
                                    <option value="completed">완료</option>
                                    <option value="review_needed">복습 필요</option>
                                  </select>
                                ) : (
                                  (() => {
                                    let badgeStyle = "border-cyan-500 text-cyan-400 bg-cyan-950/20";
                                    let statusText = "진행 중";
                                    if (record.status === "completed") {
                                      badgeStyle = "border-green-500 text-green-400 bg-green-950/20";
                                      statusText = "완료";
                                    } else if (record.status === "review_needed") {
                                      badgeStyle = "border-pink-500 text-pink-400 bg-pink-950/20";
                                      statusText = "복습 필요";
                                    }
                                    return (
                                      <span className={`inline-block rounded border px-2 py-0.5 text-[10px] font-bold ${badgeStyle}`}>
                                        {statusText}
                                      </span>
                                    );
                                  })()
                                )}
                              </td>

                              {/* 액션 버튼 */}
                              <td className="p-3 text-center">
                                <div className="flex items-center justify-center space-x-2">
                                  {isEditing ? (
                                    <>
                                      <button
                                        onClick={() => handleUpdate(record.id)}
                                        className="rounded border border-green-500 bg-green-950/30 p-1 text-green-400 hover:bg-green-500 hover:text-black"
                                        title="저장"
                                      >
                                        <Check className="h-3.5 w-3.5" />
                                      </button>
                                      <button
                                        onClick={cancelEditing}
                                        className="rounded border border-gray-700 bg-gray-900/30 p-1 text-gray-400 hover:bg-gray-700 hover:text-white"
                                        title="취소"
                                      >
                                        <X className="h-3.5 w-3.5" />
                                      </button>
                                    </>
                                  ) : (
                                    <>
                                      <button
                                        onClick={() => startEditing(record)}
                                        className="rounded border border-gray-800 bg-gray-900/40 p-1 text-gray-400 hover:border-cyan-500 hover:text-cyan-400 transition-colors"
                                        title="수정"
                                      >
                                        <Edit2 className="h-3.5 w-3.5" />
                                      </button>
                                      <button
                                        onClick={() => handleDelete(record.id)}
                                        className="rounded border border-gray-800 bg-gray-900/40 p-1 text-gray-400 hover:border-pink-500 hover:text-pink-400 transition-colors"
                                        title="삭제"
                                      >
                                        <Trash2 className="h-3.5 w-3.5" />
                                      </button>
                                    </>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
