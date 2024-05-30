FROM maven:3.9.7-eclipse-temurin-21-jammy AS build

WORKDIR "/usr/src/app"

COPY src /usr/src/app/src
COPY pom.xml /usr/src/app
RUN mvn -f /usr/src/app/pom.xml clean package

FROM openjdk:21-jdk

WORKDIR "/usr/src/app"

COPY --from=build /usr/src/app/target/*.war ps-backend.war
ENTRYPOINT ["java","-jar","/usr/src/app/ps-backend.war"]


# FROM maven:3.8.5-openjdk-11 AS build
# COPY ./src /app/
# COPY pom.xml /app/pom.xml
# WORKDIR /app
# RUN mvn clean package

# FROM tomcat:9.0

# RUN rm -rf /usr/local/tomcat/webapps/ROOT

# COPY --from=build /app/target/ps-backend.war /usr/local/tomcat/webapps/ROOT.war

# EXPOSE 8080

# CMD ["/usr/local/tomcat/bin/catalina.sh", "run"]  