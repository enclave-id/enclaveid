FROM golang:1.20 as builder

WORKDIR /

# Clone the repository and build the stand-alone nitriding executable.
RUN git clone https://github.com/brave/nitriding-daemon.git -b  v1.4.2
ARG TARGETARCH
RUN ARCH=${TARGETARCH} make -C nitriding-daemon/ nitriding

FROM node:21.6.2-alpine3.18

RUN npm install -g pnpm@8.15.4

COPY ./* /app/
WORKDIR /app

RUN pnpm install

COPY --from=builder /nitriding-daemon/nitriding /usr/local/bin/nitriding

EXPOSE 3000

ENTRYPOINT ["/app/entrypoint.sh"]

