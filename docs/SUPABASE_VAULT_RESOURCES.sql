create table if not exists public.vault_resources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subject_code text not null,
  subject_name text not null,
  department text not null,
  semester integer not null check (semester between 1 and 8),
  resource_type text not null check (resource_type in ('NOTES', 'PYQ', 'SYLLABUS')),
  contributor_id uuid not null references auth.users(id) on delete cascade,
  contributor_name text not null,
  contributor_roll text not null default '',
  file_url text not null,
  cloudinary_public_id text not null,
  file_size_bytes bigint not null default 0,
  file_hash text not null unique,
  is_cr_verified boolean not null default false,
  status text not null default 'PENDING' check (status in ('PENDING', 'APPROVED', 'REJECTED')),
  created_at timestamptz not null default now()
);

alter table public.vault_resources enable row level security;

create policy "Anyone can read approved Vault resources"
  on public.vault_resources for select
  using (status = 'APPROVED' or auth.uid() = contributor_id);

create policy "Students can insert their own Vault resources"
  on public.vault_resources for insert
  with check (auth.uid() = contributor_id);

create policy "Contributors can delete their own Vault resources"
  on public.vault_resources for delete
  using (auth.uid() = contributor_id);