FROM openjdk:21-jdk

COPY target/ps-backend.war ps-backend.war
ENTRYPOINT ["java","-jar","/ps-backend.war"]


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