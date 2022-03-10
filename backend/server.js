const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const db = require("./database/db");
const socket = require("socket.io");
app.use(cors());
const PORT = 5000;
app.use(express.json());

/**************** Routers ******************* */
const usersRouter = require("./routes/user");
app.use("/users", usersRouter);

const loginRouter = require("./routes/login");
app.use("/login", loginRouter);

const servicesRouter = require("./routes/services");
app.use("/services", servicesRouter);

const requestRouter = require("./routes/request");
app.use("/request", requestRouter);
const workerRouter = require("./routes/worker");
app.use("/workers", workerRouter);

const roomsRouter = require("./routes/rooms");
app.use("/rooms", roomsRouter);

const messagesRouter = require("./routes/message");
app.use("/messages", messagesRouter);
/****************************************** */

const server = app.listen(PORT, () => {
  console.log(`SERVER WORKING ON PORT: ${PORT}`);
});
/******************************************** */
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    method: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`${socket.id} is connected`);
  socket.on("JOIN_ROOM", (data) => {
    socket.join(data);
  });

  socket.on("SEND_MESSAGE", (data) => {
    socket.to(data.room).emit("RECEIVE_MESSAGE", data.content);
  });

  socket.on("disconnect", () => {
    console.log("\nuser left ...");
  });
});
