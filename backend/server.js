const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const exercisesRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const dB = process.env.ATLAS_URI.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(dB);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("mongo jumbo");
});

app.use("/exercises", exercisesRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
