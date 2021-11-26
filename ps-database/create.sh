export PGPASSWORD=postgresPassword
psql -h localhost -U postgres -f create_database.sql

psql -h localhost -U postgres -d publicspace -c "CREATE EXTENSION postgis;"
psql -h localhost -U postgres -d publicspace -c "CREATE EXTENSION fuzzystrmatch;"

psql -h localhost -U postgres -f create_tables.sql

psql -h localhost -U postgres -f geo.sql

# Insert required tables
psql -h localhost -U postgres -f insert-static-tables.sql

# Insert inital domain
psql -h localhost -U postgres -f insert-domain-tables.sql
psql -h localhost -U postgres -f insert-domain-initial-setup-tables.sql


psql -h localhost -U postgres -f insert-locations1.sql
psql -h localhost -U postgres -f insert-locations2.sql
psql -h localhost -U postgres -f insert-locations3.sql
psql -h localhost -U postgres -f insert-locations4.sql
psql -h localhost -U postgres -f insert-locations5.sql
psql -h localhost -U postgres -f insert-locations6.sql
psql -h localhost -U postgres -f insert-locations7.sql
psql -h localhost -U postgres -f insert-locations8.sql
psql -h localhost -U postgres -f insert-locations9.sql

psql -h localhost -U postgres -f insert-test-data.sql