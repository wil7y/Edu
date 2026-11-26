-- ════════════════════════════════════════════════════════
-- TechnoEdu — TOUT EN UN : schéma + ligues + bots + cron
-- Un seul copier-coller dans Supabase SQL Editor → Run.
-- Idempotent : le recoller plus tard ne duplique rien (pas de
-- doublons de bots, pas de doublons de tâches cron).
-- ════════════════════════════════════════════════════════

-- ════════════════════════════════════════════════════════
-- TechnoEdu — schéma Supabase
-- À coller dans : Dashboard Supabase → SQL Editor → New query → Run
-- (ce fichier est idempotent : le recoller ne casse rien)
-- ════════════════════════════════════════════════════════

-- Table de progression, une ligne par utilisateur (id = auth.users.id)
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

-- Row Level Security : chaque utilisateur ne voit / modifie QUE sa propre ligne
alter table public.profiles enable row level security;

drop policy if exists "Lecture de son propre profil" on public.profiles;
create policy "Lecture de son propre profil"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "Création de son propre profil" on public.profiles;
create policy "Création de son propre profil"
  on public.profiles for insert
  with check (auth.uid() = id);

drop policy if exists "Mise à jour de son propre profil" on public.profiles;
create policy "Mise à jour de son propre profil"
  on public.profiles for update
  using (auth.uid() = id);

