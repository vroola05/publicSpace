set PGPASSWORD=postgresPassword&& psql -h localhost -U postgres -f create_database.sql

set PGPASSWORD=postgresPassword&& psql -h localhost -U postgres -d publicspace -c "CREATE EXTENSION postgis;"
set PGPASSWORD=postgresPassword&& psql -h localhost -U postgres -d publicspace -c "CREATE EXTENSION fuzzystrmatch;"
set PGPASSWORD=postgresPassword&& psql -h localhost -U postgres -d publicspace -c "CREATE EXTENSION pg_trgm;"

set PGPASSWORD=postgresPassword&& psql -h localhost -U postgres -f create_tables.sql

set PGPASSWORD=postgresPassword&& psql -h localhost -U postgres -f create_audit.sql

set PGPASSWORD=postgresPassword&& psql -h localhost -U postgres -f geo.sql


REM Insert required tables
set PGPASSWORD=postgresPassword&& psql -h localhost -U postgres -f insert-static-tables.sql

REM Insert inital domain
set PGPASSWORD=postgresPassword&& psql -h localhost -U postgres -f insert-domain-tables.sql
set PGPASSWORD=postgresPassword&& psql -h localhost -U postgres -f insert-domain-initial-setup-tables.sql

set PGPASSWORD=postgresPassword&& psql -h localhost -U postgres -f insert-locations1.sql
set PGPASSWORD=postgresPassword&& psql -h localhost -U postgres -f insert-locations2.sql
set PGPASSWORD=postgresPassword&& psql -h localhost -U postgres -f insert-locations3.sql
set PGPASSWORD=postgresPassword&& psql -h localhost -U postgres -f insert-locations4.sql
set PGPASSWORD=postgresPassword&& psql -h localhost -U postgres -f insert-locations5.sql
set PGPASSWORD=postgresPassword&& psql -h localhost -U postgres -f insert-locations6.sql
set PGPASSWORD=postgresPassword&& psql -h localhost -U postgres -f insert-locations7.sql
set PGPASSWORD=postgresPassword&& psql -h localhost -U postgres -f insert-locations8.sql
set PGPASSWORD=postgresPassword&& psql -h localhost -U postgres -f insert-locations9.sql

set PGPASSWORD=postgresPassword&& psql -h localhost -U postgres -f insert-test-data.sql
