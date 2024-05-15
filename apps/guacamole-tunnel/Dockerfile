FROM amazoncorretto:22

WORKDIR /kaniko/buildcontext/

RUN cd apps/guacamole-tunnel && ./mvnw package && cp -r target/ /guacamole-tunnel/

WORKDIR /

ENTRYPOINT [ "java", "-jar", "/guacamole-tunnel/guacamole-tunnel-0.0.1-SNAPSHOT.jar" ]