-- Création automatique d'une ligne "profiles" à chaque inscription
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name, hearts_last_regen, week_start)
  values (
    new.id,
    coalesce(
      nullif(new.raw_user_meta_data->>'display_name',''),
      nullif(new.raw_user_meta_data->>'full_name',''),
      nullif(new.raw_user_meta_data->>'name',''),
      nullif(split_part(coalesce(new.email,''),'@',1),''),
      'Apprenant'
    ),
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

-- ════════════════════════════════════════════════════════
-- Vue classement : expose uniquement les colonnes nécessaires
-- au classement (nom, xp, note/vitesse moyennes), à tout le monde.
-- Une vue "normale" (sans security_invoker) tourne avec les droits
-- de son propriétaire : elle contourne donc volontairement le RLS
-- restrictif de "profiles" (qui limite chacun à sa propre ligne),
-- sans jamais exposer les colonnes non listées ici.
-- ════════════════════════════════════════════════════════
create or replace view public.leaderboard_public as
select
  id,
  display_name,
  xp,
  week_xp,
  (select avg((q->>'note')::numeric) from jsonb_array_elements(coalesce(quiz_history,'[]'::jsonb)) q) as avg_note,
  (select avg((q->>'time')::numeric) from jsonb_array_elements(coalesce(quiz_history,'[]'::jsonb)) q) as avg_time
from public.profiles;

grant select on public.leaderboard_public to authenticated;

-- ════════════════════════════════════════════════════════
-- Classement multijoueur : fonction appelée par l'app (sb.rpc('get_leaderboard'))
-- "security definer" = contourne le RLS de "profiles" (chacun ne voit que sa ligne)
-- mais ne renvoie QUE les colonnes du classement : jamais l'e-mail ni les quêtes.
-- ════════════════════════════════════════════════════════
-- drop + create (pas "create or replace") : une exécution antérieure du bloc
-- "bots" plus bas a pu ajouter la colonne is_bot au retour de cette fonction,
-- et Postgres refuse de changer les colonnes de retour avec un simple replace.
drop function if exists public.get_leaderboard();
create function public.get_leaderboard()
returns table (
  id uuid,
  display_name text,
  xp int,
  week_xp int,
  avg_note numeric,
  avg_speed numeric,
  quiz_count int
)
language sql
stable
security definer
set search_path = public
as $$
  select
    p.id,
    p.display_name,
    p.xp,
    p.week_xp,
    (select avg((q->>'note')::numeric)  from jsonb_array_elements(coalesce(p.quiz_history,'[]'::jsonb)) q),
    (select avg((q->>'speed')::numeric) from jsonb_array_elements(coalesce(p.quiz_history,'[]'::jsonb)) q),
    (select count(*)::int               from jsonb_array_elements(coalesce(p.quiz_history,'[]'::jsonb)) q)
  from public.profiles p
  order by p.xp desc
  limit 200;
$$;

revoke all on function public.get_leaderboard() from public;
grant execute on function public.get_leaderboard() to authenticated;


-- ════════════════════════════════════════════════════════
-- AMIS (style Duolingo) : code ami + demandes + classement entre amis
-- ════════════════════════════════════════════════════════
alter table public.profiles add column if not exists friend_code text unique
  default upper(substr(md5(random()::text || clock_timestamp()::text),1,6));
update public.profiles set friend_code = upper(substr(md5(random()::text || id::text),1,6)) where friend_code is null;

create table if not exists public.friendships (
  id uuid primary key default gen_random_uuid(),
  requester uuid not null references auth.users(id) on delete cascade,
  addressee uuid not null references auth.users(id) on delete cascade,
  status text not null default 'pending' check (status in ('pending','accepted')),
  created_at timestamptz default now(),
  unique (requester, addressee)
);
alter table public.friendships enable row level security;
drop policy if exists "Voir ses amitiés" on public.friendships;
create policy "Voir ses amitiés" on public.friendships for select
  using (auth.uid() in (requester, addressee));
-- Pas d'insert/update direct : tout passe par les fonctions ci-dessous.

create or replace function public.send_friend_request(code text)
returns text language plpgsql security definer set search_path = public as $$
declare target uuid; existing public.friendships;
begin
  select id into target from public.profiles where friend_code = upper(trim(code));
  if target is null then return 'Code introuvable.'; end if;
  if target = auth.uid() then return 'C''est ton propre code !'; end if;
  select * into existing from public.friendships
    where (requester = auth.uid() and addressee = target) or (requester = target and addressee = auth.uid());
  if found then
    if existing.status = 'accepted' then return 'Vous êtes déjà amis.'; end if;
    if existing.addressee = auth.uid() then
      update public.friendships set status = 'accepted' where id = existing.id;
      return 'ok:Ami ajouté !';
    end if;
    return 'Demande déjà envoyée.';
  end if;
  insert into public.friendships (requester, addressee) values (auth.uid(), target);
  return 'ok:Demande envoyée !';
end $$;

create or replace function public.respond_friend_request(req_id uuid, accept boolean)
returns void language plpgsql security definer set search_path = public as $$
begin
  if accept then
    update public.friendships set status = 'accepted' where id = req_id and addressee = auth.uid();
  else
    delete from public.friendships where id = req_id and (addressee = auth.uid() or requester = auth.uid());
  end if;
end $$;

create or replace function public.get_friends()
returns table (friendship_id uuid, id uuid, display_name text, status text, incoming boolean,
               xp int, week_xp int, streak int, avg_note numeric)
language sql stable security definer set search_path = public as $$
  select f.id, p.id, p.display_name, f.status, (f.addressee = auth.uid()),
    case when f.status = 'accepted' then p.xp end,
    case when f.status = 'accepted' then p.week_xp end,
    case when f.status = 'accepted' then p.streak end,
    case when f.status = 'accepted' then
      (select avg((q->>'note')::numeric) from jsonb_array_elements(coalesce(p.quiz_history,'[]'::jsonb)) q) end
  from public.friendships f
  join public.profiles p on p.id = case when f.requester = auth.uid() then f.addressee else f.requester end
  where auth.uid() in (f.requester, f.addressee);
$$;

revoke all on function public.send_friend_request(text), public.respond_friend_request(uuid,boolean), public.get_friends() from public;
grant execute on function public.send_friend_request(text), public.respond_friend_request(uuid,boolean), public.get_friends() to authenticated;


-- ════════════════════════════════════════════════════════
-- LIGUES HEBDOMADAIRES (groupes de 30, 5 niveaux) + FICHE JOUEUR
-- ════════════════════════════════════════════════════════
alter table public.profiles add column if not exists league_tier int default 1;

-- drop + create (pas "create or replace") : voir la remarque sur get_leaderboard()
-- plus haut — le bloc "bots" plus bas ajoute la colonne is_bot au retour.
drop function if exists public.get_my_league();
create function public.get_my_league()
returns table (id uuid, display_name text, week_xp int, league_tier int, rank int)
language sql stable security definer set search_path = public as $$
  with g as (
    select p.id, p.display_name, p.week_xp, p.league_tier,
           ((row_number() over (partition by p.league_tier order by p.id) - 1) / 30) as grp
    from public.profiles p
  ), me as (select league_tier, grp from g where g.id = auth.uid())
  select g.id, g.display_name, g.week_xp, g.league_tier,
         (rank() over (order by g.week_xp desc))::int
  from g join me using (league_tier, grp)
  order by 5;
$$;

-- Fin de semaine : top 5 monte (s'ils ont de l'XP), 5 derniers descendent, puis XP remis à 0
create or replace function public.rollover_leagues()
returns void language plpgsql security definer set search_path = public as $$
begin
  with g as (
    select p.id, p.week_xp, p.league_tier,
      row_number() over (partition by p.league_tier, (r.n-1)/30 order by p.week_xp desc) as rk,
      count(*) over (partition by p.league_tier, (r.n-1)/30) as size
    from public.profiles p
    join (select id, row_number() over (partition by league_tier order by id) as n from public.profiles) r on r.id = p.id
  )
  update public.profiles p set league_tier = case
      when g.rk <= 5 and g.week_xp > 0 then least(p.league_tier + 1, 5)
      when g.size >= 10 and g.rk > g.size - 5 then greatest(p.league_tier - 1, 1)
      else p.league_tier end
  from g where g.id = p.id;
  update public.profiles set week_xp = 0;
end $$;
revoke all on function public.rollover_leagues() from public, authenticated;

-- Activation + planification automatiques (idempotent : se relance sans erreur
-- même si tu recolles tout le fichier une seconde fois)
create extension if not exists pg_cron;
do $$
begin
  if not exists (select 1 from cron.job where jobname = 'rollover-leagues') then
    perform cron.schedule('rollover-leagues', '0 0 * * 1', 'select public.rollover_leagues()');
  end if;
end $$;

create or replace function public.get_player_card(pid uuid)
returns jsonb language sql stable security definer set search_path = public as $$
  select jsonb_build_object(
    'name', p.display_name, 'xp', p.xp, 'streak', p.streak,
    'tier', p.league_tier, 'week_xp', p.week_xp,
    'quizzes', coalesce((
      select jsonb_agg(t.q order by t.q->>'date' desc)
      from (select q from jsonb_array_elements(coalesce(p.quiz_history,'[]'::jsonb)) q
            order by q->>'date' desc limit 20) t), '[]'::jsonb))
  from public.profiles p where p.id = pid;
$$;
revoke all on function public.get_my_league(), public.get_player_card(uuid) from public;
grant execute on function public.get_my_league(), public.get_player_card(uuid) to authenticated;


-- ════════════════════════════════════════════════════════
-- TechnoEdu — comptes "Bot" pour peupler les ligues/classements
-- À coller APRÈS supabase-schema.sql dans : Dashboard Supabase →
-- SQL Editor → New query → Run (une seule fois)
--
-- Principe : des profils clairement marqués is_bot = true, affichés
-- avec un badge "B" dans l'app (jamais présentés comme de vrais
-- élèves). Leurs scores évoluent tout seuls via une tâche planifiée
-- (pg_cron) pour que les ligues aient l'air vivantes dès le lancement.
-- ════════════════════════════════════════════════════════

