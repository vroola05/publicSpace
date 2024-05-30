# Prerequisites
## Database
1) Postgres sql
2) Postgis

## Backend 
1) Java 11 jdk
2) Maven
3) Lombok (exists in pom.xml, but most IDE's require a plugin)

## Frontend
1) npm

# default users
## Database
The default database user is only for test and needs to be changed in a production environment.
Username: postgres
Password: postgresPassword

For production the credentials can be changed in the following files:
ps-database\create.cmd (Windows)
ps-database\create.sh (Linux)
ps-backend\src\main\resources\application.properties

## Frontend default domain
When you are running the project for the fist time there is a default user. You can login with the following user:
Username: admin
Password: @dm1nistrator

# PS - Database
The scripts need to be run on the server where the database is installed.

The location of the scripts is:
ps-database\create.cmd (Windows)
ps-database\create.sh (Linux)

On linux you need to give permissions.
sudo chmod 774 create.sh
./create.sh

By default there is some test data within the scripts. You can choose to disable or change the data.

## Default domain on localhost
psql -h localhost -U postgres -f insert-domain-tables.sql

Creates a default company and a default domain
The default company is named System Admin. You can change this to whatever you want.

The default domain is named localhost. you can change this to whatever domain you want. You need to follow de convention.
default.domain-for-some-goverment.nl

## Initial setup domain
psql -h localhost -U postgres -f insert-domain-initial-setup-tables.sql

Everything can also be changed afterwards within the user interface.

Creates default statusses / pages

## Test addresses (geodata)
psql -h localhost -U postgres -f insert-locations(1-9).sql

Creates a table that contains locations of all addresses within a city.

# PS - Backend
To run the project:
ps-backend\mvnw.cmd (Windows)
ps-backend\mvnw (Linux)

# PS - Frontend
ps-frontend\

npm install

Eerst bouw je de library:
ng build --project=ps-lib --watch

Vervolgens draai je een van de twee projecten.
ng serve --project=ps-government
ng serve --project=ps-government --host 0.0.0.0 --disable-host-check

Default password: @dm1nistrator

When you try to open the project within a browser on localhost you will get cors errors.
on linux you can run:
chromium-browser --disable-web-security --user-data-dir="/home/.../ChromiumTemp"

On windows you can run:
chrome.exe --disable-web-security --user-data-dir="%USERPROFILE%\temp\chrome"
"C:\Program Files\Google\Chrome\Application\chrome.exe" --disable-web-security --user-data-dir=$env:USERPROFILE\temp\chrome

# User password creation
Create salt:
java -cp sec-class org.commonground.ps.backendapi.core.security.SecureHash --function "salt" --password "@dministrator" --hash-function "PBKDF2WithHmacSHA1" --salt-length 20 --iteration-count 1000 --key-length 512

Create password:
java -cp sec-class org.commonground.ps.backendapi.core.security.SecureHash --function "password" --password "@dministrator" --hash-function "PBKDF2WithHmacSHA1" --salt-length 20 --salt "PUT_YOUR_SALT_HERE" --iteration-count 1000 --key-length 512