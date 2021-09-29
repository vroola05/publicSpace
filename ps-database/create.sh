export PGPASSWORD=postgresPassword
psql -h localhost -U postgres -f database.sql

# Insert required tables
psql -h localhost -U postgres -f insert-static-tables.sql

# Insert inital domain
psql -h localhost -U postgres -f insert-domain-tables.sql
psql -h localhost -U postgres -f insert-domain-initial-setup-tables.sql