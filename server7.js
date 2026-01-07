const express = require("express");
const http=require("http");
const {Server}=require("socket.io");

const app=express();

const server=http.createServer(app);
const io=new Server(server);

app.use(express.static("public"));

let visitorCount=0;

const Student={
    name:"Anu",
    roll:"43",
    course:"INT222"
};

io.on("connection",(socket)=>{
    visitorCount++;

    console.log("New client connected");
    console.log("Students details: ");
    console.log(Student);

    socket.emit("currentCount", visitorCount);
    
if(visitorCount %2===0){
    io.emit("evenVisitors",visitorCount);
}
socket.on("disconnect",()=>{
    console.log("client disconnected");
});
});

server.listen(3000,()=>{
    console.log("server running at http://localhost:3000");
});