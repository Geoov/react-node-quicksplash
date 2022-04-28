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

      let user = {
        id: uuidv4().substring(0, 8),
        nickName: data.nickName,
        votes: 0,
        ready: false,
      };

      pubClient.set(
        (gameCode = uuidv4().substring(0, 4)),
        JSON.stringify({
          users: [user],
        })
      );

      socket.emit("createdGame", { gameCode, user });
    });

    socket.on("joinGame", async (data) => {
      if (!data.nickName || !data.gameCode) {
        universalError("NickName or GameCode is null");
        return;
      }

      const existentGame = await pubClient.get(data.gameCode);

      if (!existentGame) {
        universalError("The Current Game Does Not Exist");
        return;
      }

      let currentGame = JSON.parse(existentGame);
      let user = {
        id: uuidv4().substring(0, 8),
        nickName: data.nickName,
        votes: 0,
        ready: false,
      };

      currentGame.users.push(user);
      pubClient.set(data.gameCode, JSON.stringify(currentGame));

      socket.emit("joinedGame", {
        gameCode: data.gameCode,
        user,
      });
    });

    socket.on("getUsers", async (data) => {
      if (!data.gameCode) {
        universalError("GameCode doesn't exist");
        return;
      }

      const existentGame = await pubClient.get(data.gameCode);
      if (!existentGame) {
        universalError("The Current Game Does Not Exist");
        return;
      }

      currentGame = JSON.parse(existentGame);
      io.emit("gameUsers", {
        gameUsers: currentGame,
      });
    });

    socket.on("userReady", async (data) => {
      if (data.index !== null && !data.id) {
        universalError("This user doesn't exists");
        return;
      }

      const existentGame = await pubClient.get(data.gameCode);
      if (!existentGame) {
        universalError("The Current Game Does Not Exist");
        return;
      }

      currentGame = JSON.parse(existentGame);
      console.log(currentGame);
    //   let currentGame = JSON.parse(existentGame);
    //   let user = {
    //     id: uuidv4().substring(0, 8),
    //     nickName: data.nickName,
    //     votes: 0,
    //     ready: false,
    //   };

    //   currentGame.users.push(user);
    //   pubClient.set(data.gameCode, JSON.stringify(currentGame));



    });

    function universalError(message) {
      socket.emit("universalError", { message });
    }
  });
}

module.exports = socketRoutes;
