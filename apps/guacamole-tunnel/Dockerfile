FROM maven

WORKDIR /kaniko/buildcontext/

RUN cd apps/guacamole-tunnel && ./mvnw package

COPY apps/guacamole-tunnel/target/ /guacamole-tunnel/

WORKDIR /
# TODO: fix versioning
ENTRYPOINT [ "java", "-jar", "/guacamole-tunnel/guacamole-tunnel-0.0.1-SNAPSHOT.jar" ]
