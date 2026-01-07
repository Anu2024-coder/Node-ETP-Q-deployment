const express= require("express");
const fs=require("fs");
const path=require("path");

const app=express();
const PORT=3000;

app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

const studentFilePath=path.join(__dirname, "students.txt");

const studentData=`
Reg no.: 12317949
Name: Anu
Grade: O

Reg no.: 12315567
Name: Satyam
Grade: O
`;

fs.writeFileSync(studentFilePath, studentData);


app.post("/download", (req,res)=>{
    const fileName = req.body.filename;
    const filePath= path.join(__dirname, fileName);

    if(fs.existsSync(filePath)){
        res.download(filePath);
    }else{
        res.send("file not found on server");
    }
});

app.listen(PORT,()=>{
    console.log(`Server running  at http://localhost:${PORT}`);
});