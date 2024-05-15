FROM public.ecr.aws/amazoncorretto/amazoncorretto:22

WORKDIR /kaniko/buildcontext/

RUN cd apps/guacamole-tunnel && ./mvnw package

COPY apps/guacamole-tunnel/target/guacamole-tunnel-0.0.1-SNAPSHOT.jar /guacamole-tunnel-0.0.1-SNAPSHOT.jar

WORKDIR /

ENTRYPOINT [ "java", "-jar", "/guacamole-tunnel-0.0.1-SNAPSHOT.jar" ]
