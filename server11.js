const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // User joins
    socket.on("join", (username) => {
        socket.username = username;
        socket.broadcast.emit("notification", `${username} joined the chat`);
    });

    // Receive message
    socket.on("message", (data) => {
        io.emit("message", {
            user: socket.username,
            text: data
        });
    });

    // User disconnects
    socket.on("disconnect", () => {
        if (socket.username) {
            io.emit("notification", `${socket.username} left the chat`);
        }
        console.log("User disconnected:", socket.id);
    });
});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
