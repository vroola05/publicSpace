\connect publicspace


INSERT INTO public.users (id, domain_id, username, password, name, email, admin, password_salt, password_iteration_count, password_key_length, password_hash_function) VALUES (nextval('public.seq_user_id'), get_last_id('public.seq_domain_id'), :user_username, :user_password, :user_name, :user_email, :user_admin, :user_salt, :iteration_count, :key_length, :hash_function);

INSERT INTO public.user_roles (user_id, role_id) VALUES (get_last_id('public.seq_user_id'), get_role('ROLE_ADMIN'));
INSERT INTO public.user_roles (user_id, role_id) VALUES (get_last_id('public.seq_user_id'), get_role('ROLE_USER'));
