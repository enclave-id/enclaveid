FROM amazoncorretto:22

WORKDIR /app
COPY apps/guacamole-tunnel/target /app

ENTRYPOINT [ "java", "-jar", "/app/guacamole-tunnel-0.0.1-SNAPSHOT.jar" ]
