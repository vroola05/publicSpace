set PGPASSWORD=postgresPassword&& psql -h localhost -U postgres -f database.sql

# Insert required tables
set PGPASSWORD=postgresPassword&& psql -h localhost -U postgres -f insert-static-tables.sql

# Insert inital domain
set PGPASSWORD=postgresPassword&& psql -h localhost -U postgres -f insert-domain-tables.sql
set PGPASSWORD=postgresPassword&& psql -h localhost -U postgres -f insert-domain-initial-setup-tables.sql

set PGPASSWORD=postgresPassword&& psql -h localhost -U postgres -f insert-test-data.sql
