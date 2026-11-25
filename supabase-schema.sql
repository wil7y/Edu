-- ════════════════════════════════════════════════════════
-- TechnoEdu — schéma Supabase COMPLET
-- Contient : le schéma de base (profiles + RLS + trigger)
-- + les ajouts nécessaires pour un vrai classement partagé.
-- À coller dans : Dashboard Supabase → SQL Editor → New query → Run
-- ════════════════════════════════════════════════════════

-- ── 1. TABLE DE PROGRESSION (une ligne par utilisateur) ──
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  display_name text,
  xp int default 10,
  streak int default 1,
  last_active_date text default '',
  hearts int default 5,
  hearts_last_regen bigint,
  completed_chapters jsonb default '[]'::jsonb,
  quiz_history jsonb default '[]'::jsonb,
  week_xp int default 0,
  week_start text default '',
  daily_quests_date text default '',
  daily_quests_progress jsonb default '{}'::jsonb,
  active_daily_quest_ids jsonb default '[]'::jsonb,
  weekly_quests_progress jsonb default '{}'::jsonb,
  activity_log jsonb default '{}'::jsonb,
  updated_at timestamptz default now()
);

-- ── 2. ROW LEVEL SECURITY : chacun ne lit/modifie QUE sa propre ligne ──
alter table public.profiles enable row level security;

-- "drop if exists" d'abord : permet de relancer ce script sans erreur
-- même si les policies existent déjà (ex: ce script a déjà tourné une fois).
drop policy if exists "Lecture de son propre profil" on public.profiles;
drop policy if exists "Création de son propre profil" on public.profiles;
drop policy if exists "Mise à jour de son propre profil" on public.profiles;

create policy "Lecture de son propre profil"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Création de son propre profil"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Mise à jour de son propre profil"
  on public.profiles for update
  using (auth.uid() = id);

-- ── 3. Création automatique d'une ligne "profiles" à chaque inscription ──
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name, hearts_last_regen, week_start)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email,'@',1)),
    (extract(epoch from now())*1000)::bigint,
    ''
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ── 4. Index pour accélérer les tris de classement ──
create index if not exists idx_profiles_xp on public.profiles (xp desc);
create index if not exists idx_profiles_week_xp on public.profiles (week_xp desc);

-- ════════════════════════════════════════════════════════
-- 5. CLASSEMENT PUBLIC (nouveau)
-- Une VUE qui n'expose QUE les colonnes nécessaires au
-- classement (jamais l'e-mail ni les données brutes d'auth).
-- Une vue Postgres standard s'exécute avec les droits de son
-- propriétaire : elle peut donc lire toutes les lignes de
-- "profiles" même si la RLS limite chaque utilisateur à sa
-- propre ligne dans une requête directe sur la table.
-- ════════════════════════════════════════════════════════
create or replace view public.leaderboard_view as
select
  id,
  display_name,
  xp,
  week_xp,
  streak,
  -- note moyenne sur l'historique de quiz (note sur 20)
  (
    select avg((q->>'note')::numeric)
    from jsonb_array_elements(quiz_history) q
  ) as avg_note,
  -- vitesse moyenne (secondes par bonne réponse), en ignorant les valeurs sentinelles 999
  (
    select avg((q->>'speed')::numeric)
    from jsonb_array_elements(quiz_history) q
    where (q->>'speed')::numeric < 999
  ) as avg_speed,
  jsonb_array_length(quiz_history) as quiz_count
from public.profiles;

-- Autoriser tout le monde (connecté) à lire cette vue
grant select on public.leaderboard_view to authenticated;

-- Si tu veux aussi un accès anonyme (ex: pour afficher un classement
-- public avant connexion), décommente la ligne suivante :
-- grant select on public.leaderboard_view to anon;