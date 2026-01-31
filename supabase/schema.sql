
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Waitlist Table
create table if not exists waitlist (
  id uuid primary key default uuid_generate_v4(),
  email text not null unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Campaigns Table
create table if not exists campaigns (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id),
  title text not null,
  description text,
  status text default 'draft', -- draft, active, archived
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Policies (Basic)
alter table waitlist enable row level security;
alter table campaigns enable row level security;

create policy "Make waitlist insertable by anyone" on waitlist for insert with check (true);
create policy "Users can view own campaigns" on campaigns for select using (auth.uid() = user_id);
create policy "Users can insert own campaigns" on campaigns for insert with check (auth.uid() = user_id);
