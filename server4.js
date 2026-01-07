const http=require("http");
const fs=require("fs");
const url=require("url");

const PORT=3000;

function factorial(n){
    if (n<0) return "invalid number";
    let fact=1;
    for(let i=1;i<=n;i++){
        fact*=i;
    }
    return fact;
} 

const server=http.createServer((req,res)=>{
    const parsedUrl=url.parse(req.url,true);

    if(parsedUrl.pathname === "/"){
        fs.readFile("index4.html",(err,data)=>{
            res.writeHead(200,{"Content-Type":"text/html"});
            res.write(data);
            res.end();
        });
    }else if(parsedUrl.pathname === "/factorial"){
        const num=parseInt(parsedUrl.query.num);
        const result=factorial(num);

        res.writeHead(200,{"Content-Type":"Text/html"});
        res.write(`
            <html>
            <body>
            <h2>Factorial Result</h2>
            <p>Number: ${num}</p>
            <p>Factorial: ${result} </p>
            <br>
            <a href="/">Go back</a>
            </body>
            </html>
            `);
            res.end();
    }
});

server.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`);
});