const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const server = http.createServer(app);
const socketIo = require("socket.io");
const port = process.env.PORT || 4001;

app.use(express.json());
app.use(cors());
app.use("/api/gameTable", require("./routes/gameTable.routes"));
app.use("/api/user", require("./routes/user.routes"));


const io = socketIo(server, { cors: { origin: "*" } });
const socketRoutes = require("./routes/socket.routes");

socketRoutes(app, io);


server.listen(port, () => console.log(`Listening on port ${port}`));
