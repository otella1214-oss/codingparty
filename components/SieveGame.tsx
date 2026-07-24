"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Terminal, AlertCircle, CheckCircle2, RotateCcw } from "lucide-react";

type NumberStatus = "default" | "prime" | "crossed" | "animating";

interface NumberItem {
  value: number;
  status: NumberStatus;
}

const MAX_NUMBER = 50;

/**
 * 에라토스테네스의 체 게임 컴포넌트
 * - 순차적으로 소수를 찾아 클릭하고 배수를 지워나가는 시각적 실습 모듈
 */
export const SieveGame: React.FC = () => {
  const [numbers, setNumbers] = useState<NumberItem[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [gameComplete, setGameComplete] = useState<boolean>(false);

  // 게임 초기화
  const initGame = useCallback(() => {
    const initialNumbers: NumberItem[] = [];
    for (let i = 2; i <= MAX_NUMBER; i++) {
      initialNumbers.push({ value: i, status: "default" });
    }
    setNumbers(initialNumbers);
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsProcessing(false);
    setGameComplete(false);
  }, []);

  useEffect(() => {
    initGame();
  }, [initGame]);

  // 다음으로 선택해야 할 예상 소수(가장 작은 default 숫자) 찾기
  const getExpectedPrime = (): number | null => {
    const nextPrime = numbers.find((n) => n.status === "default");
    return nextPrime ? nextPrime.value : null;
  };

  // 숫자 클릭 핸들러
  const handleNumberClick = async (clickedValue: number, currentStatus: NumberStatus) => {
    if (isProcessing || gameComplete) return;
    if (currentStatus !== "default") return;

    const expectedPrime = getExpectedPrime();

    // 1. 오답 처리: 예상되는 소수가 아닌 경우
    if (clickedValue !== expectedPrime) {
      setErrorMsg(`[ERROR] 올바르지 않습니다! ${clickedValue}는 가장 작은 미확인 소수가 아닙니다.`);
      setTimeout(() => setErrorMsg(null), 3000);
      return;
    }

    // 2. 정답 처리: 올바른 소수 클릭 시
    setIsProcessing(true);
    setSuccessMsg(`[SUCCESS] 소수 ${clickedValue} 발견! ${clickedValue}의 배수들을 제거합니다...`);
    
    // 현재 클릭한 숫자를 'prime'으로 변경
    setNumbers((prev) =>
      prev.map((n) => (n.value === clickedValue ? { ...n, status: "prime" } : n))
    );

    // 배수들을 찾아서 애니메이션과 함께 지우기
    const multiplesToCross: number[] = [];
    for (let i = clickedValue * 2; i <= MAX_NUMBER; i += clickedValue) {
      multiplesToCross.push(i);
    }

    // 배수가 없는 경우 (예: 29 이상 소수)
    if (multiplesToCross.length === 0) {
      finishTurn();
      return;
    }

    // 순차적 지우기 애니메이션
    for (let i = 0; i < multiplesToCross.length; i++) {
      const targetValue = multiplesToCross[i];
      await new Promise((resolve) => setTimeout(resolve, 300));
      
      setNumbers((prev) =>
        prev.map((n) => {
          if (n.value === targetValue && n.status === "default") {
            return { ...n, status: "animating" };
          }
          return n;
        })
      );

      await new Promise((resolve) => setTimeout(resolve, 200));

      setNumbers((prev) =>
        prev.map((n) => {
          if (n.value === targetValue && n.status === "animating") {
            return { ...n, status: "crossed" };
          }
          return n;
        })
      );
    }

    finishTurn();
  };

  const finishTurn = () => {
    setIsProcessing(false);
    setTimeout(() => {
      setSuccessMsg(null);
      checkGameCompletion();
    }, 1500);
  };

  const checkGameCompletion = () => {
    setNumbers((prev) => {
      const hasDefault = prev.some((n) => n.status === "default");
      if (!hasDefault && prev.length > 0) {
        setGameComplete(true);
        setSuccessMsg("[SYSTEM INFO] 모든 소수를 찾았습니다! 에라토스테네스의 체 완료.");
      }
      return prev;
    });
  };

  return (
    <div className="mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
      <div className="overflow-hidden rounded-xl border border-green-500/40 bg-black/90 shadow-[0_0_30px_rgba(34,197,94,0.15)] glow-border-green">
        
        {/* 터미널 상단 바 */}
        <div className="flex items-center justify-between border-b border-green-500/30 bg-cyber-card px-4 py-2.5">
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 rounded-full bg-red-500/80" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <div className="h-3 w-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex items-center space-x-2 font-mono text-xs text-green-500/70">
            <Terminal className="h-3.5 w-3.5" />
            <span>root@edu-cyber-lab:~/modules/sieve_of_eratosthenes.exe</span>
          </div>
        </div>

        <div className="p-6 md:p-8 font-mono">
          <h2 className="mb-2 text-2xl font-bold text-white glow-text-green">
            [04] 에라토스테네스의 체
          </h2>
          <p className="mb-6 text-sm text-gray-400">
            가장 작은 소수를 클릭하세요. 선택된 소수의 배수들이 자동으로 제거됩니다. 
            남은 숫자들 중 가장 작은 숫자를 계속해서 클릭하여 {MAX_NUMBER}까지의 모든 소수를 찾아보세요.
          </p>

          {/* 알림 메시지 영역 */}
          <div className="mb-6 min-h-[50px]">
            {errorMsg && (
              <div className="flex items-center space-x-3 rounded-lg border border-red-500/60 bg-red-950/40 p-3 text-red-400 animate-pulse">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <span className="text-sm font-bold">{errorMsg}</span>
              </div>
            )}
            {successMsg && (
              <div className="flex items-center space-x-3 rounded-lg border border-green-500/60 bg-green-950/40 p-3 text-green-400">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                <span className="text-sm font-bold">{successMsg}</span>
              </div>
            )}
          </div>

          {/* 게임 격자(Grid) 영역 */}
          <div className="grid grid-cols-5 gap-3 sm:grid-cols-7 md:grid-cols-10">
            {numbers.map((num) => {
              // 상태별 CSS 스타일 설정
              let tileClasses = "border-gray-700 bg-gray-900/50 text-gray-300 hover:border-green-500/50 hover:bg-green-950/30 cursor-pointer";
              if (num.status === "prime") {
                tileClasses = "border-green-500 bg-green-900/50 text-green-400 glow-border-green glow-text-green font-bold shadow-[0_0_15px_rgba(34,197,94,0.4)] cursor-default";
              } else if (num.status === "animating") {
                tileClasses = "border-pink-500 bg-pink-900/50 text-pink-400 animate-pulse glow-border-pink cursor-default";
              } else if (num.status === "crossed") {
                tileClasses = "border-gray-800 bg-gray-950 text-gray-700 opacity-50 cursor-default line-through";
              }

              return (
                <button
                  key={num.value}
                  onClick={() => handleNumberClick(num.value, num.status)}
                  disabled={isProcessing || num.status !== "default"}
                  className={`flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-lg border-2 text-lg sm:text-xl transition-all duration-300 ${tileClasses}`}
                >
                  {num.value}
                </button>
              );
            })}
          </div>

          {/* 완료 상태 및 재시작 버튼 */}
          {gameComplete && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={initGame}
                className="group flex items-center space-x-2 rounded-lg border border-pink-500 bg-pink-950/50 px-6 py-3 font-bold text-pink-400 transition-all hover:bg-pink-500 hover:text-black glow-border-pink"
              >
                <RotateCcw className="h-5 w-5 group-hover:-rotate-180 transition-transform duration-500" />
                <span>시스템 재부팅 (다시하기)</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
