@REM ###################################################################
@REM # Init 
@REM ###################################################################

set COMPANY_NAME=Regio noord
set COMPANY_CODE=394
set COMPANY_SRID=28992
set COMPANY_CENTER=010100002040710000EB65C4A11977F9400C3883DA1D2B1D41


set HASH_FUNCTION=PBKDF2WithHmacSHA1
set SALT_LENGTH=20
set ITERATION_COUNT=1000
set KEY_LENGTH=512

set DOMAIN_DOMAIN=localhost
set DOMAIN_NAME=Gemeente 1
set DOMAIN_TYPE=Gemeente
set DOMAIN_GROUP_NAME1=Groenvoorziening
set DOMAIN_GROUP_NAME2=Handhaving
set DOMAIN_GROUP_NAME3=Onderhoud

set USER_USERNAME=admin
set USER_PASSWORD=@dm1nistrator
set USER_NAME=Administrator
set USER_EMAIL=fake@this-is-no-organisation.com
set USER_ADMIN=true

set DOMAIN_DOMAIN_CONTR=127.0.0.1
set DOMAIN_NAME_CONTR=Aannemer 1
set DOMAIN_TYPE_CONTR=Aannemer
set DOMAIN_GROUP_NAME1_CONTR=Wegen
set DOMAIN_GROUP_NAME2_CONTR=Groen
set DOMAIN_GROUP_NAME3_CONTR=Water

set USER_USERNAME_CONTR=admin
set USER_PASSWORD_CONTR=@dm1nistrator
set USER_NAME_CONTR=Administrator
set USER_EMAIL_CONTR=fake@this-is-no-contr.organisation.com
set USER_ADMIN_CONTR=false

@REM ###################################################################
@REM # Compile javaclass for password hash
@REM ###################################################################
javac -d sec-class ../ps-backend/src/main/java/org/commonground/ps/backendapi/core/security/SecureHash.java

@REM ###################################################################
@REM ###################################################################
@REM # Scripts
@REM ###################################################################
@REM ###################################################################

set PGPASSWORD=postgresPassword&& psql -h localhost -U postgres -f create_database.sql

set PGPASSWORD=postgresPassword&& psql -h localhost -U postgres -d publicspace -c "CREATE EXTENSION postgis;"
set PGPASSWORD=postgresPassword&& psql -h localhost -U postgres -d publicspace -c "CREATE EXTENSION fuzzystrmatch;"
set PGPASSWORD=postgresPassword&& psql -h localhost -U postgres -d publicspace -c "CREATE EXTENSION pg_trgm;"

set PGPASSWORD=postgresPassword&& psql -h localhost -U postgres -f create_tables.sql

set PGPASSWORD=postgresPassword&& psql -h localhost -U postgres -f create_audit.sql

set PGPASSWORD=postgresPassword&& psql -h localhost -U postgres -f geo.sql

set PGPASSWORD=postgresPassword&& psql -h localhost -U postgres -f create_functions.sql

set PGPASSWORD=postgresPassword&& psql -h localhost -U postgres -f insert-static-tables.sql

set PGPASSWORD=postgresPassword&& psql -h localhost -U postgres -f insert-company-tables.sql -v comany_name="'%COMPANY_NAME%'" -v comany_code="'%COMPANY_CODE%'" -v comany_srid="'%COMPANY_SRID%'" -v comany_center="'%COMPANY_CENTER%'"

@REM ###################################################################
@REM # Add government tables
@REM ###################################################################

FOR /F "delims=" %%G in ('java -cp sec-class org.commonground.ps.backendapi.core.security.SecureHash --function "salt" --password "%USER_PASSWORD%" --hash-function "%HASH_FUNCTION%" --salt-length %SALT_LENGTH% --iteration-count %ITERATION_COUNT% --key-length %KEY_LENGTH%') DO set USER_SALT=%%G
FOR /F "delims=" %%G in ('java -cp sec-class org.commonground.ps.backendapi.core.security.SecureHash --function "password" --password "%USER_PASSWORD%" --hash-function "%HASH_FUNCTION%" --salt-length %SALT_LENGTH% --salt "%USER_SALT%" --iteration-count %ITERATION_COUNT% --key-length %KEY_LENGTH%') DO set USER_PASSWORD_ENCRYPT=%%G

