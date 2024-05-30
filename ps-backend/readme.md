                                            | Wie mag wat
5	"Opdracht aanmaken"             1       | 1: Annuleren  & 2: Opdracht accepteren, Opdracht weigeren, Opdracht gereedmelden
6	"Opdracht accepteren"	        2       | 1: / & 2: Opdracht weigeren, Opdracht gereedmelden
7	"Opdracht weigeren"	            2       | 1: Opdracht afsluiten & 2: /
8	"Opdracht gereedmelden"	        2       | 1: Opdracht afsluiten, Opdracht afkeuren & 2: /
9	"Opdracht afsluiten"	        1       | 1: / & 2: /
10	"Opdracht afkeuren"	            1       | 1: / & 2: Opdracht weigeren, Opdracht gereedmelden
11	"Opdracht annuleren"	        1       | 1: / & 2: /

--------------------------------------

16	"Opdracht tijdelijk opslaan"	2       | 1:  & 2:  Opdracht weigeren, Opdracht gereedmelden
17	"Alle opdrachten afgesloten"	1       | 1:  & 2: 


CREATE USER sonarqube WITH PASSWORD 'qube_sonar_###';
CREATE DATABASE sonarqube OWNER sonarqube;
GRANT ALL PRIVILEGES ON DATABASE sonarqube TO sonarqube;





/docker-entrypoint-initdb.d/13_insert-domain-initial-setup-contr-tables.sql
2024-05-28 23:27:59 ps-database-container  | 2024-05-28 21:27:59.810 UTC [91] ERROR:  null value in column "page_type_id" of relation "page" violates not-null constraint
2024-05-28 23:27:59 ps-database-container  | 2024-05-28 21:27:59.810 UTC [91] DETAIL:  Failing row contains (12, 2, null, Opdracht afhandelen - selecteren, page).
2024-05-28 23:27:59 ps-database-container  | 2024-05-28 21:27:59.810 UTC [91] STATEMENT:  INSERT INTO public.page (id, domain_id, page_type_id, name, layout_type) VALUES (nextval('public.seq_page_id'), get_last_id('public.seq_domain_id'), get_page_type('orderSpecificationSelect'), 'Opdracht afhandelen - selecteren', 'page');
2024-05-28 23:27:59 ps-database-container  | psql:/docker-entrypoint-initdb.d/13_insert-domain-initial-setup-contr-tables.sql:119: ERROR:  null value in column "page_type_id" of relation "page" violates not-null constraint
2024-05-28 23:27:59 ps-database-container  | DETAIL:  Failing row contains (12, 2, null, Opdracht afhandelen - selecteren, page).
2024-05-28 23:28:05 ps-database-container  | 