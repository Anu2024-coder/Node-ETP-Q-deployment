const {MongoClient}=require("mongodb"); //mongo client class
const url="mongodb://127.0.0.1:27017"; //url

const dbName="CompanyDB"; //dbname

async function main(){ //main function
    const client=new MongoClient(url) //client created

    try{
        await client.connect(); //client connected
        console.log("connected to MongoDB");

        const db=client.db(dbName); 
        const employeeCollection=db.collection("Employee");
        const employees=[ 
            {Empid:101, Name: "Anu", Dept:"cse", City:"kaithal", Salary:1234543},
            {Empid: 102, Name: "Neha", Dept: "IT", City: "Mumbai", Salary: 60000},
            {Empid: 103, Name: "Ravi", Dept: "ECE", City: "Chennai", Salary: 52000}
        ];

        await employeeCollection.insertMany(employees); //insert
        console.log("employee records inserted");

        const result=await employeeCollection //salary greater than 50000
        .find({Salary: {$gt:50000}})
        .toArray();
        console.log("Employees with salary>50000: ");
        console.log(result);
    }
    catch(err){
        console.log(err);
    } finally{
        await client.close();
    }
}
main();