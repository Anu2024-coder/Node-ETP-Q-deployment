const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {

    if (req.url === "/download") {
        const filePath = path.join(__dirname, "largefile.txt");

        // Get file size
        const stat = fs.statSync(filePath);
        const totalSize = stat.size;
        let sentBytes = 0;

        res.writeHead(200, {
            "Content-Type": "text/plain",
            "Content-Length": totalSize
        });

        const readStream = fs.createReadStream(filePath);

        // Log streaming progress
        readStream.on("data", (chunk) => {
            sentBytes += chunk.length;
            console.log(`Streaming: ${((sentBytes / totalSize) * 100).toFixed(2)}%`);
        });

        readStream.on("end", () => {
            console.log("File streaming completed");
        });

        readStream.on("error", (err) => {
            console.log("Stream error:", err);
            res.end();
        });

        // Pipe stream to response
        readStream.pipe(res);
    }
});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
