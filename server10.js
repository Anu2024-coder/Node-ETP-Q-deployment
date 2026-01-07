const http=require("http");
const fs=require("fs");

const server=http.createServer((req,res)=>{
    if(req.url==="/"){
        const readStream=fs.createReadStream("students.txt");
        res.writeHead(200,{"Content-Type":"text/plain"});

        readStream.on("data",(chunk)=>{
            res.write(chunk);
        });

        readStream.on("end",()=>{
            res.end();
        });

        readStream.on("error",(err)=>{
            res.writeHead(500);
            res.end("error reading file");
        });
    }
    else{
        res.writeHead(404);
        res.end("page not found");
    }
});

server.listen(3000,()=>{
    console.log("server is running at http://localhost:3000");
});