-- 1. 수학 학습 진도 기록 테이블 생성
CREATE TABLE IF NOT EXISTS public.math_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    student_name TEXT NOT NULL,
    subject TEXT NOT NULL,
    chapter TEXT NOT NULL,
    progress_percent INTEGER NOT NULL CHECK (progress_percent >= 0 AND progress_percent <= 100),
    study_time_minutes INTEGER NOT NULL DEFAULT 0 CHECK (study_time_minutes >= 0),
    status TEXT NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'review_needed')),
    notes TEXT
);

-- 2. updated_at 자동 업데이트를 위한 트리거 함수 설정
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 3. 테이블에 트리거 적용
CREATE OR REPLACE TRIGGER trigger_math_progress_updated_at
    BEFORE UPDATE ON public.math_progress
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- 4. 행 레벨 보안 (RLS) 활성화
ALTER TABLE public.math_progress ENABLE ROW LEVEL SECURITY;

-- 5. 누구든지 조회(Select), 추가(Insert), 수정(Update), 삭제(Delete)할 수 있는 전체 공개 RLS 정책 수립
-- 교육용 실습 및 간이 토이 프로젝트이므로 누구나 접근 가능하게 설정합니다.
CREATE POLICY "Allow public select access" ON public.math_progress
    FOR SELECT USING (true);

CREATE POLICY "Allow public insert access" ON public.math_progress
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update access" ON public.math_progress
    FOR UPDATE USING (true);

CREATE POLICY "Allow public delete access" ON public.math_progress
    FOR DELETE USING (true);
