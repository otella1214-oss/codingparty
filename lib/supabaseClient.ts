import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Vercel 빌드 시 환경변수가 없더라도 빌드 오류가 발생하지 않도록 
// 템플릿 기본값(Placeholder)으로 안전하게 초기화합니다.
export const supabase = createClient(
  supabaseUrl || "https://placeholder-url.supabase.co",
  supabaseAnonKey || "placeholder-anon-key"
);

/**
 * Supabase 설정이 로컬 .env.local 또는 배포 환경에 올바르게 적용되어 있는지 검증하는 헬퍼 함수
 */
export const isSupabaseConfigured = (): boolean => {
  return (
    !!supabaseUrl &&
    !!supabaseAnonKey &&
    supabaseUrl !== "https://placeholder-url.supabase.co" &&
    supabaseAnonKey !== "placeholder-anon-key"
  );
};
