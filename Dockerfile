FROM maven:3.9.7-eclipse-temurin-21-jammy AS build

WORKDIR "/usr/src/app"



COPY ps-backend/envResources /usr/src/app/envResources
COPY ps-backend/src /usr/src/app/src
COPY ps-backend/pom.xml /usr/src/app

COPY ps-frontend/dist/ps-frontend/browser /usr/src/app/src/main/webapp

RUN mvn -f /usr/src/app/pom.xml clean package -Pdocker

FROM openjdk:21-jdk

WORKDIR "/usr/src/app"

COPY --from=build /usr/src/app/target/*.war ps-backend.war
ENTRYPOINT ["java","-jar","/usr/src/app/ps-backend.war"]
