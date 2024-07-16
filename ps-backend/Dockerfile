FROM maven:3.9.7-eclipse-temurin-21-jammy AS build

WORKDIR "/usr/src/app"


COPY envResources /usr/src/app/envResources
COPY src /usr/src/app/src
COPY pom.xml /usr/src/app
RUN mvn -f /usr/src/app/pom.xml clean package -Pdocker

FROM openjdk:21-jdk

WORKDIR "/usr/src/app"

COPY --from=build /usr/src/app/target/*.war ps-backend.war
ENTRYPOINT ["java","-jar","/usr/src/app/ps-backend.war"]
