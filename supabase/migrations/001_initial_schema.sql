-- Users (extends Supabase auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique not null,
  display_name text,
  bio text,
  avatar_url text,
  location text,
  theme text default 'midnight',
  is_pro boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Social Links
create table public.socials (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles on delete cascade not null,
  platform text not null,
  url text not null,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- Quick Links (Linktree-style)
create table public.links (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles on delete cascade not null,
  title text not null,
  url text not null,
  icon text,
  is_active boolean default true,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- Portfolio Items
create table public.portfolio_items (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles on delete cascade not null,
  title text not null,
  description text,
  image_url text not null,
  external_url text,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- Page Views (simple analytics)
create table public.page_views (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles on delete cascade not null,
  viewed_at timestamptz default now(),
  referrer text,
  country text
);

-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.socials enable row level security;
alter table public.links enable row level security;
alter table public.portfolio_items enable row level security;
alter table public.page_views enable row level security;

-- RLS Policies
-- Profiles: public read, owner write
create policy "Public profiles are viewable by everyone"
  on public.profiles for select using (true);

create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert with check (auth.uid() = id);

-- Socials: public read, owner write
create policy "Public read socials"
  on public.socials for select using (true);

create policy "Owner insert socials"
  on public.socials for insert with check (auth.uid() = user_id);

create policy "Owner update socials"
  on public.socials for update using (auth.uid() = user_id);

create policy "Owner delete socials"
  on public.socials for delete using (auth.uid() = user_id);

-- Links: public read, owner write
create policy "Public read links"
  on public.links for select using (true);

create policy "Owner insert links"
  on public.links for insert with check (auth.uid() = user_id);

create policy "Owner update links"
  on public.links for update using (auth.uid() = user_id);

create policy "Owner delete links"
  on public.links for delete using (auth.uid() = user_id);

-- Portfolio: public read, owner write
create policy "Public read portfolio"
  on public.portfolio_items for select using (true);

create policy "Owner insert portfolio"
  on public.portfolio_items for insert with check (auth.uid() = user_id);

create policy "Owner update portfolio"
  on public.portfolio_items for update using (auth.uid() = user_id);

create policy "Owner delete portfolio"
  on public.portfolio_items for delete using (auth.uid() = user_id);

-- Page views: owner read, anyone insert
create policy "Owner read views"
  on public.page_views for select using (auth.uid() = user_id);

create policy "Anyone can log view"
  on public.page_views for insert with check (true);

-- Create storage buckets
insert into storage.buckets (id, name, public) values ('avatars', 'avatars', true);
insert into storage.buckets (id, name, public) values ('portfolio', 'portfolio', true);

-- Storage policies
create policy "Anyone can view avatars"
  on storage.objects for select using (bucket_id = 'avatars');

create policy "Authenticated users can upload avatars"
  on storage.objects for insert with check (
    bucket_id = 'avatars' and auth.role() = 'authenticated'
  );

create policy "Users can update own avatars"
  on storage.objects for update using (
    bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "Anyone can view portfolio images"
  on storage.objects for select using (bucket_id = 'portfolio');

create policy "Authenticated users can upload portfolio images"
  on storage.objects for insert with check (
    bucket_id = 'portfolio' and auth.role() = 'authenticated'
  );

create policy "Users can update own portfolio images"
  on storage.objects for update using (
    bucket_id = 'portfolio' and auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "Users can delete own portfolio images"
  on storage.objects for delete using (
    bucket_id = 'portfolio' and auth.uid()::text = (storage.foldername(name))[1]
  );

-- Function to update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger on_profile_updated
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();
