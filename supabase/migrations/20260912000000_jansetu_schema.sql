-- SAMVIDA SUPABASE POSTGRESQL SCHEMA & ROW LEVEL SECURITY (RLS)
-- Created for Samvida Indian Government Scheme Navigation Platform

-- 1. SCHEMES TABLE
CREATE TABLE IF NOT EXISTS public.schemes (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    title_hi TEXT,
    title_mr TEXT,
    description TEXT NOT NULL,
    description_hi TEXT,
    description_mr TEXT,
    government_level TEXT NOT NULL CHECK (government_level IN ('Central', 'State')),
    state TEXT,
    district_scope TEXT,
    department TEXT NOT NULL,
    category TEXT NOT NULL,
    benefits TEXT[] NOT NULL DEFAULT '{}',
    minimum_age INT,
    maximum_age INT,
    income_limit_lakhs NUMERIC(5,2),
    eligible_occupations TEXT[] DEFAULT '{}',
    employment_types TEXT[] DEFAULT '{}',
    beneficiary_categories TEXT[] DEFAULT '{}',
    application_process TEXT[] DEFAULT '{}',
    official_url TEXT NOT NULL,
    source_name TEXT NOT NULL,
    source_type TEXT NOT NULL,
    last_verified_at DATE NOT NULL DEFAULT CURRENT_DATE,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS for schemes (Read-only for public, admin write)
ALTER TABLE public.schemes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public schemes are viewable by everyone" 
ON public.schemes FOR SELECT USING (active = true);

-- 2. SCHEME DOCUMENTS TABLE
CREATE TABLE IF NOT EXISTS public.scheme_documents (
    id TEXT PRIMARY KEY,
    scheme_id TEXT REFERENCES public.schemes(id) ON DELETE CASCADE,
    document_name TEXT NOT NULL,
    description TEXT NOT NULL,
    mandatory BOOLEAN NOT NULL DEFAULT TRUE,
    official_guidance_url TEXT,
    how_to_obtain TEXT,
    issuing_authority TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.scheme_documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public scheme documents are viewable by everyone" 
ON public.scheme_documents FOR SELECT USING (true);

-- 3. SCHEME ELIGIBILITY RULES TABLE
CREATE TABLE IF NOT EXISTS public.scheme_eligibility_rules (
    id TEXT PRIMARY KEY,
    scheme_id TEXT REFERENCES public.schemes(id) ON DELETE CASCADE,
    rule_type TEXT NOT NULL,
    operator TEXT NOT NULL,
    value TEXT NOT NULL,
    description TEXT NOT NULL,
    priority INT DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.scheme_eligibility_rules ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public rules viewable by everyone" 
ON public.scheme_eligibility_rules FOR SELECT USING (true);

-- 4. USER PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    age_group TEXT NOT NULL,
    state TEXT NOT NULL,
    district TEXT NOT NULL,
    occupation TEXT NOT NULL,
    income_range TEXT NOT NULL,
    employment_type TEXT NOT NULL,
    family_information JSONB NOT NULL DEFAULT '{}'::jsonb,
    goals TEXT[] DEFAULT '{}',
    preferred_language TEXT DEFAULT 'en',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own user profile" 
ON public.user_profiles FOR ALL 
USING (auth.uid() = user_id);

-- 5. SAVED SCHEMES TABLE
CREATE TABLE IF NOT EXISTS public.saved_schemes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    scheme_id TEXT REFERENCES public.schemes(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(user_id, scheme_id)
);

ALTER TABLE public.saved_schemes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view and manage their own saved schemes" 
ON public.saved_schemes FOR ALL 
USING (auth.uid() = user_id);

-- 6. APPLICATION TRACKER TABLE
CREATE TABLE IF NOT EXISTS public.application_tracker (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    scheme_id TEXT REFERENCES public.schemes(id) ON DELETE CASCADE,
    status TEXT NOT NULL CHECK (status IN ('Planning', 'Documents Required', 'Applied', 'Documents Submitted', 'Under Review', 'Approved', 'Rejected')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.application_tracker ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own application tracker items" 
ON public.application_tracker FOR ALL 
USING (auth.uid() = user_id);

-- 7. REMINDERS TABLE
CREATE TABLE IF NOT EXISTS public.reminders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    scheme_id TEXT REFERENCES public.schemes(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    reminder_date DATE NOT NULL,
    notes TEXT,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.reminders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own reminders" 
ON public.reminders FOR ALL 
USING (auth.uid() = user_id);
