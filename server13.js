const EventEmitter=require("events");
const emitter=new EventEmitter();

emitter.on("userRegistered",(user)=>{
    console.log("New user registered");
    console.log("Name: ",user.name);
    console.log("Email: ",user.email);
    console.log("Time: ", new Date().toLocaleString());
});

function registerUser(name,email){
    console.log("Registering user... ");
    emitter.emit("UserRegistered",{
        name:name,
        email:email
    });
}

registerUser("Anu","anu23@gmail.com");
registerUser("Satyam","satyam23@gmail.com");