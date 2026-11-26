-- ════════════════════════════════════════════════════════
-- TechnoEdu — avis "j'aime / je n'aime pas" sur les questions de quiz
-- À coller APRÈS supabase-schema.sql (et supabase-bots.sql si collé) dans :
-- Dashboard Supabase → SQL Editor → New query → Run (idempotent)
--
-- Chaque élève peut liker ou disliker une question (un seul avis actif
-- par question et par personne ; retaper le même bouton l'annule). Ça
-- sert à repérer les questions mal formulées, ambiguës ou trop dures —
-- à consulter plus tard avec :
--
--   select question_key,
--          count(*) filter (where vote =  1) as likes,
--          count(*) filter (where vote = -1) as dislikes
--   from public.question_feedback
--   group by 1
--   order by dislikes desc;
-- ════════════════════════════════════════════════════════

create table if not exists public.question_feedback (
  question_key text not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  vote smallint not null check (vote in (-1,1)),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  primary key (question_key, user_id)
);

alter table public.question_feedback enable row level security;

drop policy if exists "Voir ses propres avis" on public.question_feedback;
create policy "Voir ses propres avis"
  on public.question_feedback for select
  using (auth.uid() = user_id);

drop policy if exists "Donner son avis" on public.question_feedback;
create policy "Donner son avis"
  on public.question_feedback for insert
  with check (auth.uid() = user_id);

drop policy if exists "Changer son avis" on public.question_feedback;
create policy "Changer son avis"
  on public.question_feedback for update
  using (auth.uid() = user_id);

drop policy if exists "Retirer son avis" on public.question_feedback;
create policy "Retirer son avis"
  on public.question_feedback for delete
  using (auth.uid() = user_id);
