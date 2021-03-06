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
        ready: true,
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

    socket.on("toggleReadyState", async (data) => {
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
      currentGame.users[data.index].ready = data.readyState;

      pubClient.set(data.gameCode, JSON.stringify(currentGame));

      io.emit("gameUsers", {
        gameUsers: currentGame,
      });
    });

    socket.on("startGame", async (data) => {
      const existentGame = await pubClient.get(data.gameCode);
      if (!existentGame) {
        universalError("The Current Game Does Not Exist");
        return;
      }

      currentGame = JSON.parse(existentGame);

      testGame = [
        {
          id: "110",
          nickName: "Geov",
          votes: 0,
          ready: true,
        },
        {
          id: "111",
          nickName: "Test1",
          votes: 0,
          ready: true,
        },
        {
          id: "112",
          nickName: "Test2",
          votes: 0,
          ready: true,
        },
        {
          id: "113",
          nickName: "Test3",
          votes: 0,
          ready: true,
        },
        {
          id: "114",
          nickName: "Test4",
          votes: 0,
          ready: true,
        },
        {
          id: "115",
          nickName: "Test5",
          votes: 0,
          ready: true,
        },
      ];

      console.log(currentGame, testGame);
    });

    function universalError(message) {
      socket.emit("universalError", { message });
    }
  });
}

module.exports = socketRoutes;
