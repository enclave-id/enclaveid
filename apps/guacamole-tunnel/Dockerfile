FROM amazoncorretto:22

WORKDIR /kaniko/buildcontext/

RUN apps/guacamole-tunnel/mvnw package

COPY target/ /guacamole-tunnel/

WORKDIR /

ENTRYPOINT [ "java", "-jar", "/guacamole-tunnel/guacamole-tunnel-0.0.1-SNAPSHOT.jar" ]
