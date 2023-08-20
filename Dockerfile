FROM openjdk:17-slim
RUN apt-get update && apt-get install -y curl docker.io
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install -y nodejs

WORKDIR /usr/src/app
COPY . .

WORKDIR server
RUN chmod +x gradlew
RUN ./gradlew --no-daemon --version
RUN ./gradlew bootJar --no-daemon --version

WORKDIR ../web
RUN npm install
RUN npm run build


