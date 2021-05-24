const express = require("express");
const app = express();
const path = require("path");
const port = 3000;

app.get("/", (req, res) => {
  res.setHeader("Set-Cookie", [
    "type=ninja; Max-Age=200; HttpOnly",
    "language=javascript; Path=/other; HttpOnly", // esta cookie solo puede verse en las dev tools tras ir a / y luego a /other. En / se setea la cookie, y luego ya solo se envia al hacer peticion a /other
  ]);
  res.send("Hello World!");
});

app.get("/cookie", (req, res) => {
  res.sendFile(path.join(__dirname, "/static/index.html"));
});

app.get("/other", (req, res) => {
  res.send("other!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
