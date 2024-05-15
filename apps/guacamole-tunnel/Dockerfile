FROM amazoncorretto:22

WORKDIR /kaniko/buildcontext/

RUN ./mvnw package

RUN ls -la

COPY /target/ /guacamole-tunnel/

WORKDIR /

# TODO: parametrize versions
ENTRYPOINT [ "java", "-jar", "/guacamole-tunnel/guacamole-tunnel-0.0.1-SNAPSHOT.jar" ]
