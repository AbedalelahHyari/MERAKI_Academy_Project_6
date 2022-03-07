const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const db = require("./database/db");

app.use(cors());

app.use(express.json());

/**************** Routers ******************* */
const usersRouter = require("./routes/user");
app.use("/users", usersRouter);

const loginRouter = require("./routes/login");
app.use("/login", loginRouter);

const servicesRouter = require("./routes/services");
app.use("/services", servicesRouter);

// const workerRouter = require("./routes/worker");
// app.use("/workers", workersRouter);

/****************************************** */

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`SERVER WORKING ON PORT: ${PORT}`);
});
