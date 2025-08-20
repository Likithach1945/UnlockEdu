#<<<<<<< HEAD
## Use official Java 17 image
#FROM eclipse-temurin:17-jdk AS build
#
## Set working directory
#WORKDIR /app
#
## Copy Maven wrapper and project files
#COPY . .
#
## Build the application
#RUN ./mvnw clean package -DskipTests
#
## Run stage
#=======
## Build stage with Maven
#FROM maven:3.9.6-eclipse-temurin-17 AS build
#
#WORKDIR /app
#
## Copy pom.xml and download dependencies first (for caching)
#COPY pom.xml .
#RUN mvn dependency:go-offline
#
## Copy source code
#COPY src ./src
#
## Package application
#RUN mvn clean package -DskipTests
#
## Run stage (lightweight JRE image)
#>>>>>>> bd11d3eb4494ded1be46c4859bac7b9f1399a284
#FROM eclipse-temurin:17-jre
#
#WORKDIR /app
#COPY --from=build /app/target/*.jar app.jar
#
#EXPOSE 8080
#<<<<<<< HEAD
#ENTRYPOINT ["java","-jar","app.jar"]
#=======
#ENTRYPOINT ["java","-jar","app.jar"]
#>>>>>>> bd11d3eb4494ded1be46c4859bac7b9f1399a284


# Build stage with Maven (for caching dependencies)
FROM maven:3.9.6-eclipse-temurin-17 AS build

WORKDIR /app

# Copy pom.xml first to download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy source code
COPY src ./src

# Build the application (skip tests)
RUN mvn clean package -DskipTests

# Run stage (lightweight JRE image)
FROM eclipse-temurin:17-jre

WORKDIR /app

# Copy the built jar from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java","-jar","app.jar"]
