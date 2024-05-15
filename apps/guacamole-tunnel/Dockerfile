FROM amazoncorretto:22

RUN ./mvnw package && cp -r target/ /guacamole-tunnel/

WORKDIR /

ENTRYPOINT [ "java", "-jar", "/guacamole-tunnel/guacamole-tunnel-0.0.1-SNAPSHOT.jar" ]
