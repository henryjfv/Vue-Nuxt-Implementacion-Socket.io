const express = require("express");
const app = express();
const socket = require("socket.io");

var serverI = null;
var io = null;

app.get("/", (req, res) => {
  if (!serverI) {
    serverI = res.socket.server;
    io = socket(serverI);
    io.on("connection", (socket) => {
      console.log("a user connected");

      socket.on("chat message", (msg) => {
        console.log("Message get ", msg);
        io.emit("chat message2", msg);
      });
    });
  }
  res.send(`<h1>Hello there!</h1>`);
});

module.exports = {
  path: "/api",
  handler: app,
};
