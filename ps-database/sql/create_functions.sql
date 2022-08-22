\connect publicspace

create or replace function get_role(nname text, OUT identifier integer)
as $$
begin
select r.id into identifier from public.roles r where r.name = nname;
end;
$$
language plpgsql;

create or replace function get_domain_type(nname text, OUT identifier integer)
as $$
begin
select d.id into identifier from public.domain_type d where d.name = nname;
end;
$$
language plpgsql;

create or replace function get_page_type(nname text, OUT identifier integer)
as $$
begin
select p.id into identifier from public.page_type p where p.name = nname;
end;
$$
language plpgsql;

create or replace function get_page_button_type(nname text, OUT identifier integer)
as $$
begin
select p.id into identifier from public.page_button_type p where p.name = nname;
end;
$$
language plpgsql;

create or replace function get_action_type(nname text, OUT identifier integer)
as $$
begin
select a.id into identifier from public.action_type a where a.name = nname;
end;
$$
language plpgsql;

create or replace function get_status_by_name(ddomain_id integer, nname text, OUT identifier integer)
as $$
begin
select s.id into identifier from public.status s where s.domain_id = ddomain_id and s.name = nname;
end;
$$
language plpgsql;

create or replace function get_domain(nname text, OUT identifier integer)
as $$
begin
select d.id into identifier from public.domain d where d.name = nname;
end;
$$
language plpgsql;

create or replace function get_group(nname text, OUT identifier integer)
as $$
begin
select g.id into identifier from public.groups g where g.name = nname;
end;
$$
language plpgsql;

create or replace function get_last_id(_tbl text, OUT identifier integer)
as $$
begin
   execute format('select max(last_value) from %s', _tbl)
   into identifier;
end;
$$
language plpgsql;