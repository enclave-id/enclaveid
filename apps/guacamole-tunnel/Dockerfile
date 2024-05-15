FROM amazoncorretto:22

WORKDIR /kaniko/buildcontext/

RUN cd apps/guacamole-tunnel && ./mvnw package

COPY apps/guacamole-tunnel/target/ /guacamole-tunnel/

WORKDIR /

# TODO: parametrize versions
ENTRYPOINT [ "java", "-jar", "/guacamole-tunnel/guacamole-tunnel-0.0.1-SNAPSHOT.jar" ]