-- 1. Retirer la contrainte de clé étrangère profiles.id → auth.users(id)
--    Les bots n'ont pas de compte auth.users (ils ne se connectent jamais) :
--    on ne peut donc pas leur donner un id qui y référence. Le RLS repose
--    sur auth.uid() = id, pas sur cette FK, donc rien ne casse derrière.
do $$
declare conname text;
begin
  select tc.constraint_name into conname
  from information_schema.table_constraints tc
  join information_schema.key_column_usage kcu
    on tc.constraint_name = kcu.constraint_name and tc.table_schema = kcu.table_schema
  where tc.table_schema='public' and tc.table_name='profiles'
    and tc.constraint_type='FOREIGN KEY' and kcu.column_name='id'
  limit 1;
  if conname is not null then
    execute format('alter table public.profiles drop constraint %I', conname);
  end if;
end $$;

-- 2. Colonne qui marque un profil comme bot
alter table public.profiles add column if not exists is_bot boolean not null default false;

-- 3. Les fonctions RPC existantes doivent renvoyer is_bot pour que le
--    front-end sache afficher le badge. Postgres n'autorise pas de
--    changer la liste des colonnes de retour avec un simple
--    "create or replace" : on les redéfinit donc en DROP + CREATE.

drop function if exists public.get_leaderboard();
create function public.get_leaderboard()
returns table (
  id uuid, display_name text, xp int, week_xp int,
  avg_note numeric, avg_speed numeric, quiz_count int, is_bot boolean
)
language sql stable security definer set search_path = public as $$
  select
    p.id, p.display_name, p.xp, p.week_xp,
    (select avg((q->>'note')::numeric)  from jsonb_array_elements(coalesce(p.quiz_history,'[]'::jsonb)) q),
    (select avg((q->>'speed')::numeric) from jsonb_array_elements(coalesce(p.quiz_history,'[]'::jsonb)) q),
    (select count(*)::int               from jsonb_array_elements(coalesce(p.quiz_history,'[]'::jsonb)) q),
    p.is_bot
  from public.profiles p
  order by p.xp desc
  limit 200;
