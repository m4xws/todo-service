FROM openjdk:8-jre-alpine

# copy jar
COPY target/todo-service-runner.jar .
EXPOSE 8080
# run jar
ENTRYPOINT [ "java", "-jar", "todo-service-runner.jar"]