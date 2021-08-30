
# default user
Als je de server hebt draaien, kun je inloggen met de onderstaande gegevens:
admin
@dm1nistrator

# PS - Database
On linux go to ps-database

sudo chmod 774 create.sh
./create.sh

# PS - Backend
Required:
1) Java 11 jdk
2) Maven
3) Lombok (already exists in pom.xml, but most IDE's require a plugin)

sudo chmod 774 create.sh
./create.sh

# PS - Frontend
Required:
1) npm

npm install


Eerst bouw je de library:
ng build --project=ps-lib --watch

Vervolgens draai je een van de twee projecten.
ng serve --project=ps-government

