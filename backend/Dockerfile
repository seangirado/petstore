FROM maven:3.9.4-eclipse-temurin-17 as build
WORKDIR /workspace

# Copy pom and source (context is ./backend)
COPY pom.xml ./
COPY src ./src

# Build the application
RUN mvn -B -DskipTests package

FROM eclipse-temurin:17-jdk-jammy
WORKDIR /app

# Copy the built jar from the build stage
COPY --from=build /workspace/target/*.jar ./app.jar

EXPOSE 8080

ENV JAVA_OPTS=""

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar /app/app.jar"]
