FROM alpine:latest

RUN apk add curl bash

# Set shell to bash
SHELL ["/bin/bash", "-c"]

# Install k3s
RUN curl -sfL https://get.k3s.io | sh -

# Install Java 1.8 
RUN apk add openjdk8 

# Install Python 3.8
RUN apk add python3

# Install NodeJS using NVM
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
RUN source ~/.bashrc
RUN nvm install node

# Install PNPM
RUN npm install -g pnpm