set PGPASSWORD=postgresPassword&& psql -h localhost -U postgres -f insert-domain-tables.sql -v domain_domain="'%DOMAIN_DOMAIN%'" -v domain_name="'%DOMAIN_NAME%'" -v domain_type="'%DOMAIN_TYPE%'" -v domain_group_name1="'%DOMAIN_GROUP_NAME1%'" -v domain_group_name2="'%DOMAIN_GROUP_NAME2%'" -v domain_group_name3="'%DOMAIN_GROUP_NAME3%'"
set PGPASSWORD=postgresPassword&& psql -h localhost -U postgres -f insert-domain-users.sql -v user_username="'%USER_USERNAME%'" -v user_password="'%USER_PASSWORD_ENCRYPT%'" -v user_name="'%USER_NAME%'" -v user_email="'%USER_EMAIL%'" -v user_admin="'%USER_ADMIN%'" -v user_salt="'%USER_SALT%'" -v hash_function="'%HASH_FUNCTION%'" -v iteration_count="'%ITERATION_COUNT%'" -v key_length="'%KEY_LENGTH%'"

set PGPASSWORD=postgresPassword&& psql -h localhost -U postgres -f insert-domain-initial-setup-government-tables.sql


@REM ###################################################################
@REM # Add contractor tables
@REM ###################################################################

FOR /F "delims=" %%G in ('java -cp sec-class org.commonground.ps.backendapi.core.security.SecureHash --function "salt" --password "%USER_PASSWORD_CONTR%" --hash-function "%HASH_FUNCTION%" --salt-length %SALT_LENGTH% --iteration-count %ITERATION_COUNT% --key-length %KEY_LENGTH%') DO set USER_SALT_CONTR=%%G
FOR /F "delims=" %%G in ('java -cp sec-class org.commonground.ps.backendapi.core.security.SecureHash --function "password" --password "%USER_PASSWORD_CONTR%" --hash-function "%HASH_FUNCTION%" --salt-length %SALT_LENGTH% --salt "%USER_SALT_CONTR%" --iteration-count %ITERATION_COUNT% --key-length %KEY_LENGTH%') DO set USER_PASSWORD_ENCRYPT_CONTR=%%G

set PGPASSWORD=postgresPassword&& psql -h localhost -U postgres -f insert-domain-tables.sql -v domain_domain="'%DOMAIN_DOMAIN_CONTR%'" -v domain_name="'%DOMAIN_NAME_CONTR%'" -v domain_type="'%DOMAIN_TYPE_CONTR%'" -v domain_group_name1="'%DOMAIN_GROUP_NAME1_CONTR%'" -v domain_group_name2="'%DOMAIN_GROUP_NAME2_CONTR%'" -v domain_group_name3="'%DOMAIN_GROUP_NAME3_CONTR%'"
set PGPASSWORD=postgresPassword&& psql -h localhost -U postgres -f insert-domain-users.sql -v user_username="'%USER_USERNAME_CONTR%'" -v user_password="'%USER_PASSWORD_ENCRYPT_CONTR%'" -v user_name="'%USER_NAME_CONTR%'" -v user_email="'%USER_EMAIL_CONTR%'" -v user_admin="'%USER_ADMIN_CONTR%'" -v user_salt="'%USER_SALT_CONTR%'" -v hash_function="'%HASH_FUNCTION%'" -v iteration_count="'%ITERATION_COUNT%'" -v key_length="'%KEY_LENGTH%'"

set PGPASSWORD=postgresPassword&& psql -h localhost -U postgres -f insert-domain-initial-setup-contractor-tables.sql

set PGPASSWORD=postgresPassword&& psql -h localhost -U postgres -f insert-locations1.sql
set PGPASSWORD=postgresPassword&& psql -h localhost -U postgres -f insert-locations2.sql
set PGPASSWORD=postgresPassword&& psql -h localhost -U postgres -f insert-locations3.sql
set PGPASSWORD=postgresPassword&& psql -h localhost -U postgres -f insert-locations4.sql
set PGPASSWORD=postgresPassword&& psql -h localhost -U postgres -f insert-locations5.sql
set PGPASSWORD=postgresPassword&& psql -h localhost -U postgres -f insert-locations6.sql
set PGPASSWORD=postgresPassword&& psql -h localhost -U postgres -f insert-locations7.sql
set PGPASSWORD=postgresPassword&& psql -h localhost -U postgres -f insert-locations8.sql
set PGPASSWORD=postgresPassword&& psql -h localhost -U postgres -f insert-locations9.sql

set PGPASSWORD=postgresPassword&& psql -h localhost -U postgres -f insert-test-data.sql -v domain_name="'%DOMAIN_NAME%'" -v domain_name_contr="'%DOMAIN_NAME_CONTR%'" -v domain_group_name1="'%DOMAIN_GROUP_NAME1%'" -v domain_group_name2="'%DOMAIN_GROUP_NAME2%'" -v domain_group_name3="'%DOMAIN_GROUP_NAME3%'" -v domain_group_name1_contr="'%DOMAIN_GROUP_NAME1_CONTR%'" -v domain_group_name2_contr="'%DOMAIN_GROUP_NAME2_CONTR%'" -v domain_group_name3_contr="'%DOMAIN_GROUP_NAME3_CONTR%'"
