#!/bin/bash
export PGPASSWORD=postgresPassword
psql -h localhost -U postgres -f create_database.sql

###################################################################
# Compile javaclass for password hash
###################################################################



###################################################################
# Init 
###################################################################

COMPANY_NAME="Regio noord"
COMPANY_CODE=394
COMPANY_SRID=28992
COMPANY_CENTER="010100002040710000EB65C4A11977F9400C3883DA1D2B1D41"

D_GOV_DOMAIN="localhost"
D_GOV_NAME="Gemeente 1"
D_GOV_DOMAIN_TYPE="Gemeente"


HASH_FUNCTION="PBKDF2WithHmacSHA1"
SALT_LENGTH=20
ITERATION_COUNT=1000
KEY_LENGTH=512

###################################################################
###################################################################
# Scripts
###################################################################
###################################################################

psql -h localhost -U postgres -d publicspace -c "CREATE EXTENSION postgis;"
psql -h localhost -U postgres -d publicspace -c "CREATE EXTENSION fuzzystrmatch;"
psql -h localhost -U postgres -d publicspace -c "CREATE EXTENSION pg_trgm;"


psql -h localhost -U postgres -f create_tables.sql

psql -h localhost -U postgres -f create_audit.sql

psql -h localhost -U postgres -f geo.sql

psql -h localhost -U postgres -f create_functions.sql

psql -h localhost -U postgres -f insert-static-tables.sql

psql -h localhost -U postgres -f insert-company-tables.sql -v comany_name="'$COMPANY_NAME'" -v comany_code="'$COMPANY_CODE'" -v comany_srid="'$COMPANY_SRID'" -v comany_center="'$COMPANY_CENTER'"

###################################################################
# Add government tables
###################################################################

DOMAIN_DOMAIN="localhost"
DOMAIN_NAME="Gemeente 1"
DOMAIN_TYPE="Gemeente"
DOMAIN_GROUP_NAME1="Groenvoorziening"
DOMAIN_GROUP_NAME2="Handhaving"
DOMAIN_GROUP_NAME3="Onderhoud"

USER_USERNAME="admin"
USER_PASSWORD="@dm1nistrator"
USER_NAME="Administrator"
USER_EMAIL="fake@this-is-no-organisation.com"
USER_ADMIN=true

USER_SALT="$(java -cp sec-class org.commonground.ps.backendapi.core.security.SecureHash --function "salt" --password "$USER_PASSWORD" --hash-function "$HASH_FUNCTION" --salt-length $SALT_LENGTH --iteration-count $ITERATION_COUNT --key-length $KEY_LENGTH)"
USER_PASSWORD_ENCRYPT="$(java -cp sec-class org.commonground.ps.backendapi.core.security.SecureHash --function "password" --password "$USER_PASSWORD" --hash-function "$HASH_FUNCTION" --salt-length $SALT_LENGTH --salt "$USER_SALT" --iteration-count $ITERATION_COUNT --key-length $KEY_LENGTH)"
 
psql -h localhost -U postgres -f insert-domain-tables.sql -v domain_domain="'$DOMAIN_DOMAIN'" -v domain_name="'$DOMAIN_NAME'" -v domain_type="'$DOMAIN_TYPE'" -v domain_group_name1="'$DOMAIN_GROUP_NAME1'" -v domain_group_name2="'$DOMAIN_GROUP_NAME2'" -v domain_group_name3="'$DOMAIN_GROUP_NAME3'"
psql -h localhost -U postgres -f insert-domain-users.sql -v user_username="'$USER_USERNAME'" -v user_password="'$USER_PASSWORD_ENCRYPT'" -v user_name="'$USER_NAME'" -v user_email="'$USER_EMAIL'" -v user_admin="'$USER_ADMIN'" -v user_salt="'$USER_SALT'" -v hash_function="'$HASH_FUNCTION'" -v iteration_count="'$ITERATION_COUNT'" -v key_length="'$KEY_LENGTH'"

psql -h localhost -U postgres -f insert-domain-initial-setup-government-tables.sql


