const {Pool} =require("pg");

const pool= new Pool({
    user:"postgres",
    host:"localhost",
    database:"college",
    password:"Anu2947",
    port:5432
});
module.exports=pool;