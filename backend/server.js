const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("mongodb database connection established successfully");
})

const usersRouter = require("./routes/users");
const fundraisersRouter = require("./routes/fundraisers");

app.use("/api/users", usersRouter);
app.use("/api/fundraisers", fundraisersRouter);

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});