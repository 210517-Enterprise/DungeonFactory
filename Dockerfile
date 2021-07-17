FROM openjdk:8-jdk-buster

COPY target/DungeonFactory-0.0.1-SNAPSHOT.jar DungeonFactory.jar

ENTRYPOINT ["java","-jar","-Dspring.profiles.active=production","/DungeonFactory.jar"]