$$;
revoke all on function public.get_leaderboard() from public;
grant execute on function public.get_leaderboard() to authenticated;

drop function if exists public.get_my_league();
create function public.get_my_league()
returns table (id uuid, display_name text, week_xp int, league_tier int, rank int, is_bot boolean)
language sql stable security definer set search_path = public as $$
  with g as (
    select p.id, p.display_name, p.week_xp, p.league_tier, p.is_bot,
           ((row_number() over (partition by p.league_tier order by p.id) - 1) / 30) as grp
    from public.profiles p
  ), me as (select league_tier, grp from g where g.id = auth.uid())
  select g.id, g.display_name, g.week_xp, g.league_tier,
         (rank() over (order by g.week_xp desc))::int, g.is_bot
  from g join me using (league_tier, grp)
  order by 5;
$$;

drop function if exists public.get_player_card(uuid);
create function public.get_player_card(pid uuid)
returns jsonb language sql stable security definer set search_path = public as $$
  select jsonb_build_object(
    'name', p.display_name, 'xp', p.xp, 'streak', p.streak,
    'tier', p.league_tier, 'week_xp', p.week_xp, 'is_bot', p.is_bot,
    'quizzes', coalesce((
      select jsonb_agg(t.q order by t.q->>'date' desc)
      from (select q from jsonb_array_elements(coalesce(p.quiz_history,'[]'::jsonb)) q
            order by q->>'date' desc limit 20) t), '[]'::jsonb))
  from public.profiles p where p.id = pid;
$$;

revoke all on function public.get_my_league(), public.get_player_card(uuid) from public;
grant execute on function public.get_my_league(), public.get_player_card(uuid) to authenticated;

-- ════════════════════════════════════════════════════════
-- 4. Génération des 150 bots (30 par ligue × 5 ligues)
--    Noms façon "Prénom L." (même style que le repli de démo du front),
--    XP de départ cohérent avec le palier de la ligue, et un petit
--    historique de quiz factice pour que les classements par note/
--    vitesse ne les trahissent pas (profil "vide" = suspect).
-- ════════════════════════════════════════════════════════
-- Protection : si des bots existent déjà, on ne regénère pas les 150
-- profils une seconde fois (évite les doublons si tu recolles ce fichier).
do $$
declare
  first_names text[] := array['Lucas','Emma','Hugo','Chloé','Nathan','Léa','Louis','Manon','Jules','Camille',
    'Adam','Inès','Gabriel','Sarah','Arthur','Jade','Raphaël','Zoé','Léo','Lina',
    'Noah','Nina','Ethan','Lola','Tom','Anna','Mohamed','Sofia','Yanis','Clara',
    'Amir','Louise','Rayan','Rose','Malo','Alice','Enzo','Juliette','Axel','Eva',
    'Yasmine','Oscar','Mila','Samuel','Anaïs'];
  last_initials text[] := array['B','D','F','G','H','K','L','M','N','P','R','S','T','V'];
  disc_keys jsonb := '[
    {"key":"elec|m1|ch1","disc":"Électricité"},
    {"key":"electro|m1|ch1","disc":"Électronique"},
    {"key":"auto|m1|ch1","disc":"Automatisme"},
    {"key":"info|m2|ch1","disc":"Informatique"},
    {"key":"meca|m1|ch1","disc":"Mécanique"}
  ]'::jsonb;
  tier int; i int; j int; fname text; linit text; dname text;
  base_xp int; xp_spread int; week_xp int; streak int;
  qh jsonb; nq int; d jsonb;
  new_id uuid;
