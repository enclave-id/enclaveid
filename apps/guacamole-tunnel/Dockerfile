FROM maven as java-builder

WORKDIR /kaniko/buildcontext/

RUN pnpm install
RUN pnpm exec nx run guacamole-tunnel:build

COPY apps/guacamole-tunnel/target/ /kaniko/guacamole-tunnel/

COPY --from=java-builder /kaniko/guacamole-tunnel/ /guacamole-tunnel/
