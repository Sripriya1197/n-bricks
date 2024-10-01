FROM openjdk:8-jdk-alpine
WORKDIR /app
COPY target/ my-jenkins-pipeline-project-1.0-SNAPSHOT.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
