const { v4: uuidv4 } = require("uuid");

function socketRoutes(app, io, pubClient) {
  io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });

    socket.on("createGame", (data) => {
      if (!data.nickName) {
        universalError("NickName null");
        return;
      }

      let gameCode = uuidv4().substring(0, 4);

      pubClient.set(
        gameCode,
        JSON.stringify({
          host: data.nickName,
          users: [],
        })
      );

      socket.emit("createdGame", { gameCode, nickName: data.nickName });
    });

    socket.on("joinGame", async (data) => {
      if (!data.nickName || !data.gameCode) {
        universalError("NickName or GameCode is null");
        return;
      }

      const existentGame = await pubClient.get(data.gameCode);

      if (existentGame) {
        currentGame = JSON.parse(existentGame);
        currentGame.users.push(data.nickName);
        pubClient.set(data.gameCode, JSON.stringify(currentGame));

        socket.emit("joinedGame", {
          gameCode: data.gameCode,
          nickName: data.nickName,
        });
      } else {
        universalError("The Current Game Does Not Exist");
      }
    });

    function universalError(message) {
      socket.emit("universalError", { message });
    }
  });
}

module.exports = socketRoutes;
