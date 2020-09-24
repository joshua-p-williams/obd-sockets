# obd-sockets
A Node.js, Express.js, Socket.IO, Redis server for my OBDII project

# Steps to recreate

Initialize a new project.

```bash
npm init
npm install --save express socket.io redis body-parser
```

Create public folder for CSS and JS files.

```bash
mkdir -p ./public/css
mkdir -p ./public/js
touch ./public/css/main.css
touch ./public/js/main.js
```

Create the views

```bash
mkdir -p ./views
touch ./views/index.html
```

Create the node server file

```bash
touch ./index.js
```

Create credentials file for connecting with redis

```bash
touch ./creds.json
```

To run a temporary redis server;

```bash
docker run --name redis-obd -p 6379:6379 -d redis
```

You can then connect to the redis container with

```bash
docker exec -it redis-obd sh
redis-cli
get RPM
```

