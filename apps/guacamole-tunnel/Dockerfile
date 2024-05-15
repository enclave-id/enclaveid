FROM amazoncorretto:22

WORKDIR /kaniko/buildcontext/

RUN ls -la

RUN ./mvnw package

#COPY /target/ /guacamole-tunnel/

WORKDIR /

# TODO: parametrize versions
ENTRYPOINT [ "java", "-jar", "/guacamole-tunnel/guacamole-tunnel-0.0.1-SNAPSHOT.jar" ]