begin
  if exists (select 1 from public.profiles where is_bot limit 1) then
    raise notice 'Des bots existent déjà — génération ignorée (pas de doublons).';
    return;
  end if;
  for tier in 1..5 loop
    base_xp := case tier when 1 then 50 when 2 then 300 when 3 then 700 when 4 then 1300 else 2200 end;
    xp_spread := case tier when 1 then 250 when 2 then 400 when 3 then 600 when 4 then 900 else 1800 end;
    for i in 1..30 loop
      fname := first_names[1 + floor(random()*array_length(first_names,1))::int];
      linit := last_initials[1 + floor(random()*array_length(last_initials,1))::int];
      dname := fname || ' ' || linit || '.';
      week_xp := floor(random()*300)::int;
      streak := floor(random()*25)::int;
      new_id := gen_random_uuid();

      -- 3 à 7 quiz factices pour nourrir les moyennes note/vitesse
      nq := 3 + floor(random()*5)::int;
      qh := '[]'::jsonb;
      for j in 1..nq loop
        d := disc_keys -> floor(random()*jsonb_array_length(disc_keys))::int;
        qh := qh || jsonb_build_array(jsonb_build_object(
          'key', d->>'key', 'disc', d->>'disc',
          'note', round((9 + random()*11)::numeric, 1),      -- 9 à 20 /20
          'speed', round((4 + random()*22)::numeric, 1),      -- 4 à 26 s / bonne réponse
          'date', (now() - ((random()*14)::text || ' days')::interval)::text
        ));
      end loop;

      insert into public.profiles (
        id, display_name, xp, streak, week_xp, league_tier,
        quiz_history, is_bot, completed_chapters, hearts
      ) values (
        new_id, dname,
        base_xp + floor(random()*xp_spread)::int,
        streak, week_xp, tier,
        qh, true, '[]'::jsonb, 5
      );
    end loop;
  end loop;
end $$;

-- Vérification rapide :
-- select league_tier, count(*) from public.profiles where is_bot group by 1 order by 1;

-- ════════════════════════════════════════════════════════
-- 5. Faire évoluer les scores des bots dans le temps
--    Toutes les 4h : ~45% des bots gagnent un peu d'XP (comme s'ils
--    avaient fait une leçon), avec parfois un nouveau quiz et un
--    streak qui avance. Garde l'historique à 20 entrées max.
-- ════════════════════════════════════════════════════════
create or replace function public.simulate_bot_activity()
returns void language plpgsql security definer set search_path = public as $$
declare
  disc_keys jsonb := '[
    {"key":"elec|m1|ch1","disc":"Électricité"},
    {"key":"electro|m1|ch1","disc":"Électronique"},
    {"key":"auto|m1|ch1","disc":"Automatisme"},
    {"key":"info|m2|ch1","disc":"Informatique"},
    {"key":"meca|m1|ch1","disc":"Mécanique"}
  ]'::jsonb;
  r record;
  gain int; d jsonb; new_entry jsonb;
begin
  for r in select id, quiz_history from public.profiles where is_bot loop
    if random() < 0.45 then
      gain := 5 + floor(random()*20)::int;
      d := disc_keys -> floor(random()*jsonb_array_length(disc_keys))::int;
      new_entry := jsonb_build_object(
        'key', d->>'key', 'disc', d->>'disc',
        'note', round((9 + random()*11)::numeric, 1),
        'speed', round((4 + random()*22)::numeric, 1),
        'date', now()::text
      );
      update public.profiles p set
        xp = p.xp + gain,
        week_xp = p.week_xp + gain,
        streak = case when random() < 0.3 then p.streak + 1 else p.streak end,
        quiz_history = (
          select coalesce(jsonb_agg(x order by x->>'date' desc),'[]'::jsonb)
          from (
            select x from jsonb_array_elements(coalesce(r.quiz_history,'[]'::jsonb) || jsonb_build_array(new_entry)) x
            order by x->>'date' desc limit 20
          ) t
        )
      where p.id = r.id;
    end if;
  end loop;
end $$;
revoke all on function public.simulate_bot_activity() from public, authenticated;

-- Activation + planification automatiques (toutes les 4h, idempotent :
-- se relance sans erreur même si tu recolles tout le fichier une seconde fois)
create extension if not exists pg_cron;
do $$
begin
  if not exists (select 1 from cron.job where jobname = 'simulate-bot-activity') then
    perform cron.schedule('simulate-bot-activity', '0 */4 * * *', 'select public.simulate_bot_activity()');
  end if;
end $$;


-- ════════════════════════════════════════════════════════
-- TechnoEdu — avis "j'aime / je n'aime pas" sur les questions de quiz
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
