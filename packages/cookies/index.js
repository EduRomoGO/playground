const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.setHeader("Set-Cookie", ["type=ninja", "language=javascript"]);
  res.send("Hello World!");
});

app.get("/cookie", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
