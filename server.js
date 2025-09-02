const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

app.use(express.json());


app.listen(5050, () => console.log("Server started successfully...!!!"));

app.use(require("./routes/routes"));

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("DB is connected successfully ...!!!"))
  .catch((err) => console.log(err));
