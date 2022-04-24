const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const server = http.createServer(app);
const socketIo = require("socket.io");
const port = process.env.PORT || 4001;
const { createClient } = require("redis");
const { createAdapter } = require("@socket.io/redis-adapter");

app.use(express.json());
app.use(cors());

const io = socketIo(server, { cors: { origin: "*" } });
const socketRoutes = require("./routes/socket.routes");

const pubClient = createClient({ host: 'localhost', port: 6379 });
const subClient = pubClient.duplicate();

Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
  io.adapter(createAdapter(pubClient, subClient));
  socketRoutes(app, io, pubClient);
});

server.listen(port, () => console.log(`Listening on port ${port}`));
