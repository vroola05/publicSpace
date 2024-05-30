\connect publicspace


INSERT INTO public.users (id, domain_id, username, password, name, email, admin, password_salt, password_iteration_count, password_key_length, password_hash_function) VALUES 
(nextval('public.seq_user_id'), get_last_id('public.seq_domain_id'), 'admin', 'tr7biWf9QzPwHk7zWAjQKugz4FNVbCIqQLzeeCawgsTmZuseL7740yYxNPhdyg+7qI/B2QTlN+YyryJqBYvKAQ==', 'Administrator', 'fake@this-is-no-organisation.com', 'true', 'OqKfRfwYjHwoLNpf8Ks6', '1000', '512', 'PBKDF2WithHmacSHA1');

INSERT INTO public.user_roles (user_id, role_id) VALUES (get_last_id('public.seq_user_id'), get_role('ROLE_ADMIN'));
INSERT INTO public.user_roles (user_id, role_id) VALUES (get_last_id('public.seq_user_id'), get_role('ROLE_USER'));

INSERT INTO public.user_groups (user_id, group_id) VALUES (get_last_id('public.seq_user_id'), get_group('Groenvoorziening'));
INSERT INTO public.user_groups (user_id, group_id) VALUES (get_last_id('public.seq_user_id'), get_group('Handhaving'));
INSERT INTO public.user_groups (user_id, group_id) VALUES (get_last_id('public.seq_user_id'), get_group('Onderhoud'));