###################################################################
# Add contractor tables
###################################################################

DOMAIN_DOMAIN_CONTR="127.0.0.1"
DOMAIN_NAME_CONTR="Aannemer 1"
DOMAIN_TYPE_CONTR="Aannemer"
DOMAIN_GROUP_NAME1_CONTR="Wegen"
DOMAIN_GROUP_NAME2_CONTR="Groen"
DOMAIN_GROUP_NAME3_CONTR="Water"

USER_USERNAME_CONTR="admin"
USER_PASSWORD_CONTR="@dm1nistrator"
USER_NAME_CONTR="Administrator"
USER_EMAIL_CONTR="fake@this-is-no-contr.organisation.com"
USER_ADMIN_CONTR=false

USER_SALT_CONTR="" #"$(java -cp sec-class org.commonground.ps.backendapi.core.security.SecureHash --function "salt" --password "$USER_PASSWORD_CONTR" --hash-function "$HASH_FUNCTION" --salt-length $SALT_LENGTH --iteration-count $ITERATION_COUNT --key-length $KEY_LENGTH)"
USER_PASSWORD_ENCRYPT_CONTR="" #"$(java -cp sec-class org.commonground.ps.backendapi.core.security.SecureHash --function "password" --password "$USER_PASSWORD_CONTR" --hash-function "$HASH_FUNCTION" --salt-length $SALT_LENGTH --salt "$USER_SALT_CONTR" --iteration-count $ITERATION_COUNT --key-length $KEY_LENGTH)"
 
psql -h localhost -U postgres -f insert-domain-tables.sql -v domain_domain="'$DOMAIN_DOMAIN_CONTR'" -v domain_name="'$DOMAIN_NAME_CONTR'" -v domain_type="'$DOMAIN_TYPE_CONTR'" -v domain_group_name1="'$DOMAIN_GROUP_NAME1_CONTR'" -v domain_group_name2="'$DOMAIN_GROUP_NAME2_CONTR'" -v domain_group_name3="'$DOMAIN_GROUP_NAME3_CONTR'"
psql -h localhost -U postgres -f insert-domain-users.sql -v user_username="'$USER_USERNAME_CONTR'" -v user_password="'$USER_PASSWORD_ENCRYPT_CONTR'" -v user_name="'$USER_NAME_CONTR'" -v user_email="'$USER_EMAIL_CONTR'" -v user_admin="'$USER_ADMIN_CONTR'" -v user_salt="'$USER_SALT_CONTR'" -v hash_function="'$HASH_FUNCTION'" -v iteration_count="'$ITERATION_COUNT'" -v key_length="'$KEY_LENGTH'"

psql -h localhost -U postgres -f insert-domain-initial-setup-contractor-tables.sql

psql -h localhost -U postgres -f insert-locations1.sql
psql -h localhost -U postgres -f insert-locations2.sql
psql -h localhost -U postgres -f insert-locations3.sql
psql -h localhost -U postgres -f insert-locations4.sql
psql -h localhost -U postgres -f insert-locations5.sql
psql -h localhost -U postgres -f insert-locations6.sql
psql -h localhost -U postgres -f insert-locations7.sql
psql -h localhost -U postgres -f insert-locations8.sql
psql -h localhost -U postgres -f insert-locations9.sql

psql -h localhost -U postgres -f insert-test-data.sql -v domain_name="'$DOMAIN_NAME'" -v domain_name_contr="'$DOMAIN_NAME_CONTR'" -v domain_group_name1="'$DOMAIN_GROUP_NAME1'" -v domain_group_name2="'$DOMAIN_GROUP_NAME2'" -v domain_group_name3="'$DOMAIN_GROUP_NAME3'" -v domain_group_name1_contr="'$DOMAIN_GROUP_NAME1_CONTR'" -v domain_group_name2_contr="'$DOMAIN_GROUP_NAME2_CONTR'" -v domain_group_name3_contr="'$DOMAIN_GROUP_NAME3_CONTR'"