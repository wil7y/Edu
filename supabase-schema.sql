-- ════════════════════════════════════════════════════════
-- TechnoEdu — schéma Supabase
-- À coller dans : Dashboard Supabase → SQL Editor → New query → Run
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
create or replace function public.get_leaderboard()
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

create or replace function public.get_my_league()
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
-- Planification (Database → Extensions → activer "pg_cron", puis lancer) :
-- select cron.schedule('rollover-leagues', '0 0 * * 1', 'select public.rollover_leagues()');

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
