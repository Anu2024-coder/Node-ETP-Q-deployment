const {MongoClient}=require("mongodb");
const url="mongodb://127.0.0.1:27017";

const dbName="CompanyDB";
async function main(){
    const client=new MongoClient(url)

    try{
        await client.connect();
        console.log("connected to MongoDB");

        const db=client.db(dbName);
        const employeeCollection=db.collection("Employee");
        const employees=[
            {Empid:101, Name: "Anu", Dept:"cse", city:"kaithal", salary:1234543},
            {Empid: 102, Name: "Neha", Dept: "IT", City: "Mumbai", Salary: 60000},
            {Empid: 103, Name: "Ravi", Dept: "ECE", City: "Chennai", Salary: 52000}
        ];

        await employeeCollection.insertMany(employees);
        console.log("employee records inserted");

        const result=await employeeCollection
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