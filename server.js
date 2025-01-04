const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const { PORT, DB_URL } = process.env;
const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.use("/api/v1", require("./routes"));
app.use((err, req, res, next) => {
  console.log(err);
  res
    .status(500)
    .json({ success: false, message: err.message || "rSomething went wrong" });
});
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Connected to DB");
    app.listen(PORT, "0.0.0.0", () => console.log("Server is running"));
  })

  .catch((e) => console.log(e));
